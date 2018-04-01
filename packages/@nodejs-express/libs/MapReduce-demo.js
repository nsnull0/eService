(async () => {
  const fs = require("fs");
  const mapreduce = require("./MapReduce")();
  const start = new Date();
  const { log, error: err } = console;

  /**
   * async read file
   * @param {*} filename filename
   * @returns {Promise} Promise
   */
  const asyncReadFile = async filename => {
    try {
      return await new Promise((resolve, reject) => {
        fs.readFile(filename, "utf8", (err, data) => {
          if (err) {
            reject(err);
          }
          resolve([`${Math.random()}`, data]);
        });
      });
    } catch (error) {
      return err(error);
    }
  };

  /**
   * mapper
   * @param {*} key key
   * @param {*} data data
   * @returns {Array<*>} list
   */
  const mapper = (key, data) => {
    const list = [];
    const hash = {};

    data
      .toLowerCase()
      .replace(/\W/g, " ")
      .split(" ")
      .forEach(word => {
        hash[word] = hash[word] || 0;
        hash[word] += word ? 1 : 0;
      });

    Object.keys(hash).forEach(word => 1 && list.push([word, hash[word]]));

    return list;
  };

  /**
   * reducer
   * @param {*} key key
   * @param {*} data data
   * @returns {*} summary
   */
  const reducer = (key, data) => {
    return data.reduce((acc, curr) => acc + curr, 0);
  };

  let i = 1e2;
  const data = [];

  while (i--) {
    data.push(asyncReadFile(".data/_generator.lorem-ipsum.info._inter.txt"));
    data.push(asyncReadFile(".data/_generator.lorem-ipsum.info._latin.txt"));
    data.push(asyncReadFile(".data/_lipsum.com.txt"));
    data.push(asyncReadFile(".data/_loremipsumgenerator.com.txt"));
  }

  mapreduce(await Promise.all(data), mapper, reducer, result =>
    log([result, new Date() - start])
  );
})();
