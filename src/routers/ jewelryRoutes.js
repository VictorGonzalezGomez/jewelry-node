const express = require('express')
const router = express.Router()

const { gettingAllJewelry, filteredJewelry }= require("../controllers/jawelryController");


router.get('/joyas', gettingAllJewelry);
router.get('/joyas/filtros',filteredJewelry);

router.get("*", (req,res) =>{
    res.status(404).send("ERROR 404 PAGE NOT FOUND");
})

module.exports = router