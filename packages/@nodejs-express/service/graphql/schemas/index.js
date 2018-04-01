const fs = require("fs");
const path = require("path");
const schemas = [];

fs.readdirSync(`${__dirname}/`).forEach(file => {
  if (
    file.toLowerCase().indexOf(".gql") >= 0 &&
    file !== path.basename(__filename)
  ) {
    schemas.push(fs.readFileSync(`${__dirname}/${file}`, "utf8"));
  }
});

module.exports = schemas.join("");
