const { createUser, authenticateUser } = require("./userService");

async function create(_request, _response) {
  try {
    const createdUser = await createUser(_request.payload);
    return _response.response(createdUser).code(200);
  } catch (err) {
    return _response.response({ error: err.message }).code(500);
  }
}

async function login(_request, _response) {
  try {
    const { email, password } = _request.payload;
    const createdUser = await authenticateUser(email, password);
    return _response.response(createdUser).code(200);
  } catch (err) {
    return _response.response({ error: err.message }).code(500);
  }
}

module.exports = {
  create,
  login,
};
