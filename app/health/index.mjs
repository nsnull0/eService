import express from 'express';
import pidusage from 'pidusage';
import _app from '_app';

export default new express.Router().get('/', (req, res) => {
    pidusage.stat(process.pid, {advanced: true}, (err, stat) => {
        if (err) {
            throw new Error(err);
        }
        res.json(Object.assign({
            date: new Date().toLocaleString(),
            stat
        }, _app));
    });
});
