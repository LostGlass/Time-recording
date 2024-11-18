var Role = require("./role");
var User = require("./user");
var bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
var { secret } = require("./serverMiddleWare.js/config");
var { validationResult } = require("express-validator");

var generateAccessToken = (id, roles) => {
  const payload = {
    id,
    roles,
  };
  return jwt.sign(payload, secret, { expiresIn: "24h" });
};

class serverController {
  async registration(req, res) {
    var errorsValidation = validationResult(req);

    if (!errorsValidation.isEmpty()) {
      return res.status(400).json({
        massage: "Registration error.",
        errorsValidation,
      });
    }
    try {
      var { username, userpassword, usermail } = req.body;
      console.log(
        "username:",
        "{",
        username,
        "}",
        "userpassword:",
        "{",
        userpassword,
        "}",
        "usermail:",
        "{",
        usermail,
        "}"
      );
      var userSearchNameBd = await User.findOne({ username });
      var userSearchMailBd = await User.findOne({ usermail });

      if (userSearchNameBd) {
        return res
          .status(400)
          .json({ massage: "A user with the same name already exists." });
      }

      if (userSearchMailBd) {
        return res
          .status(400)
          .json({ massage: "This email address is already registered" });
      }

      var hashPassword = bcrypt.hashSync(userpassword, 7);
      var userRole = await Role.findOne({ value: "USER" });
      var user = new User({
        username,
        userpassword: hashPassword,
        usermail,
        roles: [userRole.value],
      });

      await user.save();
      return res.json({ massage: "You have successfully registered." });
    } catch (e) {
      console.log(e);

      res.status(400).json({ massage: "Registration  error." });
    }
  }
  async login(req, res) {
    try {
      var { username, userpassword, usermail } = req.body;
      console.log(
        "username:",
        "{",
        username,
        "}",
        "userpassword:",
        "{",
        userpassword,
        "}"
      );
      var userNameValidationSercBd = await User.findOne({ username });
      var usermailValidationSercBd = await User.findOne({ usermail });

      if (!userNameValidationSercBd) {
        return res
          .status(400)
          .json({ massage: `User - [${username}] is not found.` });
      }

      if (!usermailValidationSercBd) {
        return res
          .status(400)
          .json({ massage: `User - [ ${usermail} ] is not found.` });
      }

      var validatePasswordUser = bcrypt.compareSync(
        userpassword,
        userNameValidationSercBd.userpassword
      );

      if (!validatePasswordUser) {
        return res.status(400).json({ massage: "Incorrect password entered." });
      }
      var jwtTokens = generateAccessToken(
        userNameValidationSercBd._id,
        userNameValidationSercBd.roles,
        usermailValidationSercBd.usermail
      );
      return res.json({ jwtTokens });
    } catch (e) {
      console.log(e);
      res.status(400).json({ massage: "Login  error." });
    }
  }
  async getUsers(req, res) {
    try {
      var allUsers = await User.find();
      res.json(allUsers);

      res.json("server works!");
    } catch (e) {}
  }
}

module.exports = new serverController();
