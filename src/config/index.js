const serverConfig = require('./server')

const server = new serverConfig()

module.exports = function startApp() {
    return server.startServer()
}
