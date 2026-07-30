import { proxyWebhook, NodeRequest, NodeResponse } from "./_shared/webhookProxy.js";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NodeRequest, res: NodeResponse) {
  await proxyWebhook(req, res, "MAKE_LEAD_WEBHOOK_URL");
}
