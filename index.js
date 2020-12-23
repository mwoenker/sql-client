import express from 'express';
import routes from './routes.js';

const port = 3000;

async function main() {
    const app = express();
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
