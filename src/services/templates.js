const supabase = require('../models/supabase')
const ejs = require('ejs')
const pdf = require('html-pdf')


class TemplateServices {
    supabase

    constructor() {
        this.supabase = supabase
    }

    async handlingRequest(req, res) {
        const { uid: onBoardingId, customObject } = req.body
        const { id: contractId} = await this.createDocument(onBoardingId, customObject)

        res.send({ contractId })
    }

    async createDocument(onBoardingId, customObject) {
        return await this.templateToContract(onBoardingId, customObject)
    }

    async templateToContract(onBoardingId, customObject) {
        const { template_id: templateId } = await this.supabase.queryBuilder('on_boarding', 'id', onBoardingId)
        const { document_id: documentId } = await this.supabase.queryBuilder('document_templates', 'id', templateId)

        const arrayInset = [{
            document_id: documentId,
            custom_json: customObject
        }]

        return await this.supabase.insertValue('contracts', arrayInset)
    }

    async renderByHtmlTemplate(templateHtml, customObject) {
        return await ejs.render(templateHtml, customObject, { async:true })
    }

    async getTemplateByOnBoarding(onBoardingId) {
        const { template_id: templateId } = await this.supabase.queryBuilder('on_boarding', 'id', onBoardingId, ['template_id'])
        const { body_html: templateHtml} = await this.supabase.queryBuilder('document_templates', 'id', templateId)
        return templateHtml
    }

    async createPDF(html, options={}) {
        return new Promise(((resolve, reject) => {
            pdf.create(html, options).toBuffer((err, buffer) => {
                if (err !== null) {reject(err)}
                else {resolve(buffer)}
            })
        }))
    }

}

module.exports = TemplateServices