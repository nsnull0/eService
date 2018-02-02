import mongodb from 'mongodb'

const mongoClient = mongodb.MongoClient

/**
 * Mongodb test connection
 *
 * @see {@link http://localhost:3000/db/test}
 * @memberof api
 * @method
 * @name /db/test GET
 * @example
{
    "msg": "MONGO - connected"
}
 */

export default (router) => router
    .get('/test', (req, res, next) => {
        mongoClient.connect(process.env.DB_MONGO_URI, (err, db) => {
            if (err) {
                return next(err)
            }
            db.close()

            return res.status(200).json({
                msg: 'MONGO - connected'
            })
        })
    })