const cluster = require("cluster");
const os = require("os");

module.exports = (cores = os.cpus().length) => (data, mapper, reducer, fn) => {
  let finished = 0;
  let fullIntermediate = [];
  const workerEvent = {
    message: msg => {
      if (msg.about === "mapfinish") {
        fullIntermediate = fullIntermediate.concat(msg.intermediate);
      }
    },
    exit: () => {
      finished++;
      if (finished === cores) {
        fullIntermediate.sort();
        const groups = fullIntermediate.reduce((acc, current) => {
          let group = acc[current[0]];

          if (!Array.isArray(group)) {
            group = [];
          }
          group.push(current[1]);
          acc[current[0]] = group;

          return acc;
        }, {});

        Object.keys(groups).forEach(k => {
          groups[k] = reducer(k, groups[k]);
        });
        fn(groups);
      }
    }
  };

  /**
   * @param {*} cores cores
   * @returns {*} master
   */
  const master = cores => {
    for (let ii = 0; ii < cores; ii++) {
      const worker = cluster.fork();

      finished = 0;
      fullIntermediate = [];
      worker.on("message", workerEvent.message);
      worker.on("exit", workerEvent.exit);
    }
  };

  /**
   * @param {*} cores cores
   * @param {*} data data
   * @param {*} mapper mapper
   * @returns {*} slave
   */
  const slave = (cores, data, mapper) => {
    let done = 0;
    let mypiece = data[cluster.worker.id - 1];
    let intermediate = [];
    let tmp = 0;

    while (mypiece) {
      const [key, value] = mypiece;

      intermediate = intermediate.concat(mapper(key, value));
      done++;
      tmp = done * cores;
      tmp += cluster.worker.id - 1;
      mypiece = data[tmp];
    }
    process.send({
      from: cluster.worker.id,
      about: "mapfinish",
      intermediate
    });
    cluster.worker.destroy();
  };

  if (cluster.isMaster) {
    master(cores);
  } else {
    slave(cores, data, mapper);
  }
};
