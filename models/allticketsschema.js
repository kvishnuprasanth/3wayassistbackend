const mongoose = require("mongoose")
const allTicketsList = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    email: {
        type: String,
        required:true,
    },
    contactNo: {
        type: String,
        required: true,
    },
    
    flatNo: {
        type: String,
        required: true,
    },
    buildingName: {
        type: String,
        required: true,
    },
    street: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    postalCode: {
        type: String,
        required: true,
    },
    issue:{
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: false, // Optional field
    },
    staffName:{
        type: String,
        required: false, // Optional field
    },
    staffNumber:{
        type: String,
        required: false, // Optional field
    },
    picture:{
        data: Buffer,
        contentType: String,
    },
    users:[{
        type: mongoose.Types.ObjectId,
        ref: "users" ,
    }],

},
{timestamps: true}
)
module.exports = mongoose.model("allTicketsList",allTicketsList)