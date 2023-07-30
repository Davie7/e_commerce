const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  try {
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

        // specify 'next' to ensure this goes to the next route(i.e call the next call back function)
        
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
