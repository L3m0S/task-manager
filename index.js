"use strict";

const Hapi = require("@hapi/hapi");
const setUpTaskRoutes = require("./src/api/tasks/taskRoutes");
const mongoose = require("mongoose");
const redisService = require("./src/service/redisService");

const init = async () => {
  try {
    const env = require("./src/config/EnvLoader");
    const server = Hapi.server({
      port: 3000,
      host: "localhost",
    });

    setUpTaskRoutes(server);

    mongoose
      .connect(
        `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DATABASE}?authSource=admin`
      )
      .then(console.log("DB: Connected"))
      .catch((err) => console.log(err));

    await redisService.connect();

    await server.start();

    server.ext("onPreResponse", (request, h) => {
      const response = request.response;

      if (response.isBoom) {
        const error = response;

        server.log(["error"], error);

        return h
          .response({
            statusCode: error.output.statusCode,
            error: error.output.payload.error,
            message: error.message,
          })
          .code(error.output.statusCode);
      }

      return h.continue;
    });

    console.log("Server: Running on %s", server.info.uri);
  } catch (err) {
    console.log(err);
  }
};

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

init();
