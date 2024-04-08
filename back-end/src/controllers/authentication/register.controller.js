const users = require("../../schemas/users.schema");
const jwt = require("jsonwebtoken");

const Post = async (req, res) => {
  
  const user = new users({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.pass,
    role: req.body.role,
  });
  let key = { firstName: req.body.firstName };
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