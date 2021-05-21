const db = require('../database/mongodb')
const profileModel = require('../model/profile_model')

exports.profileRender = async (req,res) => {
    res.render('profile',{profile : await profileModel.getProfile()})
}

exports.createProfile = async (req,res) => {
    await profileModel.createProfile(req.body)
    return res.redirect('/profile')
}
