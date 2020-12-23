import webpack from 'webpack';
import config from './webpack.config.js';

const compiler = webpack(config);

compiler.run();
