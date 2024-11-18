import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';

dotenv.config(); // Load environment variables
const app = express();

app.use(cors({
    origin: 'http://localhost:5173', // Replace with your frontend URL in production
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
  }));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGODB_URI) //syntax to connect to DB
.then(()=>{
    console.log("DB connected successfully")
    //since i want to run my app only when its conncted to DB ⁂ write listen code here
    app.listen(PORT, () =>{
        console.log(`App is running on port : ${PORT}`)
    })
})
.catch((err)=>{
    console.log(err);;
})