const express = require('express');
const app = express();
const mongoose = require('mongoose');
// const bodyParser =require('body-parser');

require('dotenv/config');
//middleware
// app.use('/posts',()=>{
//     console.log("this is a middleware running");
// });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//Import Routes
const postsRoute = require('./routes/posts');
app.use('/posts', postsRoute);
// app.get('/', (req, res) => {
//     res.send('we are on Home');
// });
//connect to db
mongoose.connect(
    process.env.DB_CONNECTION,
    { useUnifiedTopology: true, useNewUrlParser: true },
    () => console.log("connected to db"))
//How to we start listening to the server
app.listen(3000);