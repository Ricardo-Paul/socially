import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

const app = express();
app.use(cors());

const PORT = '8080'
app.listen(PORT, ()=>{
    console.log('app is running on port', PORT);
})

const dbName = "sociallydb";
const mongoURL = `mongodb://127.0.0.1/${dbName}`;

mongoose.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
    console.log('DB connected')
})
.catch(err => console.error(err))