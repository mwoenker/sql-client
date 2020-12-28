const express = require('express');
const routes = require('./server/routes.js');
const bodyParser = require('body-parser');

const port = 3000;

async function main() {
    const app = express();
    app.use(bodyParser.json());
    app.use(express.static('public'));
    app.use(routes);
    app.listen(port, () => {
		console.log(`Listening on port ${port}`);
    });
}

main()
    .catch(e => {
        console.error('Uncaught exception:', e);
        process.exit(1);
    })
