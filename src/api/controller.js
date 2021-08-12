const router = require('express').Router()
const TemplateServices = require('../services/templates')
const ContractServices = require('../services/contract')

const templateServices = new TemplateServices()
const contractServices = new ContractServices()


router.post('/createDocument', async (req, res) => await templateServices.handlingRequest(req, res))

router.get('/getDocument/:uid', async (req, res) => await contractServices.handlingRequest(req, res))


module.exports = router