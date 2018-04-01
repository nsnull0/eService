exports = {
  checkServices: ({ serviceName }) => {
    try {
      return serviceName;
    } catch (err) {
      throw err;
    }
  }
};

module.exports = exports;
