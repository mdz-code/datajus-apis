const supabase = require('../models/supabase')

class Signers {

    async handlingRequest(req, res) {
        const { completeName, email, phone } = req.body
        const response = await this.storeSigner(completeName, email, phone)
        res.send(response)
    }

    async storeSigner(nome, email, phone) {

        const arrayInset = [{
            complete_name: nome,
            email: email,
            phone: phone,
        }]

        const { id } = await supabase.insertValue('signers', arrayInset)
        return {
            signer_id: id
        }

    }
}

module.exports = Signers