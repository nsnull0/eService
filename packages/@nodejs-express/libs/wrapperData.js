exports = (req, res, next) => {
  if (req.url.indexOf("/graphql") < 0) {
    const _resJson = res.json;

    res.json = args => {
      args = {
        data: args,
        code: res.statusCode,
        time: Date.now() - req.startTime
      };
      Reflect.apply(_resJson, res, [args]);
    };
  }

  return next();
};
module.exports = exports;
