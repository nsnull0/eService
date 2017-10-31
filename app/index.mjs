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
import _app from '_app';

const {port} = _app,
    app = express(),
    router = new express.Router();

router.use('/health', health);
app.use(compression());
app.use(cookieParser());
app.use(cors());
app.use(responseTime());
app.use(helmet());
app.use(uncapitalize());
app.use(morgan('combined'));
app.use(slash());
app.use(router);
app.listen(port, () => {
    console.log(`Express server listening on port ${port}`);
});
