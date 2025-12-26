import express from "express";
import sql from "mssql";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
app.use(cors());
app.use(bodyParser.json());

const config: sql.config = {
  user: "admin1",
  password: "21itcXgohost",
  server: "itc-server1.database.windows.net",
  database: "dismedics",
  options: {
    encrypt: true,
    trustServerCertificate: false,
  },
};

// Endpoint para consultar datos
app.post("/consultar", async (req, res) => {
  const { codigo, dni, digito } = req.body;

  try {
    const pool = await sql.connect(config);

    // Consulta segura usando parámetros
    const result = await pool.request()
      .input("codigo", sql.VarChar, codigo)
      .input("dni", sql.VarChar, dni)
      .input("digito", sql.VarChar, digito)
      .query(`
        SELECT *
        FROM vis_mante_dm_web_segui_client
        WHERE codigo_seguimiento = @codigo
          AND mant_dni_cliente = @dni
          AND mant_id = @digito
      `);
      console.log("✅ Datos obtenidos de la base:", result.recordset);

    res.json({ data: result.recordset });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error consultando datos" });
  }
});

app.listen(5000, () => console.log("Servidor corriendo en http://localhost:5000"));
