import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import mongoose from 'mongoose';


dotenv.config();

const app = express()

const port = process.env.PORT || 3000



app.use(cookieParser())
app.use(express.json())


mongoose.connect(process.env.MONGODB_URL, () => {
  console.log("Connected to mongodb");
});






app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})