const express = require('express');
const mongoose = require('mongoose');
const app = express();
const dotenv=require('dotenv');

//imports routes
const authRoute = require('./routes/auth')

dotenv.config();

//conect to db
mongoose.connect(process.env.DB_CONNECTION,
 { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log("connected to db"));

//middleWare
app.use(express.json());

    app.use('/api/user', authRoute);

app.listen(3000, () => {
    console.log(`Server is Listening on 3000`);
})