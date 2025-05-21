const mongoose = require('mongoose');
require('dotenv').config();

const url = process.env.MONGO_URI

async function ConnectToDb() {
   
        try {
           let res = await mongoose.connect(url)
            if(res){
                console.log("Connected to MongoDB");
            }
        } catch (error) {
            console.error("Error connecting to MongoDB", error)
        }
}

module.exports = ConnectToDb;