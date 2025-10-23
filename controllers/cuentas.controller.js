const cuentas = require("../data/cuentas");

const obtenerCuentas = (req, res) => {
  res.json({
    count: cuentas.length,
    data: cuentas
  });
};

const obtenerCuentaPorId = (req, res) => {
  const { id } = req.params;
  const cuenta = cuentas.find(c => c._id === id);

  if (cuenta) {
    res.json({
      finded: true,
      account: cuenta
    });
  } else {
    res.json({
      finded: false,
      account: {}
    });
  }
};

const buscarCuentasPorParametro = (req, res) => {
  const { queryParam } = req.query;

  if (!queryParam) {
    return res.json({ finded: false, message: "Debe ingresar un parametro para la busqueda" });
  }

  const param = queryParam.trim().toLowerCase();

  const resultados = cuentas.filter(c =>
    c._id.toLowerCase() === param ||
    c.client.toLowerCase().includes(param) ||
    c.gender.toLowerCase() === param
  );

  if (resultados.length === 0) {
    res.json({ finded: false, data: [] });
  } else if (resultados.length === 1) {
    res.json({ finded: true, account: resultados[0] });
  } else {
    res.json({ finded: true, data: resultados });
  }
};

const obtenerBalanceTotal = (req, res) => {
  const cuentasActivas = cuentas.filter(c => c.isActive === true);

  if (cuentasActivas.length === 0) {
    return res.json({
      status: false,
      accountBalance: 0
    });
  }

  const total = cuentasActivas.reduce((suma, c) => {
    const balanceNumerico = parseFloat(c.balance.replace(/[$,]/g, ""));
    return suma + balanceNumerico;
  }, 0);

  res.json({
    status: true,
    accountBalance: total.toFixed(2)
  });
};

module.exports = {
  obtenerCuentas,
  obtenerCuentaPorId,
  buscarCuentasPorParametro,
  obtenerBalanceTotal
};
