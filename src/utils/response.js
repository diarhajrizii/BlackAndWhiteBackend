const responseModel = require("../models/response.model");
const getHeaders = require("./getHeaders");

module.exports = {
  successfulReturn: ({ message, data }, res) => {
    const resData = {
      success: true,
      data,
      message: message,
    };
    res.set(getHeaders({ method: "all" }));
    return res.json(responseModel(resData));
  },

  errorReturn: ({ e, res }) => {
    console.log(e);
    const resData = {
      success: false,
      code: "1000",
      message: e,
    };

    res.set(getHeaders({ method: "all" }));
    return res.status(400).json(responseModel(resData));
  },
};
