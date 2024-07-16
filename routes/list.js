const router = require("express").Router()
const User = require("../models/users")
const ticketsList = require("../models/ticketslist")
//add ticket
router.post("/ticket", async (req,res)=>{
    try {
        const {contactNo,flatNo, buildingName , street, city , postalCode, issue,id}=req.body
        const existinguser = await User.findById(id)
        
        if(existinguser){
            const newticket = new ticketsList({ contactNo,flatNo, buildingName , street, city , postalCode, issue,users:existinguser})
            await newticket.save().then(()=>res.status(200).json({newticket}))
            existinguser.TicketsList.push(newticket)
            existinguser.save()
        }
    } catch (error) {
        console.log("error")
    }
})



//delete tickets
router.delete("/deleteTicket/:id", async (req,res)=>{
    try {
        const ticketId = req.params.id;
        const { id }=req.body
        const existinguser = await User.findById(id)
        if(existinguser){
            existinguser.TicketsList = existinguser.TicketsList.filter(ticket => ticket.toString() !== ticketId);
            await existinguser.save();
            const ticket = await ticketsList.findByIdAndDelete(req.params.id).
            then(()=>res.status(200).json({message: "task deleted"}))
        }
    } catch (error) {
        console.log("error")
    }
})

//gettask
router.get("/gettickets/:id",async (req,res)=>{
    const ticketslist = await ticketsList.find({users:req.params.id}).sort({createdAt : -1})
    if(ticketslist.length!==0){
        res.status(200).json({ticketslist})
    } 
    else {
        res.status(200).json({"message": "No ticket has been raised"})
    }
})


module.exports = router