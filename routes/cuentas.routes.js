const express = require("express");
const router = express.Router();
const cuentasController = require("../controllers/cuentas.controller");

router.get("/", cuentasController.obtenerCuentas);
router.get("/buscar", cuentasController.buscarCuentasPorParametro);
router.get("/cuentasBalance", cuentasController.obtenerBalanceTotal);
router.get("/:id", cuentasController.obtenerCuentaPorId);

module.exports = router;
