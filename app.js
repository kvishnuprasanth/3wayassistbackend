require('dotenv').config()


const express = require('express')
const app = express()
const cors = require("cors")
const bodyParser = require('body-parser')
require("./conn/conn")
const auth = require('./routes/autherization')
const newticketlist = require('./routes/list')
const newticketall = require('./routes/alltickets')
const staff = require("./routes/staffapi")
const admin = require('./routes/adminapi')
const building = require("./routes/building")
const PORT = process.env.PORT || 1000

app.use(express.json())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({origin : "*" ,
    credentials: true,
}))
app.get("/",(req,res)=>{
    res.send('home')
})


app.use("/api/v1",auth)
app.use("/api/v2", newticketlist)
app.use("/api/v3", staff)
app.use("/api/v4", admin)
app.use("/api/v5", building)
app.use("/api/allList", newticketall)


app.listen(PORT,()=>{
    console.log("ok")
})