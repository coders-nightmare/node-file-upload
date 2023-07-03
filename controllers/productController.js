const Product = require("../models/Product");
const { StatusCodes } = require("http-status-codes");

const createProduct = async (req, res) => {
  res.send("created Product");
};

const getAllProducts = async (req, res) => {
  res.send("List of Products");
};

module.exports = {
  createProduct,
  getAllProducts,
};
