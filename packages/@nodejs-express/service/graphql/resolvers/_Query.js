module.exports = {
  checkServices: ({ serviceName }) => {
    try {
      return serviceName;
    } catch (err) {
      throw err;
    }
  }
};
