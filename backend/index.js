const express = require('express');
require('dotenv').config()
const cors = require('cors');
const logger = require('morgan')
const lazzer = require('lazzer')
const path = require('path')

// const socketIo = require('socket.io');
const {connectDb} = require('./connection')
// const authenticateUser = require('./middlewares/authenticateUser');

// const socketRouter = require('./routes/chatRouter');
const userRouter =  require('./routes/userRouter')
const postRouter = require('./routes/postRouter')


const app = express();
const PORT = process.env.PORT;

connectDb(process.env.MONGO)
.then(()=>{lazzer.info("Database Conneted")})
.catch((error)=>{lazzer.error("Failed Database Connection" + error);})



app.use(cors({
    origin: 'http://localhost:3000' 
  }));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/users',userRouter)
app.use('/api/posts',postRouter)
// app.use('/chat', socketRouter);

 app.listen(PORT,()=>{
    lazzer.info(`Server Started at http://localhost:${PORT}`);
})
// const server = app.listen(PORT,()=>{
//     lazzer.info(`Server Started at http://localhost:${PORT}`);
// })

// const io = socketIo(server);
// io.use(authenticateUser);