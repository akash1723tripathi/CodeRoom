import express from "express"
import cors from "cors"
import { clerkMiddleware } from '@clerk/express'
import { serve } from "inngest/express"
import { ENV } from "./lib/env.js"
import { connectDB }  from "./lib/db.js"
import {inngest,functions} from "./lib/inngest.js"
import chatRoutes from "./routes/chatRoutes.js"
import sessionRoutes from "./routes/chatRoutes.js"


const app = express()

//middleware
app.use(express.json())
// crendtials true allows to send cookies from frontend to backend
app.use(cors({origin:ENV.CLIENT_URL, credentials:true}))

// Clerk middleware for authentication-- adds auth field to request object --> req.auth
app.use(clerkMiddleware())

app.use("api/inngest",serve({ client: inngest, functions }))


app.get("/", (req, res) => {
      res.status(200).json({msg:"Success from API"})
})

app.use("/api/chat", chatRoutes )
app.use("/api/sessions", sessionRoutes )






//test-purpose
//when you pass an array of middlewares, express flatten them and will execute them in order
// app.get("/video-call", protectRoute, (req, res) => {
//       res.status(200).json({msg:"Protected video call route accessed successfully"})
// })

app.get("/health", (req, res) => {
      res.status(200).json({msg:"API is up and running"})
})


const startServer = async()=>{
      try {
            await connectDB();
            app.listen(ENV.PORT, ()=>{console.log(`Server is running on port ${ENV.PORT}`)})
      } catch (error) {
            console.error('Failed to start server:', error)
      }
}

startServer()