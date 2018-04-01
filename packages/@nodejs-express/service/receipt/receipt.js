const fs = require("fs");
const path = require("path");

module.exports = (app, { Router }) => {
  const router = new Router();

  fs.readdirSync(`${__dirname}/`).forEach(file => {
    const extname = path.extname(file);
    const basename = path.basename(file, extname);

    if (file.indexOf(".js") >= 0 && file !== path.basename(__filename)) {
      const loadFile = require(`./${basename}`)(app, { Router });

      loadFile ? router.use(`/${basename}`, loadFile) : 0;
    }
  });

  return router;
};
