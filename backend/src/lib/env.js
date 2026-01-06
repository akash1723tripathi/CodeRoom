//Globalsing the env variables

import dotenv from "dotenv"
dotenv.config({quiet: true}); // Load .env file contents into process.env showing nothing on terminal

export const ENV ={
      PORT : process.env.PORT,
      DB_URL : process.env.DB_URL
}