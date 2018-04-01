const fs = require("fs");
const path = require("path");
const resolvers = {};

fs.readdirSync(`${__dirname}/`).forEach(file => {
  if (
    file.toLowerCase().indexOf(".js") >= 0 &&
    file !== path.basename(__filename)
  ) {
    Object.assign(resolvers, require(`${__dirname}/${file}`));
  }
});

module.exports = resolvers;
