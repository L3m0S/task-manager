const bcrypt = require("bcrypt");

async function hashPassword(_password) {
  try {
    return await bcrypt.hash(_password, 10);
  } catch (err) {
    throw new Error(err);
  }
}

module.exports = {
  hashPassword,
};
