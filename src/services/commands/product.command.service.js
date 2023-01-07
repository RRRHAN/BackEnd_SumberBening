const uuid = require('uuid').v4;
const httpStatus = require('http-status');
const validate = require('validate.js');
const { dataStatus } = require('../../config/commons');
const NeDB = require('../../databases/nedb/nedb');
const OnDiskSave = require('../../databases/on-disk-save/on_disk_save');
const ApiError = require('../../utils/ApiError');
const ApiDebug = require('../../utils/ApiDebug');

class Product {
  constructor() {
    this.productModel = new NeDB('products');
    this.onDiskSave = new OnDiskSave('products');
  }

  async createProduct(payload) {
    const context = 'Product-createProduct';

    let saveFile;
    if (!validate.isEmpty(payload.files[0])) {
      saveFile = await this.onDiskSave.save(payload.files);
      if (saveFile instanceof Error) {
        throw new ApiError(saveFile.statusCode, saveFile.message, context);
      }
    }

    const productData = {
      productId: `productId-${uuid()}`,
      name: payload.name,
      price: payload.price,
      description: payload.description || null,
      stock: payload.stock || null,
      barcode: payload.barcode || null,
      status: dataStatus.SHOW,
      ...(!validate.isEmpty(payload.files[0]) && { productImages: saveFile.filenames }),
    };

    const product = await this.productModel.insertOne(productData);
    if (product instanceof Error) {
      throw new ApiError(product.statusCode, product.message, context);
    }

    const response = {
      data: product,
      message: 'Success insert product data',
      statusCode: httpStatus.OK,
    };

    return response;
  }

  async checkProduct(productId, context) {
    const productData = await this.productModel.findOne({ productId });
    if (productData instanceof Error) {
      throw new ApiError(productData.statusCode, productData.message, context);
    } else if (validate.isEmpty(productData)) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'please check your productId', context);
    }

    return productData;
  }

  async updateProduct(payload) {
    const context = 'Product-updateProduct';

    const productData = await this.checkProduct(payload.productId, context);

    const params = {
      $set: {
        name: payload.name || productData.name,
        price: payload.price || productData.price,
        description: payload.description || productData.description,
        stock: payload.stock || productData.stock,
        barcode: payload.barcode || productData.barcode,
        status: payload.status || productData.status,
      },
    };

    const product = await this.productModel.updateOne({ productId: payload.productId }, params);
    if (product instanceof Error) {
      throw new ApiError(product.statusCode, product.message, context);
    }

    const response = {
      data: product,
      message: 'Success update product data',
      statusCode: httpStatus.OK,
    };

    return response;
  }

  async addProductImages(payload) {
    const context = 'Product-addProductImages';

    const productData = await this.checkProduct(payload.productId, context);

    const saveFile = await this.onDiskSave.save(payload.files);
    if (saveFile instanceof Error) {
      throw new ApiError(saveFile.statusCode, saveFile.message, context);
    }

    const params = validate.isArray(productData.productImages)
      ? {
          $push: {
            productImages: { $each: saveFile.filenames },
          },
        }
      : {
          $set: {
            productImages: saveFile.filenames,
          },
        };

    const product = await this.productModel.updateOne({ productId: payload.productId }, params);
    if (product instanceof Error) {
      throw new ApiError(product.statusCode, product.message, context);
    }

    const response = {
      data: product,
      message: 'Success add product image(s)',
      statusCode: httpStatus.OK,
    };

    return response;
  }

  async deleteProductImage(payload) {
    const context = 'Product-deleteProductImage';

    const productData = await this.checkProduct(payload.productId, context);

    const dataExist = validate.isArray(productData.productImages)
      ? productData.productImages.includes(payload.filename)
      : false;
    if (!dataExist) {
      throw new ApiDebug(httpStatus.BAD_REQUEST, 'Image dont exist in product data', context);
    }

    const deleteFile = await this.onDiskSave.delete(payload.filename);
    if (deleteFile instanceof Error) {
      throw new ApiError(deleteFile.statusCode, deleteFile.message, context);
    }

    const params = { $pull: { productImages: payload.filename } };

    const product = await this.productModel.updateOne({ productId: payload.productId }, params);
    if (product instanceof Error) {
      throw new ApiError(product.statusCode, product.message, context);
    }

    const response = {
      data: product,
      message: 'Success delete product image',
      statusCode: httpStatus.OK,
    };

    return response;
  }

  async deleteProduct(payload) {
    const context = 'Product-deleteProduct';

    const productData = await this.checkProduct(payload.productId, context);

    if (validate.isArray(productData.productImages) && Array(productData.productImages).length > 0) {
      // eslint-disable-next-line no-restricted-syntax
      for (const filename of productData.productImages) {
        const deleteProductImage = await this.onDiskSave.delete(filename);
        if (deleteProductImage instanceof Error) {
          throw new ApiError(deleteProductImage.statusCode, deleteProductImage.message, context);
        }
      }
    }

    const product = await this.productModel.deleteOne({ productId: payload.productId });
    if (product instanceof Error) {
      throw new ApiError(product.statusCode, product.message, context);
    }

    const response = {
      data: product,
      message: 'Success delete product data',
      statusCode: httpStatus.OK,
    };

    return response;
  }
}
module.exports = Product;
