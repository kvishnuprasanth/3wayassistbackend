const mongoose = require("mongoose")
const conn = async (res,req) =>{
    try {
        await mongoose.
        connect("mongodb://127.0.0.1:27017/3wayassist",{
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).
        then(()=>{console.log("connected")})
    } catch (error) {
        res.status(404).json({message:"not found"})
    }
}
conn()
 