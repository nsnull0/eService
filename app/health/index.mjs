/** @namespace health */
import os from 'os';
import express from 'express';
import pidusage from 'pidusage';
import root from '_root';


/**
 * useful for real-time log / analytics
 * @requires os,express,pidusage,_root
 * @see {@link http://localhost:3000/health}
 * @author {@link http://wijaya.cc|gunawan}
 * @memberof health
 * @method GET
 * @prop {String} date          - Locale string of current time
 * @prop {Object} root          - various value from root.mjs
 * @prop {Object} stat          - various value from pidusage.stat
 * @prop {Object} os            - various value from node.os
 */
export default new express.Router().get('/', (req, res) => {
    pidusage.stat(process.pid, {advanced: true}, (err, stat) => {
        if (err) {
            throw new Error(err);
        }
        res.json({
            date: new Date().toLocaleString(),
            root,
            stat,
            os: {
                arch: os.arch(),
                platform: os.platform(),
                type: os.type(),
                release: os.release(),
                numcpus: os.cpus().length,
                totalmem: os.totalmem(),
                freemem: os.freemem(),
                uptime: os.uptime(),
                loadavg: os.loadavg(),
            },
        });
    });
});
