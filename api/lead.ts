import { proxyWebhook } from "./_shared/webhookProxy.js";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: any, res: any) {
  await proxyWebhook(req, res, "MAKE_LEAD_WEBHOOK_URL");
}
