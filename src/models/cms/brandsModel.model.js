module.exports = function brandsModel({ data }) {
  try {
    return {
      data,
    };
  } catch (error) {
    return {};
  }
};
