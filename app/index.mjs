/**
 * Various exposed api
 *
 * @namespace api
 */

import _db from './db'
import _health from './health'
import _root from 'root'

import compression from 'compression'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import responseTime from 'response-time'
import serve from 'serve'

/**
 * @returns {void}
 */
const run = async () => {
    const
        router = new express.Router(),
        app = express(),
        {
            getPort, jsonOnError, jsonTransform
        } = _root,
        port = await getPort()

    // API
    router.use('/health', _health)
    router.use('/db', _db)
    router.get('/', (req, res) => res.status(200).json(200))
    router.put('/', (req, res) => res.status(200).json(200))
    router.post('/', (req, res) => res.status(200).json(200))
    router.delete('/', (req, res) => res.status(200).json(200))
    router.use('*', (req, res) => res.status(404).json(404))
    // middleware
    app.use(compression())
    app.use(cookieParser())
    app.use(cors())
    app.use(responseTime())
    app.use(helmet())
    app.use(morgan('combined'))
    app.use(jsonTransform())
    app.use(router)
    try {
        app.listen(port, () => console.log(`http://localhost:${port}`))
        serve(`${process.cwd()}/jsdoc`)
    } catch (err) {
        console.error(err)
    }
    app.use(jsonOnError())
}

run()