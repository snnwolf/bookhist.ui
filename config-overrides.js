const {
    override,
    // addWebpackAlias,
    overrideDevServer,
} = require("customize-cra");
const path = require("path");

const devServerConfig = () => config => {
    console.log(config);
    return {
        ...config,
        transportMode: 'ws',
        https: true,
        //   port: 3000,
        //   proxy: {
        //     '/app/v1': {
        //       target: 'http://localhost:3005',
        //       changeOrigin: true,
        //       ws: false,
        //       pathRewrite: {
        //         '^/app/v1': '/app/v1',
        //       },
        //       secure: false,
        //     },
        //   },
    }
}

module.exports = {
    webpack: override(
        // usual webpack plugin
        // disableEsLint()
    ),
    devServer: overrideDevServer(
        // dev server plugin
        // watchAll()
        devServerConfig()
    )
};