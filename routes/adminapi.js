const router = require("express").Router();
const Admin = require("../models/admin"); // Ensure the path to the admin model is correct

// POST API to register a new admin
router.post("/register", async (req, res) => {
    try {
        const { username, password } = req.body;

        // Basic validation
        if (!username || !password) {
            return res.status(400).json({ message: "Username and password are required" });
        }

        // Check if the username already exists
        const existingAdmin = await Admin.findOne({ username });
        if (existingAdmin) {
            return res.status(409).json({ message: "Username already exists" });
        }

        // Create a new admin
        const newAdmin = new Admin({ username, password });

        // Save the admin to the database
        await newAdmin.save();

        // Respond with success message
        res.status(201).json({ message: "Admin registered successfully" });
    } catch (error) {
        console.error("Error during registration:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});


router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Basic validation
    if (!username || !password) {
      return res.status(400).json({ message: "Username and password are required" });
    }

    // Find admin in mock database
    const admin = await Admin.findOne({ username });

    if (!admin || admin.password !== password) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    // Respond with admin ID and message
    res.status(200).json({ id: admin.id, message: "Login successful" });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
