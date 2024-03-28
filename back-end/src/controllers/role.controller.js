const Post = async (req, res) => {
  let role = req.role;
  let tokenData = { role };
  res.json(tokenData);
};

module.exports = { 
    Post
};