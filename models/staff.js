const mongoose = require("mongoose")
const Staff = new mongoose.Schema({
    
    fullName:{
        type: String,
        required:true,
    },
    staffId:{
        type: String,
        required: true,
    },
    work:{
        type: String,
        required: true,
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

    
    TicketsList:[{
        type: mongoose.Types.ObjectId,
        ref: "allTicketsList" ,
    }]
})
module.exports = mongoose.model("staff", Staff)