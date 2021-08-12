const express = require('express')
const router = require('../api/controller')

module.exports = class Server {
    app

    constructor() {
        this.app = express()
    }

    routes() {
        this.app.use(router)
        
    }

    middlewares() {
        this.app.use(express.json())
    }

    startServer() {
        this.middlewares()
        this.routes()
        this.app.listen(process.env.PORT || 5000, () => console.log("🥽 server online"))
    }
}