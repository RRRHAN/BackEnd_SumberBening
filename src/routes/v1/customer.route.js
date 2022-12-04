const express = require('express');
const validate = require('../../middlewares/validate');
const auth = require('../../middlewares/auth');
const { customerValidation } = require('../../validations');
const { customerController } = require('../../controllers');

const router = express.Router();

router.post('/', auth.jwt, validate(customerValidation.createCustomer), customerController.createCustomer);
router.put('/:customerId', auth.jwt, validate(customerValidation.updateCustomer), customerController.updateCustomer);
router.delete('/:customerId', auth.jwt, validate(customerValidation.deleteCustomer), customerController.deleteCustomer);
router.get('/:customerId', auth.jwt, validate(customerValidation.getCustomerById), customerController.getCustomerById);
router.get('/', auth.jwt, validate(customerValidation.getCustomers), customerController.getCustomers);

module.exports = router;
