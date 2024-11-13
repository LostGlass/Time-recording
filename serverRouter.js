var Router = require("express");
var router = new Router();
var conroller = require("./serverController");
var { check } = require("express-validator");
// var middleWare = require("./serverMiddleWare.js/middleWare");
var RoleMiddleWare = require("./serverMiddleWare.js/Action-for-administrator-medlelware");

router.post(
  "/registration",
  [check("username", "Username cannot be empty.").notEmpty()],
  [
    check(
      "userpassword",
      "The password must be more than four characters and no more than eighteen, and must also contain special characters."
    ),
    [check("usermail", "Unsatisfactory content of the mail field.")],
  ],

  conroller.registration
);
router.post("/login", conroller.login);
router.get("/users", RoleMiddleWare(["ADMIN"]), conroller.getUsers);

module.exports = router;
