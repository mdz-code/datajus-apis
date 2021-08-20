const supabase = require('../models/supabase')

class Signatures {

    constructor() {
        this.buildObject = { font: this.buildFontSignature }
    }

    async handlingRequest(req, res) {

    
       
        const { type: signatureType, source: signatureSource, config: signatureConfig, signerId, contractId } = req.body

        const { complete_name: name, cpf} = await supabase.queryBuilder('signers', 'id', signerId, ['complete_name', 'cpf'])

        signatureConfig['name'] = name
        signatureConfig['cpf'] = cpf

        const signature = await this.buildSignature(signatureType, signatureSource, signatureConfig)

        const saveObject = {
            signer_id: signerId,
            signature_type: signatureType,
            signature_resource: signatureSource,
            options: signatureConfig,
            html_signature: signature
        }

        const response = await supabase.insertValue('signatures', [saveObject])
        console.log(response)
        await supabase.updateValue('contracts', { id: contractId }, { signers: [signerId] })

         // vincular assinatura

        res.json({})
    }

    async buildSignature(type, source, config) {
        const buildFunction = this.buildObject[type]
        return await buildFunction(source, config)

    }

    async buildFontSignature(source, config) {

        const objectMonth = {
            1: 'janeiro',
            2: 'fevereiro',
            3: 'março',
            4: 'abril',
            5: 'maio',
            6: 'junho',
            7: 'julho',
            8: 'agosto',
            9: 'setembro',
            10: 'outubro',
            11: 'novembro',
            12: 'dezembro',

        }

        const objectFonts = {
            sans: 'font-family: Verdana, Geneva, sans-serif;',
            serif: 'font-family: "Times New Roman", Times, serif;',
            mono: 'font-family: "Lucida Console", Monaco, monospace;'
        }

        const objectColors = {
            black: 'color: rgb(0, 0, 0);',
            blue: 'color: rgb(30, 58, 138);',
            red: 'color: rgb(185, 28, 28);'
        }

        const today = new Date()


        const year = today.getFullYear()
        const month = today.getMonth() + 1
        const day = today.getDate()

        const { name, cpf } = config


        return `
        <p style="text-align: center;"><u><span style="font-family: Arial, Helvetica, sans-serif;">&nbsp; &nbsp;</span><span style='${objectFonts[config.font]} ${objectColors[config.color]}'>${source}</span><span style="font-family: Arial, Helvetica, sans-serif;"> &nbsp;&nbsp;</span></u></p>
        <p style="text-align: center;"><span style="font-family: Arial, Helvetica, sans-serif;">Nome: ${name}</span></p>
        <p style="text-align: center;"><span style="font-family: Arial, Helvetica, sans-serif;">Data: ${day} de ${objectMonth[month]} de ${year}</span></p>
        <p style="text-align: center;"><span style="font-family: Arial, Helvetica, sans-serif;">CPF: ${cpf}</span></p>
        `

    }

    // 1. cadastrar assinatura vinculada com assinador
    // 2. atualizar contrato com o id do assinadores
    // 3. retornar id do contrato
    // 4. atualizar get document para renderizar com assinatura
}

module.exports = Signatures