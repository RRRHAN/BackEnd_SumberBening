const catchAsync = require('../utils/catchAsync');
const { customerService } = require('../services');

const createCustomer = catchAsync(async (req, res) => {
  const customerCommand = new customerService.Command();
  const result = await customerCommand.createCustomer(req.body);
  res.status(result.statusCode).send(result);
});

const updateCustomer = catchAsync(async (req, res) => {
  const customerCommand = new customerService.Command();
  const payload = { ...req.body, ...req.params };
  const result = await customerCommand.updateCustomer(payload);
  res.status(result.statusCode).send(result);
});

const deleteCustomer = catchAsync(async (req, res) => {
  const customerCommand = new customerService.Command();
  const result = await customerCommand.deleteCustomer(req.params);
  res.status(result.statusCode).send(result);
});

const getCustomerById = catchAsync(async (req, res) => {
  const customerQuery = new customerService.Query();
  const result = await customerQuery.getCustomerById(req.params);
  res.status(result.statusCode).send(result);
});

const getCustomers = catchAsync(async (req, res) => {
  const customerQuery = new customerService.Query();
  const result = await customerQuery.getCustomers(req.query);
  res.status(result.statusCode).send(result);
});

module.exports = {
  createCustomer,
  updateCustomer,
  deleteCustomer,
  getCustomerById,
  getCustomers,
};
