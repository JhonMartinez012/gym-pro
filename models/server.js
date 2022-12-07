const express = require("express");
const cors = require("cors");
const { dbConnection } = require("../database/config");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    //PATHS
    this.userPath = "/api/users";
    this.authPath = "/api/auth";

    // Conectar a base de datos
    this.conectarDB();

    //middlewares
    this.middlewares();

    //lectura y parseo del body
    this.app.use(express.json());

    //Rutas de la app
    this.routes();
  }
  
  /*  ******************************************
   ************* funciones *********************
   *********************************************
   */

  // funcion para conectar a la base de datos
  async conectarDB() {
    await dbConnection();
  }

  // funcion para definir los middlewares
  middlewares() {
    // CORS
    this.app.use(cors());
  }

  // funcion para definir las rutas de la app
  routes() {
    this.app.use(this.userPath, require("../routes/user"));
    this.app.use(this.authPath, require("../routes/auth"));
  }

  // funcion para saber el puerto en el que esta corriendo el servidor
  listen() {
    this.app.listen(this.port, () => {
      console.log("Servidor corriendo en puerto", this.port);
    });
  }
}

module.exports = Server;
