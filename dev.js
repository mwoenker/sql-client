const express = require('express');
const routes = require('./server/routes.js');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackConfig = require('./webpack.config.js');
const bodyParser = require('body-parser');

const port = 3000;

async function main() {
    const compiler = webpack(webpackConfig);
    const app = express();
    app.use(bodyParser.json());
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
