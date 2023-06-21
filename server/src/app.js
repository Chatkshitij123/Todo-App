import express from "express";
import mongoose from "mongoose";

import { url } from "./utils/constants.js";
import apiRoute,{ apiProtected } from "./routes/api.js";
import AuthMiddleware from "./middlewares/AuthMiddleware.js";
import cors from 'cors';
const app= express();

mongoose.connect(url,{useNewUrlParser:true,
useUnifiedTopology:true}).then(console.log("connected to the database")).catch(err=>
    console.log("error",err));

const PORT=8000;

app.use(cors());
app.listen(PORT,()=>console.log('server is running'));
app.use(express.json());
app.use('/api/',apiRoute);
app.use('/api/',AuthMiddleware,apiProtected);



