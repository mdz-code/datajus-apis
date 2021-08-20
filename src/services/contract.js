const supabase = require('../models/supabase')
const TemplateServices = require('./templates')


class ContractServices {
    templateServices
    supabase

    constructor() {
        this.templateServices = new TemplateServices()
    }

    async handlingRequest(req, res) {
        const { uid: contractId, download } = req.params
        const objectPdf = await this.renderContract(contractId)

        const isTrueSet = (download === 'true');
        if (isTrueSet) {
            res.type('application/pdf')
            res.header('Content-Disposition', 'attachment; filename="contrato.pdf"')

            res.send(objectPdf)
        } else {
            res.json(objectPdf)
        }        
    }

    async renderContract(contractId) {        
        const { custom_json: customObject, document_id: documentId, signers: signerArray } = await supabase.queryBuilder('contracts', 'id', contractId, ['document_id', 'custom_json', 'signers'])

        const { body_html: htmlTemplate } = await supabase.queryBuilder('document_templates', 'document_id', documentId, ['body_html'])

        if (!signerArray) {
            const htmlRender = await this.templateServices.renderByHtmlTemplate(htmlTemplate, customObject)
            const response = await this.templateServices.createPDF(htmlRender)
            return response
        }

        for (let signerId of signerArray) {

            let templateWithSigner = htmlTemplate.replace('</body>', '').replace('</html>', '')
            const { html_signature: htmlSignature } = await supabase.queryBuilder('signatures', 'signer_id', signerId, ['html_signature'])
            const appendPostSignature = '</body></html>'

            templateWithSigner = templateWithSigner + htmlSignature + appendPostSignature
            const htmlRender = await this.templateServices.renderByHtmlTemplate(templateWithSigner, customObject)
            const response = await this.templateServices.createPDF(htmlRender)
            return response
            

            // console.log(htmlSignature)

            
        }



        
    }

    
}

module.exports = ContractServices