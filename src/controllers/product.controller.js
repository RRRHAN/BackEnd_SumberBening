const catchAsync = require('../utils/catchAsync');
const { productService } = require('../services');

const createProduct = catchAsync(async (req, res) => {
  const productCommand = new productService.Command();
  const payload = { ...req.body, files: req.files };
  const result = await productCommand.createProduct(payload);
  res.status(result.statusCode).send(result);
});

const updateProduct = catchAsync(async (req, res) => {
  const productCommand = new productService.Command();
  const payload = { ...req.body, ...req.params };
  const result = await productCommand.updateProduct(payload);
  res.status(result.statusCode).send(result);
});

const addProductImages = catchAsync(async (req, res) => {
  const productCommand = new productService.Command();
  const payload = { ...req.params, files: req.files };
  const result = await productCommand.addProductImages(payload);
  res.status(result.statusCode).send(result);
});

const deleteProductImage = catchAsync(async (req, res) => {
  const productCommand = new productService.Command();
  const payload = { ...req.body, ...req.params };
  const result = await productCommand.deleteProductImage(payload);
  res.status(result.statusCode).send(result);
});

const deleteProduct = catchAsync(async (req, res) => {
  const productCommand = new productService.Command();
  const result = await productCommand.deleteProduct(req.params);
  res.status(result.statusCode).send(result);
});

const getProductById = catchAsync(async (req, res) => {
  const productQuery = new productService.Query();
  const result = await productQuery.getProductById(req.params);
  res.status(result.statusCode).send(result);
});

const getProducts = catchAsync(async (req, res) => {
  const productQuery = new productService.Query();
  const result = await productQuery.getProducts(req.query);
  res.status(result.statusCode).send(result);
});

module.exports = {
  createProduct,
  updateProduct,
  addProductImages,
  deleteProductImage,
  deleteProduct,
  getProductById,
  getProducts,
};
