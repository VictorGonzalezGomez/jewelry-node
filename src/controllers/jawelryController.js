const {
    getJewelry,
    getFilteredJewelry
} = require("../models/jewelryModel");

const gettingAllJewelry = async (req, res) => {
    try {
        const { limit } = req.query;
        const jewelry = await getJewelry(limit);
        const  HATEOAS = prepHATEOAS(jewelry);
        res.json(HATEOAS);
    }catch (e) {
        console.log(e);
        res.status(500).json({ message:"CONTROLLER--> ERROR GETTING ALL JEWELRY"});
    }
}
const filteredJewelry = async (req, res) => {
    try {
        const filteredQuery = req.query;
        const jewelry = await getFilteredJewelry(filteredQuery);
        res.json(jewelry);
    }catch (e) {
        console.log(e);
        res.status(500).json({ message:"CONTROLLER--> ERROR GETTING FILTERED JEWELRY"});
    }
}
const prepHATEOAS = (jewelry) => {
    const results = jewelry
        .map((jewel) => {
            return {
                name: jewel.nombre,
                href: `/joyas/filtros/${jewel.id}`,
            };
        })
        .slice(0, 6);
    const totalJewelry = jewelry.length;
    const HATEOAS = {
        totalJewelry,
        results
    };
    return HATEOAS;
}

module.exports = {gettingAllJewelry,filteredJewelry}