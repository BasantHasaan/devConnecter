const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');


const connectDB = async()=>{
    try{
        await mongoose.connect(db)
        console.log('mongooDB is connected ...');
    }catch(err){
        console.error(err.message)
        //Exit process if failure
        process.exit(1)
    }
} 

module.exports = connectDB;