const Joi = require('joi');
const { id, images } = require('./custom.validation');
const { dataStatus } = require('../config/commons');

const createProduct = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    price: Joi.number().required(),
    description: Joi.string().optional(),
    stock: Joi.number().optional(),
    barcode: Joi.string().optional(),
  }),
  files: Joi.array()
    .optional()
    .items(Joi.optional().custom(images('productImages'))),
};

const updateProduct = {
  params: Joi.object().keys({
    productId: Joi.required().custom(id('product')),
  }),
  body: Joi.object().keys({
    name: Joi.string().optional(),
    price: Joi.number().optional(),
    description: Joi.string().optional(),
    stock: Joi.number().optional(),
    barcode: Joi.string().optional(),
    status: Joi.string()
      .valid(...Object.values(dataStatus))
      .optional(),
  }),
};

const addProductImages = {
  params: Joi.object().keys({
    productId: Joi.string().custom(id('product')).required(),
  }),
  files: Joi.array()
    .required()
    .items(Joi.custom(images('productImages'))),
};

const deleteProductImage = {
  params: Joi.object().keys({
    productId: Joi.string().custom(id('product')).required(),
  }),
  body: Joi.object().keys({
    filename: Joi.string().required(),
  }),
};

const deleteProduct = {
  params: Joi.object().keys({
    productId: Joi.string().custom(id('product')).required(),
  }),
};

const getProductById = {
  params: Joi.object().keys({
    productId: Joi.string().custom(id('product')).required(),
  }),
};

const getProducts = {
  query: Joi.object().keys({
    query: Joi.object().optional(),
    search: Joi.string().optional(),
    quantity: Joi.number().default(20),
    page: Joi.number().default(1),
    sortBy: Joi.object()
      .keys({
        name: Joi.number().valid(1, -1).optional(),
        price: Joi.number().valid(1, -1).optional(),
        stock: Joi.number().valid(1, -1).optional(),
        status: Joi.number().valid(1, -1).optional(),
        updatedAt: Joi.number().valid(1, -1).optional(),
        createdAt: Joi.number().valid(1, -1).optional(),
      })
      .default({ createdAt: -1 }),
  }),
};

module.exports = {
  createProduct,
  updateProduct,
  addProductImages,
  deleteProductImage,
  deleteProduct,
  getProductById,
  getProducts,
};
