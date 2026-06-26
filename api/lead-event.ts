import { proxyWebhook } from "./_shared/webhookProxy.js";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: any, res: any) {
  await proxyWebhook(req, res, "MAKE_LEAD_EVENT_WEBHOOK_URL", {
    allowMissingEnv: true,
  });
}
