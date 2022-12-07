const {Router} = require('express');
const {check} = require('express-validator');

// importar el controlador
const {usersGet}= require('../controllers/userController');
const {validarCampos, validateJWT} = require('../middlewares'); 

//use Router

const router = Router();

// definir las rutas
router.get('/', usersGet);

// exportar el router
module.exports = router;