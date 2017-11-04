import express from 'express';
import pidusage from 'pidusage';
import root from 'root';

const
    router = new express.Router();

/**
 * Useful for real-time log / analytics / uptime
 *
 * @see {@link http://localhost:3000/health} and {@link http://localhost:3000/health?host=1}
 * @author {@link https://wijaya.cc| Gunawan Wijaya}
 * @author {@link https://yoseph.ws| Yoseph Wijaya}
 * @memberof api
 * @method
 * @name /health GET
 * @example
{
    "cpu": 0,
    "memory": 37212160,
    "time": 7500000,
    "start": 0,
    "date": 1509813867.795,
    "host": {
        "arch": "x64",
        "platform": "win32",
        "type": "Windows_NT",
        "release": "10.0.17025",
        "numCPUs": 8,
        "totalMem": 8506793984,
        "freeMem": 1276940288,
        "uptime": 34948.0042998
    }
}
 */
router.get('/', (req, res) => {
    pidusage.stat(process.pid, {advanced: true}, (err, stat) => {
        if (err) {
            throw new Error(err);
        }
        stat.date = Number((new Date().getTime() / 1e3).toFixed(20));
        Object.keys(req.query).forEach((query) => {
            let val = root[query];

            // if the requested query is a function, invoke it
            val = val instanceof Function ? val() : val;

            // if the requested query is truthy then print it
            stat[query] = val ? val : () => {};
        });
        res.status(200).json(stat);
    });
});
export default router;
