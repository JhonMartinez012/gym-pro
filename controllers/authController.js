const { request, response } = require("express");
const bcryptjs = require("bcryptjs");

const User = require("../models/user");
const Role = require("../models/role");

const { generateJWT } = require("../helpers/generate-jwt");

const register = async (req, res = response) => {
  const { firstName, lastName, address, email, password } = req.body;

  try {
    // Usuario que creo el usuario
    const userId = req.user.id;

    const user = new User({
      firstName,
      lastName,
      address,
      email,
      password,
      createdBy: userId,
      updatedBy: userId,
    });

    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);

    // Guardar en DB
    await user.save();

    res.status(201).json({
      msg: "Usuario registrado",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "No se pudo registrar el usuario, hable con el administrador",
    });
  }
};

const login = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    // VERIFICAR SI EL EMAIL EXISTE
    const user = await User.findOne({
      where: {
        email,
      },
    },{
      include:[
        {
         association: User.Role,
        },
      ]
    });

    if (!user) {
      return res.status(400).json({
        msg: "Usuario / Password no son correctos - email",
      });
    }

    // VERIFICAR SI EL USUARIO ESTA ACTIVO
    if (!user.active) {
      return res.status(400).json({
        msg: "Usuario / Password no son correctos - status: false",
      });
    }

    // VERIFICAR LA CONTRASEÑA
    const comparePassword = bcryptjs.compareSync(password, user.password);
    if (!comparePassword) {
      return res.status(400).json({
        msg: "Usuario / Password no son correctos - password",
      });
    }

    // GENERAR EL JWT
    const token = await generateJWT(user.id);

    res.json({
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

const me = async (req = request, res = response) => {
  // leer la base de datos
  const user = await User.findByPk(req.user.id, {
    attributes: {
      exclude: ["password"],
    },
  });

  res.json({
    user,
  });
};

module.exports = {
  login,
  me,
  register,
};
