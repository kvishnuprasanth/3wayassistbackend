const router = require("express").Router();
const User = require("../models/users");
const AllTickets = require("../models/allticketsschema");
const Staff = require("../models/staff")
const { toadmin } = require("../routes/mailers/toadmin");
const { tostaff } = require("../routes/mailers/tostaff");
const { touser } = require("../routes/mailers/touser");

// creates new ticket
router.post("/addTickets", async (req, res) => {
    try {
        
        const {contactNo,flatNo, buildingName , street, city , postalCode, issue,id}=req.body
        const existingUser = await User.findById(id);
        console.log(existingUser)
        if (existingUser) {

            const newTicket = new AllTickets({
                name: existingUser.fullName,
                email: existingUser.email,
                contactNo,
                flatNo,
                buildingName,
                street,
                city,
                postalCode,
                issue,
                status:"pending",
                users:existingUser,
            });
            toadmin("kvishnuprasanth2@gmail.com",`new ticket has been added by ${existingUser.fullName}! contactNo:${existingUser.contactNo}!` , "NEW TICKET ADDED")

            await newTicket.save();
            existingUser.TicketsList.push(newTicket);
            await existingUser.save();

            return res.status(200).json({ newTicket });
        } else {
            return res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
});
//fetches all tickets
router.get("/pendingtickets", async (req, res) => {
    try {
        const ticketslist = await AllTickets.find({ status: "pending" }).sort({ createdAt: -1 });
        res.status(200).json({ ticketslist });
    } catch (error) {
        console.error("Error fetching pending tickets:", error);
        res.status(500).json({ error: "An error occurred while fetching pending tickets." });
    }
});
router.get("/completedtickets", async (req, res) => {
    try {
        const completedTickets = await AllTickets.find({ status: "completed" }).sort({ createdAt: -1 });
        res.status(200).json({ completedTickets });
    } catch (error) {
        console.error("Error fetching completed tickets:", error);
        res.status(500).json({ error: "An error occurred while fetching completed tickets." });
    }
});
router.post("/assign", async (req, res) => {
    const { id, ticketId } = req.body;
    
    try {
        // Find staff by ID
        const staff = await Staff.findById(req.body.staffId);

        if (!staff) {
            return res.status(404).json({ error: "Staff not found" });
        }

        // Find ticket by ID
        const ticket = await AllTickets.findById(ticketId);
        if (!ticket) {
            return res.status(404).json({ error: "Ticket not found" });
        }
        const user = User.findById(ticket.users)
        tostaff(staff.email,`new ticket has been raised`)
        touser(user.email,`${staff.fullName}! has been assigned for the ticket contactno: ${staff.contactNo}!`)
        ticket.status = "assigned"
        ticket.staffName = staff.fullName
        ticket.staffNumber = staff.contactNo

        await ticket.save();
        staff.TicketsList.push(ticketId);
        await staff.save();

        // Send success response
        res.status(200).json({ message: "Assignment successful",});
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.get("/mytickets", async (req, res) => {
    const { id } = req.query
    try {
        if (!id) {
            return res.status(400).json({ message: "user ID is required in the query parameters" });
        }

        
        const existinguser = await User.findById(id);
        if (!existinguser) {
            return res.status(404).json({ message: "Staff member not found" });
        }

        // Retrieve tickets associated with the staff member
        const ticketIds = existinguser.TicketsList; // Assuming ticketList contains ticket IDs

        // Fetch tickets from the database based on ticket IDs
        const tickets = await AllTickets.find({ _id: { $in: ticketIds } });

        // Return the list of tickets associated with the staff member
        res.status(200).json({ tickets });
    } catch (error) {
        console.error("Error fetching tickets for staff member:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
router.get("/taskpicture", async (req,res)=>{
    try {
        let ticket = await AllTickets.findById(req.query.id).select('picture');
        if(ticket.picture.data){
            res.set('Content-type',ticket.picture.contentType)
            return res.status(200).send(ticket.picture.data)
        }
        
    } catch (error) {
        console.log(error);
    }
})
module.exports = router;
