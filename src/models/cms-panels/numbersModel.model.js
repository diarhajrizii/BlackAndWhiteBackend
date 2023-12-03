module.exports = function numbersModel({ data }) {
  try {
    return {
      data,
    };
  } catch (error) {
    return {};
  }
};
