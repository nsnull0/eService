/**
 * Various exposed api
 *
 * @namespace api
 */

import _root from 'root'
import _routers from './routers'

import compression from 'compression'
import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import rateLimit from 'express-rate-limit'
import serve from 'serve'

/**
 * @returns {void}
 */
const run = async () => {
    const app = express()
    const { getPort, jsonOnError, jsonTransform } = _root
    const port = await getPort()

    // middleware
    app.use(compression())
    app.use(cors())
    app.use(helmet())
    app.use(morgan('dev'))
    app.use(jsonTransform())
    app.use(rateLimit({
        windowMs: 1000 * 60 * 60 * 1,
        max: 1000,
        delayMs: 0
    }))

    // API
    app.use(_routers(new express.Router()))

    try {
        app.listen(port, () => console.log(`http://localhost:${port}`))
        serve(`${process.cwd()}/jsdoc`)
    } catch (err) {
        console.error(err)
    }
    app.use(jsonOnError())
}

run()