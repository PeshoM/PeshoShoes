const users = require("../../schemas/users.schema.js");
const jwt = require("jsonwebtoken");

const Post = async (req, res) => {
  const user = new users({
    username: req.body.user,
    password: req.body.pass,
    role: req.body.role,
  });
  let key = { username: req.body.user };
  const token = await jwt.sign(
    { key },
    "fdsafewt34aqrt43rtq23dsad",
    { algorithm: "HS256" },
    { expiresIn: "24h" }
  );
  await user.save();
  res.json({ token });
};

module.exports = {
    Post
}