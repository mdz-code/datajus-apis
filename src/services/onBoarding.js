const supabase = require('../models/supabase')

module.exports = class OnBoarding {

    async handlingRequest(req, res) {
        const { uid: onBoardingId } = req.params
        const foundedItens = await supabase.queryBuilder('form_itens', 'on_boarding_id', onBoardingId, ['label', 'type'])

        res.json(foundedItens)
    }

    async getFormElements() {}

}