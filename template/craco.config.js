const LicenseCheckerWebpackPlugin = require('license-checker-webpack-plugin');

module.exports = {
    webpack: {
        plugins: [new LicenseCheckerWebpackPlugin({
            allow: '(Apache-2.0 OR BSD-2-Clause OR BSD-3-Clause OR MIT OR ISC)',
            outputFilename: 'ThirdPartyNotices.txt',
        })],
    },
}