const customerCommand = require('./commands/customer.command.service');
const customerQuery = require('./queries/customer.query.service');
const productCommand = require('./commands/product.command.service');
const productQuery = require('./queries/product.query.service');

module.exports.customerService = { Command: customerCommand, Query: customerQuery };
module.exports.productService = { Command: productCommand, Query: productQuery };
module.exports.authService = require('./commands/auth.command.service');
