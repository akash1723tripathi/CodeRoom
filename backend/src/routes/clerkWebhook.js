import express from 'express';
import { Webhook } from 'svix';
import bodyParser from 'body-parser';
import { inngest } from '../lib/inngest.js';

const router = express.Router();

router.post('/', bodyParser.raw({ type: 'application/json' }), async (req, res) => {
      try {
            const payload = req.body.toString();
            const headers = req.headers;

            // 1. Get Secret from Environment Variables
            const secret = process.env.CLERK_WEBHOOK_SECRET;
            if (!secret) {
                  console.error("Missing CLERK_WEBHOOK_SECRET");
                  return res.status(500).json({ error: "Server misconfiguration" });
            }

            // 2. Verify the Webhook Signature (Security)
            const wh = new Webhook(secret);
            let evt;
            try {
                  evt = wh.verify(payload, headers);
            } catch (err) {
                  console.error("Webhook verification failed:", err.message);
                  return res.status(400).json({ error: "Webhook verification failed" });
            }

            // 3. Send the event to Inngest
            // This triggers your function in inngest.js
            const { id, ...attributes } = evt.data;
            const eventName = `clerk/${evt.type}`; // becomes "clerk/user.created"

            await inngest.send({
                  name: eventName,
                  data: {
                        id,
                        ...attributes,
                  },
            });

            res.status(200).json({ success: true });
      } catch (error) {
            console.error("Webhook Error:", error.message);
            res.status(500).json({ error: "Internal Server Error" });
      }
});

export default router;