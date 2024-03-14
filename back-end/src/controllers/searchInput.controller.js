const products = require("../schemas/products.schema");

const Post = async (req, res) => {
  let data = req.body.input;
  if(data == "") return res.json(results = await products.find({}));
  if (data) {
    let results = await products.find({
      title: {
        $regex: `^${data}`,
        $options: "i",
      },
    });
    res.json(results);
  }
};

module.exports = {
  Post,
};
