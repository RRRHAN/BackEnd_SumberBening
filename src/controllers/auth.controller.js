const catchAsync = require('../utils/catchAsync');
const { authService } = require('../services');

const login = catchAsync(async (req, res) => {
  const { username, password } = req.body;
  const result = await authService.login({ username, password });
  res.status(result.statusCode).send(result);
});

module.exports = {
  login,
};
