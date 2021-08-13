const supabase = require('../models/supabase')

class OnBoarding {

    async handlingRequest(req, res) {
        const { uid: onBoardingId } = req.params
        const foundedItens = await supabase.queryBuilder('form_itens', 'on_boarding_id', onBoardingId, ['label', 'type'], 20)

        res.json(foundedItens)
    }

    async getFormElements() {}
}

module.exports = OnBoarding