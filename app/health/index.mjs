/** @namespace health */
import express from 'express';
import pidusage from 'pidusage';

const router = new express.Router();

/**
 * useful for real-time log / analytics / uptime
 * @requires express,pidusage
 * @see {@link http://localhost:3000/health}
 * @author {@link http://wijaya.cc|gunawan}
 * @memberof health
 * @method GET
 * @prop {String} date          - Locale string of current time
 * @prop {Object} stat          - various value from pidusage.stat
 */
router.use('/', (req, res) => {
    pidusage.stat(process.pid, {advanced: true}, (err, stat) => {
        if (err) {
            throw new Error(err);
        }
        stat.date = Number((new Date().getTime() / 1e3).toFixed(20));
        res.json(stat);
    });
});
export default router;
