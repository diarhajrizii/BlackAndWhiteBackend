module.exports = function responseModel({
  success,
  data = {},
  code = "",
  message = "",
}) {
  success = success ? true : false;
  return {
    success,
    data,
    code,
    message: message,
  };
};
