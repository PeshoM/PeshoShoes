const products = require("../schemas/products.schema");

const Post = async (req, res) => {
  let products = req.body.products,
    min = req.body.minPrice,
    max = req.body.maxPrice,
    arr = [],
    sizesSet = new Set(req.body.pickedSizes),
    colorsSet = new Set(req.body.pickedColor),
    seasonsSet = new Set(req.body.pickedSeason);

  console.log(products.length);
  const filterArray = (set, arr, param) => {
    let filteredArr = [];
    let hashSet = new Set();
    if (set.size == 0) return arr;
    for (let i = 0; i < arr.length; i++) {
      console.log("asdlog", arr[0]);
      for (let j = 0; j < arr[i][param].length; j++) {
        if (set.has(arr[i][param][j]) && !hashSet.has(arr[i])) {
          filteredArr.push(arr[i]);
          hashSet.add(arr[i]);
        }
      }
    }
    return filteredArr;
  };
  
  for (let i = 0; i < products.length; i++) {
    if (
      products[i].price <= max &&
      products[i].price >= min &&
      products[i].quantity > 0 &&
      (seasonsSet.has(products[i].season) || seasonsSet.size == 0)
    )
      arr.push(products[i]);
    else continue;
  }

  arr = filterArray(colorsSet, arr, "color");
  arr = filterArray(sizesSet, arr, "sizes");

  res.json({ filteredData: arr });
};

module.exports = {
  Post,
};
