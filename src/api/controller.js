const router = require('express').Router()

router.get('/um', (req, res) => {
    res.json({'get': true})
})

router.get('/dois', (req, res) => {
    res.json({'post': true})
})

module.exports = router