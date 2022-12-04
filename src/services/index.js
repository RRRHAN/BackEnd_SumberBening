const customerCommand = require('./commands/customer.command.service');
const customerQuery = require('./queries/customer.query.service');

module.exports.customerService = { Command: customerCommand, Query: customerQuery };
module.exports.authService = require('./commands/auth.command.service');
