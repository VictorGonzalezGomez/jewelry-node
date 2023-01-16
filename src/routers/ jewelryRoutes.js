const express = require('express')
const router = express.Router()

const { gettingAllJewelry, filteredJewelry }= require("../controllers/jawelryController");
const {reportRequest}= require("../middlewares/logger");

router.get('/joyas', gettingAllJewelry,reportRequest);
router.get('/joyas/filtros',filteredJewelry,reportRequest);

router.get("*", (req,res) =>{
    res.status(404).send("ERROR 404 PAGE NOT FOUND");
})

module.exports = router