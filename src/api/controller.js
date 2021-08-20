const router = require('express').Router()
const TemplateServices = require('../services/templates')
const ContractServices = require('../services/contract')
const OnBoarding = require('../services/onBoarding')
const Signers = require('../services/signers')
const Signatures = require('../services/signatures')


const templateServices = new TemplateServices()
const contractServices = new ContractServices()
const onBoarding = new OnBoarding()
const signers = new Signers()
const signatures = new Signatures()



router.post('/createDocument', async (req, res) => await templateServices.handlingRequest(req, res))
router.get('/getDocument/:uid', async (req, res) => await contractServices.handlingRequest(req, res))
router.get('/getForm/:uid', async (req, res) => await onBoarding.handlingRequest(req, res))
router.post('/auth', async (req, res) => await signers.handlingRequest(req, res))
router.post('/storeSignatures', async (req, res) => await signatures.handlingRequest(req, res))



module.exports = router 