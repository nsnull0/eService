/* eslint no-process-env: 0 */
/* jshint -W106 */
import os from 'os';
import dotenv from 'dotenv';
dotenv.config();

const penv = process.env,
    mongoConnection = `mongodb://${
        penv.DB_MONGO_USER
    }:${
        penv.DB_MONGO_PASS
    }@${
        penv.DB_MONGO_HOST
    }:${
        penv.DB_MONGO_PORT
    }/${
        penv.DB_MONGO_QUERY
    }`,
    root = {
        name: penv.npm_package_name || 'name',
        version: penv.npm_package_version || '0.0.0',
        environment: penv.NODE_ENV || 'development',
        port: penv.PORT || 3000,
        useragent: penv.npm_config_user_agent,
        mongoConnection,

        host: () => ({
            arch: os.arch(),
            platform: os.platform(),
            type: os.type(),
            release: os.release(),
            numCPUs: os.cpus().length,
            totalMem: os.totalmem(),
            freeMem: os.freemem(),
            uptime: os.uptime(),
        }),
    };

/**
 * Various useful variable, since this is located in `node_modules`<br>
 * all of this data can be retrieved via `import root from 'root';`<br>
 * a very handy feature to prevent usage of `require('../../root');`<br>
 *
 * @author {@link https://wijaya.cc| Gunawan Wijaya}
 * @module
 * @name root
 */
export default root;
