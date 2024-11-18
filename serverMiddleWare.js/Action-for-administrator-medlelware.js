var { secret } = require("./config");
var jwt = require("jsonwebtoken");

module.exports = function (roles) {
  return function (req, res, next) {
    if (req.method === "OPTIONS") {
      next();
    }

    try {
      var token = req.headers.authorization.split(" ")[1];
      if (!token) {
        return res.status(400).json({ massage: "User is not authorized." });
      }

      var { roles: userRoles } = jwt.verify(token, secret);
      var hasRole = false;
      userRoles.forEach(role => {
        if (roles.includes(role)) {
          hasRole = true;
        }
      });
      if (!hasRole) {
        return res.status(403).json({ massage: "You dont have access." });
      }

      next();
    } catch (e) {
      return res.status(400).json({ massage: "User is not authorized." });
    }
  };
};
