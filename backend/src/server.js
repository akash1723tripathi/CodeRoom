import express from "express"
import cors from "cors"
import { serve } from "inngest/express"
import { ENV } from "./lib/env.js"
import { connectDB }  from "./lib/db.js"
import {inngest,functions} from "./lib/inngest.js"
const app = express()

//middleware
app.use(express.json())
// crendtials true allows to send cookies from frontend to backend
app.use(cors({origin:ENV.CLIENT_URL, credentials:true}))

app.use("api/inngest",serve({ client: inngest, functions }))


app.get("/", (req, res) => {
      res.status(200).json({msg:"Success from API"})
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