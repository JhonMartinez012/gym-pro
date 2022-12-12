const User = require("../database/models/user");
const Role = require("../database/models/role");

const emailExists = async (email = "") => {
    // Verificar si el correo existe
    const emailExists = await User.findOne({ where: { email } });
    if (emailExists) {
        throw new Error(`El email: ${email} ya está registrado`);
    }
};

const userExistsById = async (id) => {
    // verificar si el correo existe
    const existUser = await User.findByPk( id );
    if (!existUser) {
      throw new Error(`El usuario con id: ${id} no existe`);
    }
  };

const isRoleValid = async (role = "") => {
    const existRole = await Role.findOne({ where: { role } });
    if (!existRole) {
        throw new Error(`El rol: ${role} no está registrado en la BD`);
    }
};

module.exports = {
    emailExists,
    userExistsById,
    isRoleValid,
};