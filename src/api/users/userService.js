const { hashPassword } = require("../../service/bcryptService");
const userModel = require("./userSchemas");
const Jwt = require("@hapi/jwt");

/**
 * @typedef {Object} User
 * @property {string} id
 * @property {string} name
 * @property {string} email
 * @property {string} password
 * @property {Date} [createdAt]
 */

/**
 * Cria uma nova tarefa no banco de dados
 * @param {User} _user - Objeto contendo os dados da tarefa
 * @returns {Promise<mongoose.Document>} Promise resolvida com o documento salvo
 */
async function createUser(_user) {
  isEmailAlreadyTaken = await userModel.findOne({ email: _user.email });

  if (isEmailAlreadyTaken) {
    throw new Error("Email already in use!");
  }

  const hashedPassword = await hashPassword(_user.password);
  _user.password = hashedPassword;
  const user = new userModel(_user);
  return await user.save();
}

async function authenticateUser(_email, _password) {
  const userExists = await userModel.findOne({ email: _email });

  if (!userExists) {
    throw new Error("User with guiven email not found!");
  }

  const token = Jwt.token.generate(
    {
      aud: "urn:audience:test",
      iss: "urn:issuer:test",
      user: "some_user_name",
      group: "hapi_community",
    },
    {
      key: "some_shared_secret",
      algorithm: "HS512",
    },
    {
      ttlSec: 14400, // 4 hours
    }
  );

  return token;
}

module.exports = {
  createUser,
  authenticateUser,
};
