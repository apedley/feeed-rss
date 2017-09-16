import http from 'http';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import compression from 'compression';
import routes from './routes';
import configFile from './config.json'
let app = express();

const env = process.env.NODE_ENV || 'development';

const config = configFile[env];

app.server = http.createServer(app);

// logger
app.use(morgan('dev'));

// 3rd party middleware
app.use(helmet());
app.use(cors({
	exposedHeaders: config.corsHeaders
}));

app.use(compression());

app.use(bodyParser.json({
	limit : config.bodyLimit
}));

	app.use('/', routes({ config }));

	app.server.listen(process.env.PORT || config.port, () => {
		
		console.log(`Started on port ${app.server.address().port}`);
	});

export default app;
