const profileModel = require('../model/profile_model')
const jobModel = require('../model/job_model')

exports.index = async (req,res) => {
    const profile = await profileModel.getProfile()
    const jobs = await jobModel.getJob()
    // verificando quantos job tem o status de 'progress'
    const progress = jobs["data"].filter(el => el.status == 'progress')
    // verificando quantos job tem o status de 'done'
    const done = jobs["data"].filter(el => el.status == 'done')
    return res.render('index',
     {profile: profile,jobs : jobs,done,progress}
)
}

exports.addJobs = async (req,res) => {
    // enviando o req.body para o addJob()
    await jobModel.addJob(req.body)

    return res.redirect('/')
}

exports.singleJob = async (req,res) => {
    const id_job = req.params.id
    // Enviando o id para o singleJob()
    const job = await jobModel.singleJob(id_job)
   
    return res.render('job-edit',{job})
}

exports.updateJob = (req,res) => {
    const id_job = req.params.id
    const data = req.body
    // Enviando o id e o body para o updateJob()
    jobModel.updateJob(id_job,data)

    res.redirect('/')
}

exports.deleteJob = async (req,res) => {
    const job_id = req.params.id
    // Enviando o id para o deleteJob()
    await jobModel.deleteJob(job_id)
    return res.redirect('/')
}