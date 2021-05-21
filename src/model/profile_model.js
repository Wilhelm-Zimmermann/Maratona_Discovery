const db = require('../database/mongodb')
const profileUtil = require('../utils/Profile')

// getProfile para pegar o perfil
exports.getProfile = async () => {
    // procurando o perfil na database
    let data = await db.collection('profile').find().toArray()

    // s não tiver nenhum perfil adicionaremos este perfil padrão
    if(data.length === 0){
        await data.push({
            name : '',
            avatar : 'data:image/png;base64,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',
            "monthly-budget": '',
            "days-per-week": '',
            "hours-per-day": '',
            "vacation-per-year":'',
            "hour-value": 0.00
        })
    }

    // está verificação diz que se tiver mais que um perfil deletaremos o primeiro
    // porque não temos o método update no momento, e esta é uma ótima solução
    if(data.length > 1){
        await db.collection('profile').deleteOne({_id : data[0]._id})
    }

    // e por último retornamos o perfil
    return{
        name : data[data.length - 1].name,
        avatar : data[data.length - 1].avatar,
        "monthly-budget": data[data.length - 1]["monthly-budget"],
        "days-per-week": data[data.length - 1]["days-per-week"],
        "hours-per-day": data[data.length - 1]["hours-per-day"],
        "vacation-per-year":data[data.length - 1]["vacation-per-year"],
        "hour-value": data[data.length - 1]["hour-value"]
    }
}

exports.createProfile = async (data) => {
    // atualizando o perfil
    const hour = await profileUtil.updateProfile(data)
    await db.collection('profile').insertOne({
        name : data.name,
        avatar : data.avatar,
        "monthly-budget": data.monthly_budget,
        "days-per-week": data.days_per_week,
        "hours-per-day": data.hours_per_day,
        "vacation-per-year":data.vacation_per_year,
        "hour-value": hour,
    })
}