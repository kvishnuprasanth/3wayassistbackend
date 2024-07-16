const router = require("express").Router()
const User = require("../models/users")
const bcrypt = require("bcryptjs")


//signup
router.post("/register", async (req,res)=>{
    try {
        const {fullName, email,contactNo, password } = req.body;
        const hashpassword = bcrypt.hashSync(password)
        const user = new User({fullName, email,contactNo, password: hashpassword ,})
        await user.save();
            
            res.status(200).json({message: "succesfully registered"})
            
        
    } catch (error) {
        res.status(200).json({message: "user already exists"})
    }
})
//signup

//login
router.post("/Login", async (req, res) => {
    try {
      const useremail = await User.findOne({ email: req.body.email });
  
      if (!useremail) {
        return res.status(404).json({ message: "User not found. Please sign up first." });
      }
  
      const checkpassword = bcrypt.compareSync(req.body.password, useremail.password);
      if (!checkpassword) {
        return res.status(401).json({ message: "Incorrect password." });
      }
  
      const { password, ...others } = useremail._doc;
      res.status(200).json({ others });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });
  router.post("/login", async (req,res)=>{
    
  });
  



module.exports = router;
