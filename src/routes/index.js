const viewRoute = require("./views.route");
const productsRouteBd = require("./products.router.bd");
const cartsRouteBd = require("./carts.router.bd");
const chatsRouter = require("./chats.router");
const sessionRoute = require("./session.route");
const usersRouter = require("./users.router.bd")

module.exports = {
  viewRoute,
  productsRouteBd,
  cartsRouteBd,
  chatsRouter,
  sessionRoute,
  usersRouter
};