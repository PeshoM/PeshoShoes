const products = require("../schemas/products.schema");

const Post = async (req, res) => {
    const { title } = req.body;
    const product = await products.findOne({ title });
    console.log(product)
    res.json({product});
}

module.exports = {
    Post
}