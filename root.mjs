/*
eslint
    no-process-env: 0,
    no-underscore-dangle: 0,
*/
import os from 'os';
import fs from 'fs-extra';

const penv = process.env,
    root = {
        name: penv.npm_package_name || 'eservice',
        version: penv.npm_package_version || '0.0.0',
        environment: penv.NODE_ENV || 'development',
        port: penv.PORT || 3000,
        user_agent: penv.npm_config_user_agent,

        f_host: () => ({
            arch: os.arch(),
            platform: os.platform(),
            type: os.type(),
            release: os.release(),
            num_cpus: os.cpus().length,
            total_mem: os.totalmem(),
            free_mem: os.freemem(),
            uptime: os.uptime(),
            load_avg: os.loadavg(),
        }),
        f_prune: () => {
            fs.remove(`./www/docs/${root.name}/${root.version}/`);
        },
    };
export default root;
