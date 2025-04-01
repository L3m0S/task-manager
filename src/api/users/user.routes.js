const { create, login } = require("./userController");
const { userValidator } = require("./userValidators");

/**
 * @param {Object} server - The Hapi server instance where routes will be registered
 * @returns {void}
 */
function setUpUserRoutes(_server) {
  const USERS_ROUTES_BASE_PATH = "/users";
  _server.route({
    method: "POST",
    path: `${USERS_ROUTES_BASE_PATH}`,
    handler: create,
    options: {
      validate: {
        payload: userValidator,
      },
    },
  });

  _server.route({
    method: "POST",
    path: `${USERS_ROUTES_BASE_PATH}/login`,
    handler: login,
  });
}

module.exports = setUpUserRoutes;
