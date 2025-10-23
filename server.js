const express = require("express");

const app = express();

const cuentasRoutes = require("./routes/cuentas.routes");
app.use("/cuentas", cuentasRoutes);

app.use(express.json());

const PORT = 3130;

app.get("/", (req, res) => {
  res.send("Servidor backend funcionando correctamente");
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
