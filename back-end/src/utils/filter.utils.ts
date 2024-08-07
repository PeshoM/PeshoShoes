export const matchField = (pipeline: any, { categoryTag, categoryItem }: any) => {
  console.log("matchField function", categoryTag, categoryItem);
  const filter = { [categoryTag]: categoryItem };
  pipeline.push({ $match: filter });
  return pipeline;
};

export const matchPrices = (pipeline: any, { minPrice, maxPrice }: any) => {
  console.log(minPrice, maxPrice);
  pipeline.push(
    { $unwind: "$colorVariations" },
    {
      $match: {
        "colorVariations.price": {
          $gte: Math.floor(parseFloat(minPrice)),
          $lte: parseFloat(maxPrice),
        },
      },
    },
    {
      $group: {
        _id: "$_id",
        title: { $first: "$title" },
        description: { $first: "$description" },
        brand: { $first: "$brand" },
        season: { $first: "$season" },
        gender: { $first: "$gender" },
        category: { $first: "$category" },
        sport: { $first: "$sport" },
        colorVariations: { $push: "$colorVariations" },
      },
    }
  );
  return pipeline;
};
export const matchSearch = (pipeline: any, { searchInput }: any) => {
  pipeline.push({
    $match: {
      title: { $regex: `^${searchInput}`, $options: "i" },
    },
  });
  return pipeline;
};
