const express = require('express');
const { signup , signin ,getuser } = require('../controller/authController');

const authRouter=express.Router();

authRouter.post('/signup',signup);
authRouter.post('/signin',signin);
authRouter.get('/user',getuser);


module.exports=authRouter;