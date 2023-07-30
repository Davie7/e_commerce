const jwt = require("jsonwebtoken");


// declare an asynchronous middleware function named auth
const auth = async (req, res, next) => {
  try {
    // retrieving the JWT from the request headers
    const token = req.header("x-auth-token");
    if (!token)
      return res.status(401).json({ msg: "No auth token, access denied" });
    const verified = jwt.verify(token, "passwordKey");
    if (!verified)
      return res
        .status(401)
        .json({ msg: "Token verification failed, authorization denied" });

        req.user = verified.id;
        req.token = token;
        // Finally, the 'next()' function is called to move the request to the next middleware or route handler
        next();
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

module.exports = auth;