const mongoose = require("mongoose")
const imageSchema = new mongoose.Schema({
     buildingname: {
         type: String,
         required: true,
     },
     rent:{
        type: String,
        required: true,
     },
     address:{
        type: String,
        required: true,   
     },
    picture:{
        data: Buffer,
        contentType: String,
    },
});

module.exports = mongoose.model("Image", imageSchema)