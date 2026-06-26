const LEAD_ENDPOINT = "/api/lead";
const LEAD_EVENT_ENDPOINT = "/api/lead-event";
const FAILED_LEAD_QUEUE_KEY = "failed_lead_queue";
const FAILED_LEAD_QUEUE_TTL_MS = 48 * 60 * 60 * 1000;
const FAILED_LEAD_QUEUE_MAX_ITEMS = 10;

type LeadDeliveryOptions = {
  keepalive?: boolean;
  preferBeacon?: boolean;
  timeoutMs?: number;
};

type LeadDeliveryResult = {
  ok: boolean;
  status: number;
  queued?: boolean;
};

type FailedLeadQueueItem = {
  protocol_id?: string;
  queued_at: string;
  payload: unknown;
};

function getProtocolId(payload: unknown): string {
  if (typeof payload === "object" && payload !== null && "protocol_id" in payload) {
    return String((payload as { protocol_id?: string }).protocol_id || "");
  }

  return "";
}

function isQueueItemExpired(item: FailedLeadQueueItem, now = Date.now()): boolean {
  const queuedAt = Date.parse(item.queued_at);
  if (Number.isNaN(queuedAt)) {
    return true;
  }

  return now - queuedAt > FAILED_LEAD_QUEUE_TTL_MS;
}

function readFailedLeadQueue(): FailedLeadQueueItem[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const rawQueue = window.localStorage.getItem(FAILED_LEAD_QUEUE_KEY);
    if (!rawQueue) {
      return [];
    }

    const parsed = JSON.parse(rawQueue) as FailedLeadQueueItem[];
    const now = Date.now();
    return parsed.filter((item) => !isQueueItemExpired(item, now));
  } catch {
    return [];
  }
}

function writeFailedLeadQueue(queue: FailedLeadQueueItem[]) {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.setItem(FAILED_LEAD_QUEUE_KEY, JSON.stringify(queue));
  } catch {
    // ignore storage write failures
  }
}

function createTimeoutSignal(timeoutMs = 8000): AbortSignal | undefined {
  if (typeof AbortSignal === "undefined" || typeof AbortSignal.timeout !== "function") {
    return undefined;
  }

  return AbortSignal.timeout(timeoutMs);
}

async function postJson(
  endpoint: string,
  payload: unknown,
  options?: { keepalive?: boolean; timeoutMs?: number },
): Promise<LeadDeliveryResult> {
  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    keepalive: options?.keepalive ?? false,
    signal: createTimeoutSignal(options?.timeoutMs),
  });

  if (!response.ok) {
    throw new Error(`Lead delivery failed with status ${response.status}`);
  }

  return {
    ok: true,
    status: response.status,
  };
}

export async function submitLeadPayload(payload: unknown): Promise<LeadDeliveryResult> {
  const result = await postJson(LEAD_ENDPOINT, payload, { timeoutMs: 8000 });
  clearFailedLeadPayload(getProtocolId(payload));
  return result;
}

export function queueLeadEventPayload(payload: unknown): boolean {
  if (typeof navigator === "undefined" || typeof navigator.sendBeacon !== "function") {
    return false;
  }

  try {
    const body = JSON.stringify(payload);
    const blob = new Blob([body], { type: "application/json" });
    return navigator.sendBeacon(LEAD_EVENT_ENDPOINT, blob);
  } catch {
    return false;
  }
}

export async function submitLeadEventPayload(
  payload: unknown,
  options?: LeadDeliveryOptions,
): Promise<LeadDeliveryResult> {
  if (options?.preferBeacon && queueLeadEventPayload(payload)) {
    return {
      ok: true,
      status: 0,
      queued: true,
    };
  }

  return postJson(LEAD_EVENT_ENDPOINT, payload, {
    keepalive: options?.keepalive ?? true,
    timeoutMs: options?.timeoutMs ?? 4000,
  });
}

export function queueFailedLeadPayload(payload: unknown): boolean {
  if (typeof window === "undefined") {
    return false;
  }

  try {
    const protocolId = getProtocolId(payload);
    const queue = readFailedLeadQueue();
    const alreadyQueued = protocolId
      ? queue.some((item) => item.protocol_id === protocolId)
      : false;

    if (alreadyQueued) {
      return true;
    }

    const nextQueue = [
      ...queue,
      {
        protocol_id: protocolId || undefined,
        queued_at: new Date().toISOString(),
        payload,
      },
    ].slice(-FAILED_LEAD_QUEUE_MAX_ITEMS);

    writeFailedLeadQueue(nextQueue);
    return true;
  } catch {
    return false;
  }
}

export function clearFailedLeadPayload(protocolId?: string): boolean {
  if (typeof window === "undefined" || !protocolId) {
    return false;
  }

  try {
    const queue = readFailedLeadQueue();
    const nextQueue = queue.filter((item) => item.protocol_id !== protocolId);
    writeFailedLeadQueue(nextQueue);
    return true;
  } catch {
    return false;
  }
}

export function pruneFailedLeadQueue(): boolean {
  if (typeof window === "undefined") {
    return false;
  }

  try {
    const queue = readFailedLeadQueue().slice(-FAILED_LEAD_QUEUE_MAX_ITEMS);
    writeFailedLeadQueue(queue);
    return true;
  } catch {
    return false;
  }
}
