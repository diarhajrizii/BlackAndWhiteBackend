module.exports = function colorsModel({ data }) {
  try {
    return {
      data,
    };
  } catch (error) {
    return {};
  }
};
