"use strict";

const { create, list, findById, deleteById } = require("./taskController");
const { taskValidator, pageableQueryOptions } = require("./taskValidators");

/**
 * @param {Object} server - The Hapi server instance where routes will be registered
 * @returns {void}
 */
function setUpTaskRoutes(_server) {
  const TASK_ROUTES_BASE_PATH = "/tasks";
  _server.route({
    method: "GET",
    path: `${TASK_ROUTES_BASE_PATH}`,
    handler: list,
    options: {
      validate: {
        query: pageableQueryOptions,
      },
    },
  });

  _server.route({
    method: "GET",
    path: `${TASK_ROUTES_BASE_PATH}/{taskId}`,
    handler: findById,
  });

  _server.route({
    method: "POST",
    path: `${TASK_ROUTES_BASE_PATH}`,
    handler: create,
    options: {
      validate: {
        payload: taskValidator,
      },
    },
  });

  _server.route({
    method: "DELETE",
    path: `${TASK_ROUTES_BASE_PATH}/{taskId}`,
    handler: deleteById,
  });
}

module.exports = setUpTaskRoutes;
