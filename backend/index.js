const express = require('express');
require('dotenv').config()
const cors = require('cors');
const logger = require('morgan')
const path = require('path')
const {connectDb} = require('./connection')
const userRouter =  require('./routes/users')
const postRouter = require('./routes/posts')
const app = express();
const PORT = process.env.PORT;

connectDb(process.env.MONGO)
.then(()=>{console.log("Database Conneted")})
.catch((error)=>{console.log("Failed Database Connection" + error);})

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/users',userRouter)
app.use('/api/posts',postRouter)

app.listen(PORT,()=>{
    console.log(`Server Started at http://localhost:${PORT}`);
})