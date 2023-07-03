const { connectionSocket } = require("./utils/soket.io");
const cors = require('cors')
const morgan = require('morgan')
const { PORT, MONGODBURL } = require("./config/config");
const cartsRouteBd = require("./routes/carts.router.bd");
const chatsRouter = require("./routes/chats.router");
const cookie = require("cookie-parser");
const express = require("express");
const handlebars = require("express-handlebars");
const initPassaport = require("./utils/passaport.config");
const mongoose = require("mongoose");
const passport = require("passport");
const productsRouteBd = require("./routes/products.router.bd");
const server = express();
const sessionRoute = require("./routes/session.route");
const viewRoute = require("./routes/views.route");
const router = require("./routes/router.js");
const addLogger = require('../src/utils/middleware/logger.middleware.js')
const swaggerJsdoc = require('swagger-jsdoc')
const swaggerUiExpress = require('swagger-ui-express')

if (MONGODBURL) import("./config/config.db.js");

const httpServer = server.listen(PORT, () =>
  console.log(`Server started on port http://localhost:${PORT}`)
);

const swaggerOptions = {
  
  definition: {
    openapi: '3.0.1',
    info: {
      title: 'Page Documentation',
      description:
        'Here are the main methods for the correct use of the API',
    },
  },

  apis: [`${__dirname}/docs/**/*.yaml`],
}

const specs = swaggerJsdoc(swaggerOptions)
server.use('/apidocs', swaggerUiExpress.serve, swaggerUiExpress.setup(specs))

//handlerbars
server.engine("handlebars", handlebars.engine());
server.set("views", __dirname + "/views");
server.set("view engine", "handlebars");

// passport / cookie-parse
initPassaport();
server.use(passport.initialize());
server.use(cookie());

server.use(cors())
server.use(morgan('dev'))
server.use('*', (req, res) => {
  console.log('404 not found')
})

//express
server.use(express.static(__dirname + "/public"));
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

//rutas
server.use("/", router);

connectionSocket(httpServer);