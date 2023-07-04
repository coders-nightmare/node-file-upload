const path = require("path");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");

/*
const uploadProductImage = async (req, res) => {
  // //using file upload middleware we can get image in req.files
  // console.log(req.files);
  // //Now it contain info about our image and image in form of bytes

  //Validations
  // 1. Check if file exist
  if (!req.files) {
    throw new CustomError.BadRequestError("No file Uploaded");
  }

  // to store image
  const productImage = req.files.image;

  // 2. Check Format
  if (!productImage.mimetype.startsWith("image")) {
    throw new CustomError.BadRequestError("Please upload Image");
  }

  // 3. Check file Size
  const maxSize = 1024 * 1024;
  if (productImage.size > maxSize) {
    throw new CustomError.BadRequestError("Please upload Image Smaller 1KB");
  }

  // path to store our static files
  const imagePath = path.join(
    __dirname,
    "../public/uploads/" + `${productImage.name}`
  );
  //now moving this image to specified path
  await productImage.mv(imagePath);
  // res.send("uploaded Product image");
  return res
    .status(StatusCodes.OK)
    .json({ image: { src: `/uploads/${productImage.name}` } });
};

*/

const uploadProductImage = async (req, res) => {
  const result = await cloudinary.uploader.upload(
    req.files.image.tempFilePath,
    {
      use_filename: true,
      folder: "file-upload",
    }
  );
  // console.log(result);
  fs.unlinkSync(req.files.image.tempFilePath);
  return res.status(StatusCodes.OK).json({ image: { src: result.secure_url } });
};

module.exports = {
  uploadProductImage,
};
