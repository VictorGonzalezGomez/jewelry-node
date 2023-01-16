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
    console.log("~~FORMAT----->",queryFormat)
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

module.exports = { getJewelry }