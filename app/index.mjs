import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import csurf from 'csurf';
import morgan from 'morgan';
import responseTime from 'response-time';
import slash from 'express-slash';
import uncapitalize from 'express-uncapitalize';
import helmet from 'helmet';

import health from './health';
import root from 'root';

const router = new express.Router(),
    app = express();

router.use('/www', express.static('www'));
router.use('/health', health);
router.get('/', (req, res) => res.status(200).json(200));
router.put('/', (req, res) => res.status(200).json(200));
router.post('/', (req, res) => res.status(200).json(200));
router.delete('/', (req, res) => res.status(200).json(200));
router.use('*', (req, res) => res.status(404).json(404));
app.use(compression());
app.use(cookieParser());
app.use(cors());
app.use(responseTime());
app.use(helmet());
app.use(uncapitalize());
app.use(morgan('combined'));
app.use(router);
app.use(slash());
app.listen(root.port, () => {
    console.log(`Express server listening on port ${root.port}`);
});
