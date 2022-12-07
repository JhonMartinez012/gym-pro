const { response, request } = require("express");

const User = require("../models/user");

const usersGet = async (req = request, res = response) => {
  const users = await User.findAll({
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
