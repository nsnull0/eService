import _controllers from '../controllers'
export default (router) => router
    .use('/health', _controllers.health(router))
    .use('/db', _controllers.db(router))

    .delete('/', (req, res) => res.status(200).json(200))
    .post('/', (req, res) => res.status(200).json(200))
    .put('/', (req, res) => res.status(200).json(200))
    .get('/', (req, res) => res.status(200).json(200))

    .use('*', (req, res) => res.status(404).json(404))