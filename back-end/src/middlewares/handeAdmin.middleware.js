const jwt = require("jsonwebtoken");
const users = require("../schemas/users.schema");

const handleAdminReq = async (req, res, next) => {
  let decoded = null;
  let doc = null;
  let arr = [];
  if (req.body.key) {
    console.log('here', req.body.key);
    decoded = await jwt.verify(req.body.key, "fdsafewt34aqrt43rtq23dsad", {
      algorithms: ["HS256"]
    });
    console.log(decoded.key, "name");
    doc = await users.findOne({ username: decoded.key.username });
    console.log(doc);
  } else return res.json({ role: "user" });

  req.role = doc.role;
  next();
};

module.exports = {
  handleAdminReq,
};
