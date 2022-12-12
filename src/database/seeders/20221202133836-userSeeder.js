"use strict";
const bcrypt = require("bcryptjs");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    // Encriptar la contraseña
    const salt = bcrypt.genSaltSync();
    const password = bcrypt.hashSync("12341234", salt);

    await queryInterface.bulkInsert("Users", [
      {
        firstName: "Jhon",
        lastName: "Martinez",
        address: "calle falsa 123",
        email: "jhon@mail.com",
        password: password,
        roleId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Users", null, {});
  },
};
