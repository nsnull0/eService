/* jshint -W079 */
const
    start = new Date(),
    fs = require('fs-extra'),
    mapreduce = require('./MapReduce')(),
    {Promise} = global,
    readFile = (file) => {
        return new Promise((resolve, reject) => {
            fs.readFile(file, 'utf8', (err, data) => {
                if (err) {
                    reject(err);
                }
                resolve([
                    `${file}`,
                    data
                ]);
            });
        });
    },
    information = [],
    map = (key, value) => {
        const
            list = [],
            aux = {};
        value
            .replace(/\W/g, ' ')
            .split(' ')
            .forEach((ww) => {
                aux[ww] = ww === '' ? 0 : (aux[ww] || 0) + 1;
            });
        Object.keys(aux).forEach((kk) => list.push([kk, aux[kk]]));
        return list;
    },
    reduce = (key, values) => {
        let sum = 0;
        values.forEach((ee) => {
            sum += ee;
        });
        return sum;
    };

for (let ii = 0; ii < 1e0; ii++) {
    information.push(Promise.resolve([
        `${Math.random()}`,
        'primer trozo de informacion para procesado primer trozo'
    ]));
    information.push([
        `${Math.random()}`,
        'segundo trozo de informacion trozo de'
    ]);
    information.push([
        `${Math.random()}`,
        'otro trozo para ser procesado otro otro otro trozo'
    ]);
    information.push([
        `${Math.random()}`,
        'primer trozo de informacion para procesado primer trozo'
    ]);
    information.push([
        `${Math.random()}`,
        'segundo trozo de informacion trozo de'
    ]);
    information.push([
        `${Math.random()}`,
        'otro trozo para ser procesado otro otro otro trozo'
    ]);
    information.push(readFile('./app/_data/_generator.lorem-ipsum.info._inter.txt'));
    information.push(readFile('./app/_data/_generator.lorem-ipsum.info._latin.txt'));
    information.push(readFile('./app/_data/_lipsum.com.txt'));
    information.push(readFile('./app/_data/_loremipsumgenerator.com.txt'));
    information.push(readFile('./app/_data/_lipsum.com.txt'));
}
Promise.all(information).then((data) => {
    mapreduce(data, map, reduce, (result) => {
        console.log([result, new Date() - start]);
    });
});
