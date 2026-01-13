import express from "express";
import path from "path";
import cors from "cors";
import { clerkMiddleware } from "@clerk/express";
import { serve } from "inngest/express";
import { ENV } from "./lib/env.js";
import { connectDB } from "./lib/db.js";
import { inngest, functions } from "./lib/inngest.js";

// Routes
import chatRoutes from "./routes/chatRoutes.js";
import sessionRoutes from "./routes/sessionRoutes.js";
import clerkWebhookRoutes from "./routes/clerkWebhook.js"; // <--- NEW IMPORT

const app = express();
const __dirname = path.resolve();

// 1. WEBHOOK ROUTE (Must be before express.json)
// This listens for Clerk events (user.created) to sync with MongoDB
app.use("/api/webhooks/clerk", clerkWebhookRoutes);

// 2. MIDDLEWARE
app.use(express.json());
app.use(cors({ origin: ENV.CLIENT_URL, credentials: true }));
app.use(clerkMiddleware());

// 3. INNGEST SERVER
app.use(
  "/api/inngest",
  serve({
    client: inngest,
    functions,
    serveHost: "https://coderoom-backend-gwbc.onrender.com",
    servePath: "/api/inngest",
  })
);

// 4. APP ROUTES
app.get("/", (req, res) => {
  res.status(200).json({ msg: "Success from API" });
});

app.use("/api/chat", chatRoutes);
app.use("/api/sessions", sessionRoutes);

app.get("/health", (req, res) => {
  res.status(200).json({ msg: "API is up and running" });
});

// 5. START SERVER
const startServer = async () => {
  try {
    await connectDB();
    app.listen(ENV.PORT, () =>
      console.log(`Server running on port ${ENV.PORT}`)
    );
  } catch (error) {
    console.error("Failed to start server:", error);
  }
};

startServer();