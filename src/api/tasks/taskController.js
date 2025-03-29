const {
  createTask,
  listTask,
  findTaskById,
  deleteTaskById,
} = require("./taskService");

async function create(_request, _response) {
  try {
    const createdTask = await createTask(_request.payload);
    return _response.response(createdTask).code(200);
  } catch (err) {
    return _response.response({ error: err.message }).code(500);
  }
}

async function list(_request, _response) {
  try {
    const { limit, offset } = _request.query;
    const tasks = await listTask(+limit, +offset);
    return _response.response(tasks).code(200);
  } catch (err) {
    return _response.response({ error: err.message }).code(500);
  }
}

async function findById(_request, _response) {
  try {
    const taskId = _request.params["taskId"];
    const tasks = await findTaskById(taskId);
    return _response.response(tasks).code(200);
  } catch (err) {
    return _response.response({ error: err.message }).code(500);
  }
}

async function deleteById(_request, _response) {
  try {
    const taskId = _request.params["taskId"];
    await deleteTaskById(taskId);
    return _response.response().code(200);
  } catch (err) {
    return _response.response({ error: err.message }).code(500);
  }
}

module.exports = {
  create,
  list,
  findById,
  deleteById,
};
