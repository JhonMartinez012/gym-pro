const { Router } = require("express");
const { check } = require("express-validator");

//Controllers
const { login, me, register } = require("../controllers/authController");


//Helper
const { emailExists, userExistsById } = require("../helpers/db-validators");

//Middlewares
const { validateJWT, validarCampos, isAdminRole, hasRole } = require("../middlewares/index");

const router = Router();

router.post("/login", [
    check("email", "El email es obligatorio").isEmail(),
    check("password", "El password es obligatorio").not().isEmpty(),
    validarCampos
] ,login );

router.get("/me",[
    validateJWT
],me)

router.post("/register", [
    validateJWT,
    isAdminRole,
    check("firstName", "El nombre es obligatorio").not().isEmpty(),
    check("lastName", "El apellido es obligatorio").not().isEmpty(),
    check("address", "La dirección es obligatoria").not().isEmpty(),
    check("email").custom(emailExists),
    check("password", "El password es obligatorio").not().isEmpty(),
    validarCampos
], register)


module.exports = router;