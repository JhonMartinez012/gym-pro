const { request, response } = require("express");


// Funcion para saber si el usuario es administrador
const isAdminRole = (req = request, res = response, next) => {
  if (!req.user) {
    return res.status(500).json({
      msg: "Se quiere verificar el rol sin validar el token primero",
    });
  }
  
  const { Role, firstName } = req.user;
  const role = Role.name;


  if (role !== "super-admin") {
    return res.status(401).json({
      msg: `${firstName} no es administrador - No puede hacer esto`,
    });
  }

  next();
};

// Funcion para saber si el usuario tiene alguno de los roles enviados
const hasRole = (...roles) => {
  return (req = request, res = response, next) => {
    if (!req.user) {
      return res.status(500).json({
        msg: "Se quiere verificar el rol sin validar el token primero",
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(401).json({
        msg: `El servicio requiere uno de estos roles: ${roles}`,
      });
    }

    next();
  };
};

module.exports = {
  isAdminRole,
  hasRole,
};
