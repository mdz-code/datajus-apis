const supabase = require('../models/supabase')

class OnBoarding {

    constructor () {
        this.endpointObjects = {
            createDocument: 'https://datajus-apis.herokuapp.com/createDocument',
            auth: 'https://datajus-apis.herokuapp.com/auth'
        }
    }

    async handlingRequest(req, res) {
        const { uid: onBoardingId } = req.params
        const foundedItens = await this.getFormElements(onBoardingId)
        const onBoardingInfos = await this.getFormInfos(onBoardingId)
        const responseOBject = this.buildResponse(foundedItens, onBoardingInfos)
    
        res.json(responseOBject)
    }

    buildResponse(data, infos) {
        let responseObject = {}
        responseObject.data = data
        responseObject.infos = infos

        return responseObject
    }

    async getFormElements(onBoardingId) {
        return await supabase.queryBuilder('form_itens', 'on_boarding_id', onBoardingId, ['label', 'type'], 20)
    }

    async getFormInfos(onBoardingId) {
        const { action, template_id: templateId } = await supabase.queryBuilder('on_boarding', 'id', onBoardingId, ['template_id', 'action'], 1)
        
        const formEndpoint = this.endpointObjects[action]

        const infos = {
            type: action,
            api: {
                endpoint: formEndpoint
            }

        }

        if (!!templateId) {
            infos.templateId = templateId
        }

        return infos
       
    }
    
}

module.exports = OnBoarding