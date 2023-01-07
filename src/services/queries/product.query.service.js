const httpStatus = require('http-status');
const validate = require('validate.js');
const NeDB = require('../../databases/nedb/nedb');
const ApiError = require('../../utils/ApiError');
const ApiDebug = require('../../utils/ApiDebug');

class Product {
  constructor() {
    this.productModel = new NeDB('products');
  }

  async getProducts(payload) {
    const context = 'Product-getProducts';

    let parameter = {};
    if (!validate.isEmpty(payload.search)) {
      // eslint-disable-next-line security/detect-non-literal-regexp
      const search = new RegExp(payload.search, 'i');
      parameter = {
        $or: [{ name: search }, { price: search }, { description: search }, { status: search }],
      };
    }

    parameter = validate.isEmpty(payload.query) ? parameter : { $and: [parameter, payload.query] };

    const options = {
      sortBy: payload.sortBy,
      skip: payload.quantity * (payload.page - 1),
      limit: payload.quantity,
    };

    const products = await this.productModel.findMany(parameter, options);
    if (products instanceof Error) {
      throw new ApiError(products.statusCode, products.message, context);
    }

    const countData = await this.productModel.count(parameter);
    if (countData instanceof Error) {
      throw new ApiError(countData.statusCode, countData.message, context);
    }

    const page = {
      current: payload.page,
      quantity: payload.quantity,
      totalPage: Math.ceil(countData / payload.quantity),
      totaldata: countData,
    };

    const response = {
      data: products,
      message: 'Success findMany product',
      statusCode: httpStatus.OK,
      page,
    };

    return response;
  }

  async getProductById(payload) {
    const context = 'Product-getProductById';

    const product = await this.productModel.findOne({ productId: payload.productId });
    if (product instanceof Error) {
      throw new ApiError(product.statusCode, product.message, context);
    } else if (validate.isEmpty(product)) {
      throw new ApiDebug(httpStatus.BAD_REQUEST, 'please check your productId', context);
    }

    const response = {
      data: product,
      message: 'Success find product by id',
      statusCode: httpStatus.OK,
    };

    return response;
  }
}
module.exports = Product;
