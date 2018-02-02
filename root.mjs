/* globals Reflect */
import dotenv from 'dotenv'
import getport from 'get-port'
import os from 'os'

dotenv.config()

const penv = process.env

/**
 * Various useful variable, since this is located in `node_modules`<br>
 * all of this data can be retrieved via `import root from 'root';`<br>
 * a very handy feature to prevent usage of `require('../../root');`<br>
 *
 * @module
 * @name root
 * @returns {*} root
 */
export default {
    name: penv.npm_package_name || 'eService',
    version: penv.npm_package_version || '0.0.0',
    environment: penv.NODE_ENV || 'development',
    useragent: penv.npm_config_user_agent,
    mongoConnection: penv.DB_MONGO_URI,

    /**
     * @returns {*} object
     */
    getPort: () => getport({ port: penv.PORT || 3000 }),

    /**
     * @returns {*} object
     */
    getHost: () => ({
        arch: os.arch(),
        platform: os.platform(),
        type: os.type(),
        release: os.release(),
        numCPUs: os.cpus().length,
        totalMem: os.totalmem(),
        freeMem: os.freemem(),
        uptime: os.uptime(),
    }),

    /**
     * res.json transform middleware
     * @returns {function} middleware
     */
    jsonTransform: () => (req, res, next) => {
        const { json: _json } = res

        res.json = (data) => Reflect.apply(_json, res, [{ data }])

        return next()
    },

    /**
     * res.json on error middleware
     * @returns {function} middleware
     */
    jsonOnError: () => (err, req, res, next) => {
        /* istanbul ignore next */
        err.stack = process.env.NODE_ENV === 'production' ? () => {} : err.stack
        res.status(err.statusCode || 500).json({
            time: new Intl.DateTimeFormat(['en'], {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric',
                timezone: 'Asia/Jakarta',
                timeZoneName: 'short'
            }).format(new Date()),
            message: err.message,
            stack: err.stack,
        })

        return next()
    }
}