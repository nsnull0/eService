const { NODE_ENV } = process.env;

exports = (app, express) => {
  const opts = { index: ["index.html", "index.htm"] };

  /**
   * Default fallthru middleware
   * @param {*} req req
   * @param {*} res res
   * @param {*} next next
   * @returns {Middleware} Middleware
   */
  let middleware = (req, res, next) => {
    return next();
  };

  if (NODE_ENV === "production") {
    middleware = require("libs/jwt").reqUserFromToken;
  }

  // console.log(NODE_ENV);

  app.use(middleware, express.static(".jsdoc", opts));
};
module.exports = exports;
