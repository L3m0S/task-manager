const { createClient } = require("redis");

class RedisService {
  constructor() {
    this.client = createClient({
      password: process.env.REDIS_PASSWORD,
      socket: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
      },
    });

    this.client.on("error", (err) => console.log("Redis Client Error", err));
  }

  async connect() {
    if (!this.client.isOpen) {
      await this.client.connect();
      console.log("Redis: Connected");
    }
    return this.client;
  }

  async disconnect() {
    if (this.client.isOpen) {
      await this.client.quit();
    }
  }
}

module.exports = new RedisService();
