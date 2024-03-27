const { getUserData } = require("../../services/getUserData.service");

module.exports = async function myLogger(req, res, next) {
  try {
    const user_data = req.headers.authorization
      ? await getUserData(req.headers)
      : null;

    req.user_data = user_data ? user_data : {};

    next();
  } catch (error) {
    console.error("Error in myLogger middleware:", error);
    next(error); // Pass the error to the error handling middleware
  }
};
