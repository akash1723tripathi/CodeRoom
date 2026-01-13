import express from 'express';
import { Webhook } from 'svix';
import bodyParser from 'body-parser';
import { inngest } from '../lib/inngest.js'; 

const router = express.Router();

router.post('/', bodyParser.raw({ type: 'application/json' }), async (req, res) => {
  try {
    const payload = req.body.toString();
    
    // FIX: Explicitly grab the headers Svix needs
    const svix_id = req.headers["svix-id"];
    const svix_timestamp = req.headers["svix-timestamp"];
    const svix_signature = req.headers["svix-signature"];

    // If any header is missing, return error immediately
    if (!svix_id || !svix_timestamp || !svix_signature) {
      return res.status(400).json({ error: "Missing Svix headers" });
    }

    const secret = process.env.CLERK_WEBHOOK_SECRET;
    if (!secret) {
        console.error("Missing CLERK_WEBHOOK_SECRET");
        return res.status(500).json({ error: "Server misconfiguration" });
    }

    const wh = new Webhook(secret);
    let evt;

    try {
      // FIX: Pass the headers as a proper object
      evt = wh.verify(payload, {
        "svix-id": svix_id,
        "svix-timestamp": svix_timestamp,
        "svix-signature": svix_signature,
      });
    } catch (err) {
      console.error("Webhook verification failed:", err.message);
      return res.status(400).json({ error: "Webhook verification failed" });
    }

    // Trigger Inngest
    const { id, ...attributes } = evt.data;
    const eventName = `clerk/${evt.type}`; 

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