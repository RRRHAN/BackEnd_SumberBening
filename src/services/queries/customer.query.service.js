const httpStatus = require('http-status');
const validate = require('validate.js');
const NeDB = require('../../databases/nedb/nedb');
const ApiError = require('../../utils/ApiError');
const ApiDebug = require('../../utils/ApiDebug');

class Customer {
  constructor() {
    this.customerModel = new NeDB('customers');
  }

  async getCustomers(payload) {
    const context = 'Customer-getCustomers';

    let parameter = {};
    if (!validate.isEmpty(payload.search)) {
      // eslint-disable-next-line security/detect-non-literal-regexp
      const search = new RegExp(payload.search, 'i');
      parameter = {
        $or: [{ name: search }, { address: search }, { phone: search }, { status: search }],
      };
    }

    parameter = validate.isEmpty(payload.query) ? parameter : { $and: [parameter, payload.query] };

    const options = {
      sortBy: payload.sortBy,
      skip: payload.quantity * (payload.page - 1),
      limit: payload.quantity,
    };

    const customers = await this.customerModel.findMany(parameter, options);
    if (customers instanceof Error) {
      throw new ApiError(customers.statusCode, customers.message, context);
    }

    const countData = await this.customerModel.count(parameter);
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
      data: customers,
      message: 'Success findMany customer',
      statusCode: httpStatus.OK,
      page,
    };

    return response;
  }

  async getCustomerById(payload) {
    const context = 'Customer-getCustomerById';

    const customer = await this.customerModel.findOne({ customerId: payload.customerId });
    if (customer instanceof Error) {
      throw new ApiError(customer.statusCode, customer.message, context);
    } else if (validate.isEmpty(customer)) {
      throw new ApiDebug(httpStatus.BAD_REQUEST, 'please check your customerId', context);
    }

    const response = {
      data: customer,
      message: 'Success find customer by id',
      statusCode: httpStatus.OK,
    };

    return response;
  }
}
module.exports = Customer;
