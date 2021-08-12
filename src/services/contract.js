const queryBuilder = require('../models/supabase')
const TemplateServices = require('./templates')


class ContractServices {
    templateServices

    constructor() {
        this.templateServices = new TemplateServices()
    }

    async handlingRequest(req, res) {
        const { uid: contractId } = req.params
        const fileBytes = await this.renderContract(contractId)
        res.contentType("application/pdf")
        res.send(fileBytes)
    }

    async renderContract(contractId) {
        const { custom_json: customObject, document_id: documentId } = await queryBuilder('contracts', 'id', contractId, ['document_id', 'custom_json'])
        const { body_html: htmlTemplate } = await queryBuilder('document_templates', 'document_id', documentId, ['body_html'])
        const htmlRender = await this.templateServices.renderByHtmlTemplate(htmlTemplate, customObject)
        return await this.templateServices.createPDF(htmlRender)
    }
}

module.exports = ContractServices