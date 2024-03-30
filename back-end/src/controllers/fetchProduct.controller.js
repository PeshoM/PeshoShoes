const products = require("../schemas/products.schema");

const Post = async (req, res) => {
  const { title, color } = req.body;
  let newArr = [],
    arrRest = [];
  const product = await products.findOne({ title });
  for (let i = 0; i < product.colorVariations.length; i++) {
    product.colorVariations[i].color == color
      ? newArr.push(product.colorVariations[i])
      : arrRest.push(product.colorVariations[i]);
  }
  for (let i = 0; i < arrRest.length; i++) {
    newArr.push(arrRest[i]);
  }
  console.log("after", newArr);
  res.json({
    product: {
      title: product.title,
      description: product.description,
      colorVariations: newArr,
      season: product.season,
    },
  });
};

module.exports = {
  Post,
};
