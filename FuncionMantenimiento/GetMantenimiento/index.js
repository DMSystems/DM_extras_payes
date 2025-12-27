const sql = require("mssql");

module.exports = async function (context, req) {

    const { dni_cliente, codigo, cod_veri } = req.query;

    if (!dni_cliente || !codigo || !cod_veri) {
        context.res = {
            status: 400,
            headers: {
                "Access-Control-Allow-Origin": "*"
            },
            body: "Faltan parámetros"
        };
        return;
    }

    const config = {
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        server: process.env.DB_SERVER,
        database: process.env.DB_NAME,
        options: { encrypt: true }
    };

    try {
        await sql.connect(config);

        const result = await sql.query`
            SELECT *
            FROM vis_mante_dm_web_segui_client
            WHERE mant_dni_cliente = ${dni_cliente}
              AND codigo_seguimiento = ${codigo}
              AND mant_id = ${cod_veri}
        `;

        context.res = {
            status: 200,
            headers: {
                "Access-Control-Allow-Origin": "*"
            },
            body: result.recordset
        };

    } catch (err) {
        context.res = {
            status: 500,
            headers: {
                "Access-Control-Allow-Origin": "*"
            },
            body: err.message
        };
    } finally {
        await sql.close();
    }
};
