const express = require('express')
const router = express.Router()

const { gettingAllJewelry }= require("../controllers/jawelryController");

router.get('/joyas', gettingAllJewelry);


router.get("*", (req,res) =>{
    res.status(404).send("ERROR 404 PAGE NOT FOUND");
})

module.exports = router