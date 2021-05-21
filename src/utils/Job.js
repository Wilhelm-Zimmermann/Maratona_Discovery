// ele seta o dia de hoje para todos os documentos
exports.today = async (db) => {
    await db.collection('jobs').updateMany(
        {},
        {$set:{
            today : new Date()
        }}, 
        {multi : true}
    )
}

// está função verifica se um 'job' foi encerrado com base no dia de hoje
// se o dia de hoje for maior ou igual ao dia da entrega ele coloca o status done
exports.isDone = async (db) => {
  await db.collection('jobs').updateMany(
    {$expr:{$gte: ['$today','$dueDay']}},
    {$set:{
      status : 'done'
    }},
    { multi : true }
)
}