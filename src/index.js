const express = require('express')

const app = express()

app.get('/', async (req, res) => {
    res.json({
        response: 'resposta aqui'
    })
})

app.listen(3000, () => {
    console.log('rodando porta 3000')
})