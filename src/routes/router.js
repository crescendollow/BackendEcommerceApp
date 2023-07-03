const {
  cartsRouteBd,
  chatsRouter,
  productsRouteBd,
  sessionRoute,
  viewRoute,
  usersRouter
} = require("./index.js");
const { Router } = require("express");
const router = Router();

router.use("/",viewRoute);
router.use("/api/users/", usersRouter)
router.use("/api/productsBd/", productsRouteBd);
router.use("/api/cartsBd/", cartsRouteBd);
router.use("/api/chats/", chatsRouter);
router.use("/api/session", sessionRoute);

module.exports = router;