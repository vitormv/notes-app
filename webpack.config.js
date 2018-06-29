const path = require('path');

module.exports = {
    resolve: {
        mainFields: ['browser', 'main'],
        alias: {
            src: path.resolve(__dirname, 'src'),
        },
    },
};
