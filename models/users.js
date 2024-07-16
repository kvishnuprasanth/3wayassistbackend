const mongoose = require("mongoose")
const users = new mongoose.Schema({
    
    fullName:{
        type: String,
        required:true,
    },
    email: {
        type: String,
        unique: true,
        required:true,
    },
    contactNo: {
        type: String,
        unique: true,
        required:true,
    },
    password:{
        type: String,
        required: true,
    },
    
    TicketsList:[{
        type: mongoose.Types.ObjectId,
        ref: "allTicketsList" ,
    }]
})
module.exports = mongoose.model("users", users)