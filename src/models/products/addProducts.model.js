module.exports = function addProductsModel({ data }) {
  try {
    return {
      data,
    };
  } catch (error) {
    return {};
  }
};
