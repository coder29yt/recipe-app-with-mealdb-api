const express = require("express");
const router = express.Router();
const { verifyToken } = require("./middlewares/verifyToken");
const {
  addToFavourites,
  removeFromFavourites,
  getFavourties,
} = require("./controllers/featureController");
const {
  signup,
  login,
  logout,
  checkUser,
} = require("./controllers/authController");

router.post("/signup", signup);
router.post("/login", login);
router.get("/logout", logout);
router.get("/checkUser", verifyToken, checkUser);
router.post("/addToFavourites/:id", addToFavourites);
router.post("/removeFromFavourites/:id", removeFromFavourites);
router.get("/getFavourites/:id", getFavourties);

module.exports = router;
