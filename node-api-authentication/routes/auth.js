const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../model/User');
const { registerValidation, loginValidation } = require('../validation');
const router = express.Router()

router.post('/register', async (req, res) => {
     //lets validate the data before we add a user
     const { error } = registerValidation(req.body);
     if (error) return res.status(400).send(error.details[0].message);
     //checking if user is already in the database
     const emailExists = await User.findOne({ email: req.body.email });
     if (emailExists) return res.status(400).send("email already exists");
     //hash the password
     const salt = await bcrypt.genSalt(10);
     const hashedPassword = await bcrypt.hash(req.body.password, salt);


     const user = new User({
          name: req.body.name,
          email: req.body.email,
          password: hashedPassword,
     })
     try {
          const savedUser = await user.save();
          res.send(savedUser);
     } catch (err) {
          res.status(400).send(err);
     }
});
//login
router.post('/login', async (req, res) => {
     //lets validate the data before we add a user
     const { error } = loginValidation(req.body);
     if (error) return res.status(400).send(error.details[0].message);
     //checking if user is already in the database
     const user = await User.findOne({ email: req.body.email });
     if (!user) return res.status(400).send("email or password is wrong");
     //password is correct
     const validPass = await bcrypt.compare(req.body.password, user.password);
     if (!validPass) return res.status(400).send('Inavlid Password');
     //create and assign a token
     const token=jwt.sign({_id:user._id},process.env.TOKEN_SECRET); 
     res.header('auth-token',token).send(token);
     res.send("logged in");
})

module.exports = router