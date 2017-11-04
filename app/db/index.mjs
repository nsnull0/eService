import express from 'express';
import mongodb from 'mongodb';
import root from 'root';

const
    router = new express.Router(),
    mongoClient = mongodb.MongoClient;

/**
 * Mongodb test connection
 *
 * @see {@link http://localhost:3000/db/test}
 * @author {@link https://wijaya.cc| Gunawan Wijaya}
 * @memberof api
 * @method
 * @name /db/test GET
 * @example
{
    "msg": "MONGO - connected"
}
 */
router.get('/test', (req, res) => {
    mongoClient.connect(root.mongoConnection, (err, db) => {
        if (err) {
            res.status(503).json({
                msg: 'MONGO - can\'t connect to mongodb instance'
            });
        }
        res.status(200).json({
            msg: 'MONGO - connected'
        });
        db.close();
    });
});
export default router;
