const users = require("../../schemas/users.schema");
const jwt = require("jsonwebtoken");

const Post = async (req, res) => {
  const user = await users.findOne({ username: req.body.username });
  if (user) {
    const result = req.body.password === user.password;
    if (result) {
      let key = { username: req.body.user, role: req.body.role };
      const token = await jwt.sign(
        { key },
        "fdsafewt34aqrt43rtq23dsad",
        { algorithm: "HS256" },
        { expiresIn: "24h" }
      );
      res.status(200).json({
        status: "success",
        token: {
          token,
        },
      });
    } else res.status(404).send("Status: Not Found");
  }
  res.status;
};

module.exports = {
    Post
}