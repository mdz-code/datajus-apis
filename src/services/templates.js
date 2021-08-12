const queryBuilder = require('../models/supabase')
const ejs = require('ejs')
const pdf = require('html-pdf')


class TemplateServices {

    async handlingRequest(req, res) {
        const { uid: onBoardingId, customObject } = req.body

        const documentDelivery = await this.createDocument(onBoardingId, customObject)
        
        res.contentType("application/pdf")
        res.send(documentDelivery)
    }

    async createDocument(onBoardingId, customObject) {
        const templateHtml = await this.getTemplateByOnBoarding(onBoardingId)
        const htmlRender = await this.renderByHtmlTemplate(templateHtml, customObject)
        return await this.createPDF(htmlRender)
    }

    async renderByHtmlTemplate(templateHtml, customObject) {
        return await ejs.render(templateHtml, customObject, { async:true })
    }

    async getTemplateByOnBoarding(onBoardingId) {
        const { template_id: templateId } = await queryBuilder('on_boarding', 'id', onBoardingId, ['template_id'])
        const { body_html: templateHtml} = await queryBuilder('document_templates', 'id', templateId)
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