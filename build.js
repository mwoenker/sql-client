import webpack from 'webpack';
import config from './webpack.config.js';

const prodConfig = {
    ...config,
    mode: 'production',
};

const compiler = webpack(prodConfig);

compiler.run((err, stats) => {
    if (err) {
        console.error(err);
        process.exit(1);
    } else {
        console.log('Compilation complete.');
        process.exit(0);
    }
});
