/*
eslint no-process-env: 0
*/
import os from 'os';
export default {
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 3000,
    appVersion: process.env.npm_package_version || '0.0.0',
    nodeVersion: process.version,
    os: {
        uptime: os.uptime(),
        type: os.type(),
        platform: os.platform(),
        arch: os.arch(),
        release: os.release(),
        numcpus: os.cpus().length,
        totalmem: os.totalmem(),
        freemem: os.freemem(),
        loadavg: os.loadavg(),
    },
};
