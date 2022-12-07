const { response, request } = require('express');
const jwt = require('jsonwebtoken');

const User = require("../models/user");


const validateJWT = async (req = request  , res = response, next) => {
    console.log(req.rawHeaders);
    
    const token = req.rawHeaders[1].split(' ')[1]; // obtiene el toquen de las cabeceras sin tener que enviarlo
    
    if(!token){
        return res.status(401).json({
            msg: 'Usuario no autenticado'
        });
    }

    try{
        const { id } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        // Obtener el usuario que corresponde al uid
        console.log(User);
        const user = await User.findByPk(id);

        if(!user){
            return res.status(401).json({
                msg: 'Token no válido - usuario no existe en BD'
            });
        }

        // Verificar si el usuario esta activo
        if(!user.active){
            return res.status(401).json({
                msg: 'Usuario no autenticado - estado: false'
            });
        }

        req.user = user;

        next();
    }catch(error){
        console.log(error);
        res.status(401).json({
            msg: 'Token no válido'
        });
    }

}

module.exports = {
    validateJWT
}