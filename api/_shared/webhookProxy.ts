export type NodeRequest = AsyncIterable<Buffer | string> & {
  method?: string;
};

export type NodeResponse = {
  status: (code: number) => NodeResponse;
  setHeader: (name: string, value: string) => void;
  end: (body?: string) => void;
};

type ProxyWebhookOptions = {
  allowMissingEnv?: boolean;
};

const JSON_HEADERS = {
  "Content-Type": "application/json",
};

function sendJson(res: NodeResponse, statusCode: number, payload: Record<string, unknown>) {
  res.status(statusCode);
  for (const [name, value] of Object.entries(JSON_HEADERS)) {
    res.setHeader(name, value);
  }
  res.end(JSON.stringify(payload));
}

async function readRawBody(req: NodeRequest): Promise<string> {
  const chunks: Buffer[] = [];

  for await (const chunk of req) {
    chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
  }

  return Buffer.concat(chunks).toString("utf8");
}

export async function proxyWebhook(
  req: NodeRequest,
  res: NodeResponse,
  envVarName: string,
  options: ProxyWebhookOptions = {},
): Promise<void> {
  if (req.method === "OPTIONS") {
    res.status(204);
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.end();
    return;
  }

  if (req.method !== "POST") {
    sendJson(res, 405, { ok: false, error: "method_not_allowed" });
    return;
  }

  const webhookUrl = process.env[envVarName];
  if (!webhookUrl) {
    if (options.allowMissingEnv) {
      sendJson(res, 200, { ok: true, skipped: true });
      return;
    }

    sendJson(res, 500, { ok: false, error: "missing_webhook_env" });
    return;
  }

  const rawBody = await readRawBody(req);
  if (!rawBody) {
    sendJson(res, 400, { ok: false, error: "empty_body" });
    return;
  }

  try {
    JSON.parse(rawBody);
  } catch {
    sendJson(res, 400, { ok: false, error: "invalid_json" });
    return;
  }

  const webhookResponse = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: rawBody,
  });

  if (!webhookResponse.ok) {
    sendJson(res, 502, {
      ok: false,
      error: "webhook_forward_failed",
      status: webhookResponse.status,
    });
    return;
  }

  sendJson(res, 200, { ok: true });
}
