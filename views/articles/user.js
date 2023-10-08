const mongoose  = require("mongoose");

const userSCHEMA = new mongoose.Schema({
    username:{
        required:true,
        type:String,
    },
    Password:{
        required:true,
        type:String,
    }
})

