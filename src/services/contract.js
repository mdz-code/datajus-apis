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
        // res.contentType("application/pdf")
        const objectPdf = await this.renderContract(contractId)       
        res.json(objectPdf)
        return objectPdf

    }

    async renderContract(contractId) {        
        const { custom_json: customObject, document_id: documentId } = await this.supabase.queryBuilder('contracts', 'id', contractId, ['document_id', 'custom_json'])

        const { body_html: htmlTemplate } = await this.supabase.queryBuilder('document_templates', 'document_id', documentId, ['body_html'])
        const htmlRender = await this.templateServices.renderByHtmlTemplate(htmlTemplate, customObject)
        const response = await this.templateServices.createPDF(htmlRender)
        return response
    }

    
}

module.exports = ContractServices