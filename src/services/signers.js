const supabase = require('../models/supabase')

class Signers {

    async handlingRequest(req, res) {
        const { nomeCompleto: completeName, email, cpf, telefone: phone } = req.body
        console.log(req.body)
        const response = await this.storeSigner(completeName, email, phone, cpf)
        res.send(response)
    }

    async storeSigner(nome, email, phone, cpf) {
        console.log(nome)

        const arrayInset = [{
            complete_name: nome,
            email: email,
            phone: phone,
            cpf: cpf
        }]

        const { id } = await supabase.insertValue('signers', arrayInset)
        return {
            signerId: id
        }

    }
}

module.exports = Signers