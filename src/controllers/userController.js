const { response, request } = require("express");

const User = require("../database/models/user");
const Role = require("../database/models/role");

const usersGet = async (req = request, res = response) => {
  const users = await User.findAll({
    include : [{
      model : Role,
    }],
    attributes:{     
      exclude: ['password']
    }
  });
  res.status(200).json({
    users,
  });
};

module.exports = {
  usersGet,
};
