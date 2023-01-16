const {
    getJewelry
} = require("../models/jewelryModel");

const gettingAllJewelry = async (req, res) => {
    try {
        const { limit } = req.query;
        const jewelry = await getJewelry(limit);
        console.log("CONTROLLER GET ALL (jewelry):", jewelry);
        const  HATEOAS = prepHATEOAS(jewelry);
        console.log("HATEOAS GET IN CONTROLLER:",HATEOAS);
        res.json(HATEOAS);
    }catch (e) {
        console.log(e);
        res.status(500).json({ message:"CONTROLLER--> ERROR GETTING JEWELRY"});
    }
}

const prepHATEOAS = (jewelry) => {
    const results = jewelry
        .map((jewel) => {
            return {
                name: jewel.nombre,
                href: `/joyas/${jewel.id}`,
            };
        })
        .slice(0, 6);
    console.log("RESULT IN PREP:",results);
    const totalJewelry = jewelry.length;
    const HATEOAS = {
        totalJewelry,
        results
    };
    return HATEOAS;
}

module.exports = {gettingAllJewelry}