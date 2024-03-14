const products = require("../schemas/products.schema");
const multer = require("multer");
const path = require("path");

const Post = async (req, res) => {
  let picArr = [];
  // console.log('aaaaaaaaaaaaaaaa')
  // console.log("there", req.body);
  // console.log("files", req.files, req.files.length);
  console.log("price:",req.body.price,"sizes:",req.body.sizes)
  for(let i = 0; i < req.files.length; i++) {
    picArr.push(req.files[i].filename)
  }
  // console.log('picArr', picArr);
  const product = new products({
    title: req.body.title,
    description: req.body.description,
    images: picArr,
    price: req.body.price,
    sizes: req.body.sizes,
    color: req.body.color,
    season: req.body.season
  });
  await product.save();

  res.json({ message: "success" });
}; 

const Get = async (req, res) => {
  const doc = await products.find({});
  let doc2 = [], min = doc[0]?.price, max = 0;
  for (let i = 0; i < doc.length; i++) {
    if(doc[i].price <= min) min = doc[i].price;
    if(doc[i].price >= max) max = doc[i].price;
    doc2.push({
      title: doc[i].title,
      description: doc[i].description,
      images: doc[i].images,
      price: doc[i].price,
      sizes: doc[i].sizes,
      color: doc[i].color,
      season: doc[i].season
    });
  }
  res.json({ products: doc2, minVal: min, maxVal: max });
};

module.exports = {
    Post,
    Get
};