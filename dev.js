import express from 'express';
import routes from './routes.js';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackConfig from './webpack.config.js';

const port = 3000;

async function main() {
    const compiler = webpack(webpackConfig);
    const app = express();
    app.use(webpackDevMiddleware(compiler));
    app.use(routes);
    app.listen(port, () => {
		console.log(`Listening on port ${port}`);
    });
}

main()
    .catch(e => {
        console.error('Uncaught exception:', e);
        process.exit(1);
    }
)
