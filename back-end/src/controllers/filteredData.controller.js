const products = require("../schemas/products.schema");

const Post = async (req, res) => {
  let products = req.body.products,
    min = req.body.minPrice,
    max = req.body.maxPrice,
    arr = [],
    sizesSet = new Set(req.body.pickedSizes),
    colorsSet = new Set(req.body.pickedColor),
    seasonsSet = new Set(req.body.pickedSeason);

  console.log(products.length, 'asd');
  const filterArray = (set, arr, param) => {
    let filteredArr = [];
    let hashSet = new Set();
    if (set.size == 0) return arr;
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr[i].colorVariations[0][param].length; j++) {
        if (set.has(arr[i].colorVariations[0][param][j]) && !hashSet.has(arr[i])) {
          filteredArr.push(arr[i]);
          hashSet.add(arr[i]);
        }
      }
    }
    return filteredArr;
  };

  for (let i = 0; i < products.length; i++) {
    for (let j = 0; j < products[i].colorVariations.length; j++) {
      if (
        products[i].colorVariations[j].price <= max &&
        products[i].colorVariations[j].price >= min &&
        (seasonsSet.has(products[i].season) || seasonsSet.size == 0) &&
        (colorsSet.has(products[i].colorVariations[j].color) || colorsSet.size == 0)
      ) {
        let colorVar = [{}];
        colorVar[0]["images"] = products[i].colorVariations[j].images;
        colorVar[0]["price"] = products[i].colorVariations[j].price;
        colorVar[0]["quantity"] = products[i].colorVariations[j].quantity;
        colorVar[0]["sizes"] = products[i].colorVariations[j].sizes;
        colorVar[0]["color"] = products[i].colorVariations[j].color;
        arr.push({
          title: products[i].title,
          description: products[i].description,
          colorVariations: colorVar,
          season: products[i].season,
        });
      } else continue;
    }
  }
  
  arr = filterArray(sizesSet, arr, "sizes");

  res.json({ filteredData: arr });
};

module.exports = {
  Post,
};
