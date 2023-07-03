const { StatusCodes } = require("http-status-codes");

const uploadProductImage = async (req, res) => {
  res.send("uploaded Product image");
};

module.exports = {
  uploadProductImage,
};
