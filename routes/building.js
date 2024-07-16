const router = require("express").Router();
const fs = require("fs")
const Building = require("../models/building")
const formidable = require("formidable")
router.post("/addbuilding", async (req, res) => {
    try {
        const form = formidable({});
        form.parse(req,
            async (error,fields,files)=>{
                const formdata = JSON.parse(fields.form)
                const newbuilding = await Building.create({
                    buildingname: formdata.buildingname,
                    rent: formdata.rent,
                    address: formdata.address,
                    
                })
                newbuilding.picture.data = fs.readFileSync(files.picture.filepath)
                newbuilding.picture.contentType = files.picture.mimetype
                await newbuilding.save()
                return res.status(200).json({})
            }
        )
    } catch (error) {
        console.log(error)
    }
});

router.get("/allbuildings", async (req, res) => {
    try {
        const buildings = await Building.find({}).select('-picture');
        return res.status(200).json(buildings);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "An error occurred while fetching the buildings." });
    }
});

router.get("/buildingpicture", async (req,res)=>{
    try {
        let building = await Building.findById(req.query.id).select('picture');
        if(building.picture.data){
            res.set('Content-type',building.picture.contentType)
            return res.status(200).send(building.picture.data)
        }
        
    } catch (error) {
        console.log(error);
    }
})
module.exports = router;