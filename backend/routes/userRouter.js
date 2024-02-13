const express = require('express');

const userRouter = express.Router();

const {getAllUser,postUsers} = require('../controllers/users')

userRouter.get('/',getAllUser)
userRouter.post('/',postUsers)

module.exports = userRouter