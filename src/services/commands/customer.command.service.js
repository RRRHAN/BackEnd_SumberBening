const uuid = require('uuid').v4;
const httpStatus = require('http-status');
const validate = require('validate.js');
const { dataStatus } = require('../../config/commons');
const NeDB = require('../../databases/nedb/nedb');
const ApiError = require('../../utils/ApiError');

class Customer {
  constructor() {
    this.customerModel = new NeDB('customers');
  }

  async createCustomer(payload) {
    const context = 'Customer-createCustomer';

    const customerData = {
      customerId: `customerId-${uuid()}`,
      name: payload.name,
      address: payload.address,
      phone: payload.phone || null,
      status: dataStatus.SHOW,
    };

    const customer = await this.customerModel.insertOne(customerData);
    if (customer instanceof Error) {
      throw new ApiError(customer.statusCode, customer.message, context);
    }

    const response = {
      data: customer,
      message: 'Success insert customer data',
      statusCode: httpStatus.OK,
    };

    return response;
  }

  async updateCustomer(payload) {
    const context = 'Customer-updateCustomer';
    const customerData = await this.customerModel.findOne({ customerId: payload.customerId });
    if (customerData instanceof Error) {
      throw new ApiError(customerData.statusCode, customerData.message, context);
    } else if (validate.isEmpty(customerData)) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'please check your customerId', context);
    }

    const params = {
      $set: {
        name: payload.name || customerData.name,
        address: payload.address || customerData.address,
        phone: payload.phone || customerData.phone || null,
        status: payload.status,
      },
    };

    const customer = await this.customerModel.updateOne({ customerId: payload.customerId }, params);
    if (customer instanceof Error) {
      throw new ApiError(customer.statusCode, customer.message, context);
    }

    const response = {
      data: customer,
      message: 'Success update customer data',
      statusCode: httpStatus.OK,
    };

    return response;
  }

  async deleteCustomer(payload) {
    const context = 'Customer-deleteCustomer';

    const customerData = await this.customerModel.findOne({ customerId: payload.customerId });
    if (customerData instanceof Error) {
      throw new ApiError(customerData.statusCode, customerData.message, context);
    } else if (validate.isEmpty(customerData)) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'please check your customerId', context);
    }

    const customer = await this.customerModel.deleteOne({ customerId: payload.customerId });
    if (customer instanceof Error) {
      throw new ApiError(customer.statusCode, customer.message, context);
    }

    const response = {
      data: customer,
      message: 'Success delete customer data',
      statusCode: httpStatus.OK,
    };

    return response;
  }
}
module.exports = Customer;
