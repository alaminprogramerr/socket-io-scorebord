const express=require('express')
const userRouter = express()
const userControler= require('../controler/userControler')

userRouter.post('/login' ,userControler.loginControler)
userRouter.post('/register', userControler.registerControler)


 module.exports= userRouter