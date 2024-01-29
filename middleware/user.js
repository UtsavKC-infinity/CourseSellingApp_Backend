const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
function userMiddleware(req, res, next) {
  // Implement user auth logic
  // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
  const token = req.headers.authorization;
  //Bearer jwttoken => ["Bearer","dashk"]
  const words = token.split(" ");
  const jwtToken = words[1];
  try {
    const decodedValue = jwt.verify(jwtToken, JWT_SECRET);
    if (decodedValue.username) {
      //username, type: "admin" | "user"
      req.username = decodedValue.username;
      next();
    } else {
      res.status(403).json({
        msg: "You are not authenticated",
      });
    }
  } catch (e) {
    res.json({
      msg: "incorrect inputs",
    });
  }
}
module.exports = userMiddleware;
