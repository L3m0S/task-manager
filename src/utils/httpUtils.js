function parseJoiValidationErrors(_errors) {
  return {
    type: "FIELD_VALIDATION_ERROR",
    title: "",
    detail: _errors.details,
    instance: "/account/12345/msgs/abc",
    balance: 30,
    accounts: ["/account/12345", "/account/67890"],
  };
}

module.exports = parseJoiValidationErrors;
