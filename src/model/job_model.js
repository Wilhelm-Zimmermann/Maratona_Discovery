const db = require('../database/mongodb')
// na url o id vem como string e o object id server para conveter este id
const ObjectId = require('mongodb').ObjectID
// const remaining = require('../functions/remainingDays')
const profileModel = require('./profile_model')
const JobUtil = require('../utils/Job')

exports.getJob = async () => {
    // procurando 'jobs' na database, se tiver transformamos para um array
    const data = await db.collection('jobs').find().toArray()
    await JobUtil.today(db) // chamando a função do Job
    await JobUtil.isDone(db) // chamando a função do Job
    data.map(el => {
        return {
            ...el
        }
    })
    return {
        data
    }
}

exports.addJob = async (data) => {  
    // esta função adiciona um novo 'job'
    // aqui pegamos o valor da hora do perfil
    const hourValue = await profileModel.getProfile()
    // calculando o valor do projeto com base no tempo de desenvolvimento e o valor da hora
    const budget = await Number(hourValue["hour-value"]) * Number(data.total_hours)

    // pegando o dia de hoje
    const today = new Date()
    const date = new Date(today)
    // calculando quantos dias para o término do projeto
    const dueDay = Math.floor(data.total_hours / data.daily_hours) 
    // dia de vencimento do projeto
    date.setDate(today.getDate() + Number(dueDay))

    await db.collection('jobs').insertOne({
        name : data.name,
        "daily-hours": data.daily_hours,
        "total-hours": data.total_hours,
        budget : budget,
        createdAt: today,
        dueDay : date,
        status : 'progress'
    })
}

exports.singleJob = async (id) => {
    // pegando um unico 'job' baseado no seu id
    const data = await db.collection('jobs').findOne({
        _id : ObjectId(id)
    })

   return{
       ...data
   }
}

exports.updateJob = async (id,data) => {
    const { name, daily_hours, total_hours } = data
    // Atualizando o nosso 'job'
    const today = new Date()
    const date = new Date(today)
    const dueDay = Math.floor(data.total_hours / data.daily_hours) 
    date.setDate(today.getDate() + Number(dueDay))

    db.collection('jobs').updateOne(
        {_id: ObjectId(id)},
        {$set:{
            name : name,
            "daily-hours":daily_hours,
            "total-hours": total_hours,
            "dueDay": date
        }}
    )
}

exports.deleteJob = async (id) => {
    // deletando um job com base no seu id
    await db.collection('jobs').deleteOne({
        _id : ObjectId(id)
    })
}

// const remainingDays = (el) => {
//     // calculo para o tempo restante
//     const remainingDays = (el["total-hours"] / el["daily-hours"]).toFixed()

//     const date = new Date(el.createdAt)
//     const dueDay = date.getDate() + Number(remainingDays)
//     const dueDate = date.setDate(dueDay)

//     const timeDiffInMs = dueDate - Date.now()
//     // transformando milisegundos em dias
//     const dayinMs = 1000 * 60 * 60 * 24
//     const dayDiff = Math.floor(timeDiffInMs / dayinMs)

//     return dayDiff
// }