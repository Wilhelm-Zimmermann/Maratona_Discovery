const express = require('express')
const routes = express.Router()

const jobController = require(__dirname+'/controllers/job_controller')
const profile = require('./controllers/profile_controller')

// main page
routes.get('/',jobController.index)

// insert jobs
routes.get('/job', (req, res) => res.render('job'))
routes.post('/job',jobController.addJobs)

// job edit routes
routes.get('/job/:id/edit',jobController.singleJob)
routes.post('/job/:id/edit',jobController.updateJob)
routes.post('/job/:id/remove',jobController.deleteJob)

// profile routes
routes.get('/profile',profile.profileRender)
routes.post('/profile', profile.createProfile)

module.exports = routes