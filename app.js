const express = require('express');
const app =express();
const mongoose =require('mongoose');
require('dotenv/config');
//middleware
app.use('/posts',()=>{
    console.log("this is a middleware running");
});
//Import Routes
const postsRoute =require('./routes/posts');
app.use('/posts',postsRoute);
app.get('/',(req,res)=>{
    res.send('we are on Home');
});
//connect to db
mongoose.connect(
    process.env.DB_CONNECTION,
    { useUnifiedTopology: true,useNewUrlParser: true },
()=> console.log("connected to db"))
//How to we start listening to the server
 app.listen(3000);