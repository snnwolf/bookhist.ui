const {
    override,
    overrideDevServer,
} = require("customize-cra");

const devServerConfig = () => config => {
    return {
        ...config,
        clientLogLevel: 'warn',
        allowedHosts: ['localhost', '.gitpod.io'],
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
