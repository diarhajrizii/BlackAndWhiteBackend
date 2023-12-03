module.exports = function typesModel({ data }) {
  try {
    return {
      data,
    };
  } catch (error) {
    return {};
  }
};
