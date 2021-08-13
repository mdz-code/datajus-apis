const supabase = require('../models/supabase')
const TemplateServices = require('./templates')


class ContractServices {
    templateServices
    supabase

    constructor() {
        this.templateServices = new TemplateServices()
        this.supabase = supabase
    }

    async handlingRequest(req, res) {
        const { uid: contractId } = req.params
        res.contentType("application/pdf")
        return await this.renderContract(contractId).then( buffer => res.send(buffer))

    }

    async renderContract(contractId) {        
        const { custom_json: customObject, document_id: documentId } = await this.supabase.queryBuilder('contracts', 'id', contractId, ['document_id', 'custom_json'])

        const { body_html: htmlTemplate } = await this.supabase.queryBuilder('document_templates', 'document_id', documentId, ['body_html'])
        const htmlRender = await this.templateServices.renderByHtmlTemplate(htmlTemplate, customObject)
        return await this.templateServices.createPDF(htmlRender)
    }

    
}

module.exports = ContractServices