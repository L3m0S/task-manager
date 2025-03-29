require("dotenv").config();

class EnvLoader {
  constructor() {
    this.requiredVariables = [
      "PORT",
      "MONGO_HOST",
      "MONGO_PASSWORD",
      "MONGO_PORT",
      "MONGO_DATABASE",
      "REDIS_HOST",
      "REDIS_PASSWORD",
      "REDIS_PORT",
    ];

    this.validate();
  }

  validate() {
    const missing = this.requiredVariables.filter(
      (varName) => !process.env[varName]
    );

    if (missing.length > 0) {
      throw new Error(`
        🚨 Missing required environment variables: 🚨 
        ${missing.join(",\n        ")}.
        Check your .env file or deployment environment.
      `);
    }
  }
}

module.exports = new EnvLoader();
