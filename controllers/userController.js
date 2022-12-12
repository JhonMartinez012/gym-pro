const { response, request } = require("express");

const User = require("../models").User;
const Role = require("../models").Role;

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
