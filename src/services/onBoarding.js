const supabase = require('../models/supabase')

class OnBoarding {

    async handlingRequest(req, res) {
        const { uid: onBoardingId } = req.params
        const foundedItens = await supabase.queryBuilder('form_itens', 'on_boarding_id', onBoardingId, ['label', 'type'], 20)
        const templateOnBoarding = await supabase.queryBuilder('on_boarding', 'id', onBoardingId, ['template_id'], 1)
        const templateObject = !templateOnBoarding.template_id ? { template: { need: false } } : { template: { need: true, template_id: templateOnBoarding.template_id } }

        templateObject['data'] = foundedItens

        res.json(templateObject)
    }

    async getFormElements() {}
}

module.exports = OnBoarding