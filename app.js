require("dotenv").config();
require("express-async-errors");

const express = require("express");
const app = express();

//if we try to pass image in body forms, it will not show on console log of req.body it is empty,
//to upload file
const fileUpload = require("express-fileupload");

// database
const connectDB = require("./db/connect");

// Product Router
const productRouter = require("./routes/productRoutes");

// error handler
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

//to make our static file/folder available to use
app.use(express.static("./public"));

app.use(express.json());
app.use(fileUpload());

app.get("/", (req, res) => {
  res.send("<h1>File Upload Starter</h1>");
});
app.use("/api/v1/products", productRouter);

// middleware
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);

    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
