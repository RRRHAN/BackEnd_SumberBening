const Joi = require('joi');
const { id } = require('./custom.validation');
const { dataStatus } = require('../config/commons');

const createCustomer = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    address: Joi.string().required(),
    phone: Joi.string().optional(),
  }),
};

const updateCustomer = {
  params: Joi.object().keys({
    customerId: Joi.required().custom(id('customer')),
  }),
  body: Joi.object().keys({
    name: Joi.string().optional(),
    address: Joi.string().optional(),
    phone: Joi.string().optional(),
    status: Joi.string()
      .valid(...Object.values(dataStatus))
      .optional(),
  }),
};

const deleteCustomer = {
  params: Joi.object().keys({
    customerId: Joi.string().custom(id('customer')).required(),
  }),
};

const getCustomerById = {
  params: Joi.object().keys({
    customerId: Joi.string().custom(id('customer')).required(),
  }),
};

const getCustomers = {
  query: Joi.object().keys({
    query: Joi.object().optional(),
    search: Joi.string().optional(),
    quantity: Joi.number().default(20),
    page: Joi.number().default(1),
    sortBy: Joi.object()
      .keys({
        name: Joi.number().valid(1, -1).optional(),
        address: Joi.number().valid(1, -1).optional(),
        phone: Joi.number().valid(1, -1).optional(),
        status: Joi.number().valid(1, -1).optional(),
        updatedAt: Joi.number().valid(1, -1).optional(),
        createdAt: Joi.number().valid(1, -1).optional(),
      })
      .default({ createdAt: -1 }),
  }),
};

module.exports = {
  createCustomer,
  updateCustomer,
  deleteCustomer,
  getCustomerById,
  getCustomers,
};
