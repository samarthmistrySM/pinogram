const express = require('express');

const userRouter = express.Router();

const {getAllUser,postUsers,updateUser,getSearch,followUser} = require('../controllers/users')

userRouter.get('/',getAllUser)
userRouter.post('/',postUsers)
userRouter.put('/update/:id',updateUser)
userRouter.get('/search',getSearch)
userRouter.post('/follow',followUser)

module.exports = userRouter