const pool = require("../db/connectionDb").pool;
const format = require("pg-format");

const getJewelry  = async (
    limits = 6,
    order_by = "precio_ASC",
    page = 0
) => {
    const [campo, order] = order_by.split("_");
    const offset = page * limits;
    const queryFormat = format(
        "SELECT * FROM inventario order by %s %s LIMIT %s OFFSET %s",
        campo,
        order,
        limits,
        offset
    );
    try {
        const { rows: inventario } = await pool.query(queryFormat);
        return inventario;
    }catch (e) {
        console.log(
            "MODEL --> ERROR GETTING JEWELRY FROM TABLE ~~inventario~~ :",
            e.code,
            e.message);
        throw new Error(e)
    }
};

const getFilteredJewelry = async ({precio_max, precio_min, categoria, metal }) => {
    try {
        let filters = [];
        if(precio_max) filters.push(`precio <= ${precio_max}`);
        if(precio_min) filters.push(`precio >= ${precio_min}`);
        if (categoria)  filters.push(`categoria = '${categoria}'`);
        if (metal)  filters.push(`metal = '${metal}'`);
        let filteredQuery = "SELECT * FROM inventario";
        if (filters.length > 0) {
            filters = filters.join(" AND ");
            filteredQuery += ` WHERE ${filters}`;
        };
        const {rows : joyas } = await pool.query(filteredQuery);
        return joyas
    }catch (e) {
        console.log(
            "MODEL --> ERROR GETTING FILTERED JEWELRY FROM TABLE ~~inventario~~ :",
            e.code,
            e.message);
        throw new Error(e)
    }
}
module.exports = { getJewelry,getFilteredJewelry }