import root from 'root';
import fs from 'fs-extra';
fs.remove(`./www/docs/${root.name}/${root.version}/`);
