let
    key = 0,
    value = 0,
    groups = 0,
    worker = 0,
    finished = 0,
    fullIntermediate = [],
    workerEvent = 0;

const
    cluster = require('cluster'),
    os = require('os'),
    master = (cl, cores) => {
        for (let ii = 0; ii < cores; ii++) {
            worker = cl.fork();
            finished = 0;
            fullIntermediate = [];
            worker.on('message', workerEvent.message);
            worker.on('exit', workerEvent.exit);
        }
    },
    slave = (cl, cores, pieces, map) => {
        let
            piecesProcessed = 0,
            mypiece = pieces[cl.worker.id - 1],
            myintermediate = [];
        while (mypiece) {
            [key, value] = mypiece;
            myintermediate = myintermediate.concat(map(key, value));
            piecesProcessed++;
            mypiece = pieces[(piecesProcessed * cores) + (cl.worker.id - 1)];
        }
        process.send({
            from: cl.worker.id,
            about: 'mapfinish',
            intermediate: myintermediate
        });
        cl.worker.destroy();
    };
module.exports = (cores = os.cpus().length) => {
    return (pieces, map, reduce, func) => {
        workerEvent = {
            message: (msg) => {
                if (msg.about === 'mapfinish') {
                    fullIntermediate = fullIntermediate.concat(msg.intermediate);
                }
            },
            exit: () => {
                finished++;
                if (finished === cores) {
                    fullIntermediate.sort();
                    groups = fullIntermediate.reduce((res, current) => {
                        let group = res[current[0]];
                        if (!group || typeof group !== 'object') {
                            group = [];
                        }
                        group.push(current[1]);
                        res[current[0]] = group;
                        return res;
                    }, {});
                    Object.keys(groups).forEach((kk) => {
                        groups[kk] = reduce(kk, groups[kk]);
                    });
                    func(groups);
                }
            }
        };
        if (cluster.isMaster) {
            master(cluster, cores);
        } else {
            slave(cluster, cores, pieces, map);
        }
    };
};
