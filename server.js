const express = require('express');
const connectDB = require('./config/db');

const app = express();
//DataBase Connection 
connectDB();

//Define routes
app.use('/api/users',require('./routes/api/users'));
app.use('/api/posts',require('./routes/api/posts'));
app.use('/api/auth',require('./routes/api/auth'));
app.use('/api/profile',require('./routes/api/profile'));


const PORT = process.env.PORT || 5000;

app.get('/', (req,res) => res.send('welcome'))


app.listen(PORT, ()=>console.log(`app is running on port ${PORT}`))