const express = require('express');
const { check, validationResult } = require('express-validator');
const router = express.Router();
const auth = require('../../middleware/auth')
const Profile = require('../../models/Profile');

// @route   Get api/profile/me
// @desc    Get current user profile
// @access  Private
router.get('/me', auth, async(req,res) =>{
    try{
        const profile = await Profile.findOne({user: req.user.id}).populate(
        'user',
        ['name','avatar']);
        if(profile) return res.status(200).json({profile: profile});
        return res.status(400).send('there is no profile for this user');

    }catch(err){
        console.error(err);
        res.status(500).send('Server error')
    }
});


// @route   Post api/profile/me
// @desc    Create or update user profile
// @access  Private
router.post('/me', auth, [
    check('status', 'status is required').not().isEmpty(),
    check('skills', 'skills is required').not().isEmpty()

    ], async(req,res) =>{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.send(400).json({error:errors.array()})
        }
        const { status, skills, twitter, 
            facebook, instegram, company,
            location, gethubusername, bio} = req.body;
        const profileData = {};
        profileData.status = status;
        profileData.skills = skills.split(',').map(skill=> skill.trim());
        profileData.twitter = twitter;
        profileData.instegram = instegram;
        profileData.githubusername = githubusername;
        profileData.company = company;
        profileData.location = location;
        profileData.facebook = facebook;

    try{
        let profile = await Profile.findOne({user: req.user.id});

        //update
        if(profile){
            profile = await Profile.findOneAndUpdate({user: req.user.id},
                {$set: profileData},{new: true} );
            return res.status(200).json({profile: profile});
        }
        //create
        profile = new Profile(profileData)
        profile.save();
        returnres.status(200).json({profile: profile});

    }catch(err){
        console.error(err);
        res.status(500).send('Server error')
    }
});


// @route   Get api/profile
// @desc    Get all profiles
// @access  Public
router.get('/', async(req,res) =>{
    try{
        const profiles = await Profile.find().populate(
        'user',
        ['name','avatar']);
        if(profiles) return res.status(200).json({profiles: profiles});
        return res.status(400).send('there is no profiles');

    }catch(err){
        console.error(err);
        res.status(500).send('Server error')
    }
});


// @route   Delete api/profile
// @desc    Delete user,profile & posts
// @access  Private
router.delete('/', auth, async(req,res) =>{
    try{
        //Delete userProfile
        await Profile.findOneAndRemove({user: req.user.id});
        //Delete User
        await User.findByIdAndRemove({_id: req.user.id})
        return res.status(200).json({msg: 'user deleted'});

    }catch(err){
        console.error(err);
        if(err.kind == 'ObjectId') return res.status(400).send('User Id not valid');
        res.status(500).send('Server error')
    }
});


// @route   Put api/profile/experience
// @desc    Add user experience
// @access  Private
router.put('/experience', auth, [
    check('title', 'title is required').not().isEmpty(),
    check('company', 'company is required').not().isEmpty(),
    check('from', 'from is required').not().isEmpty(),

    ], async(req,res) =>{
        const errors = validationResult(req);
        if(errors)
        const {title,
            company, from, to,
            location, current, description} = req.body;
            const Exp = {
                company, title, from,
                to, location,
                current, description
            }
        try{
            const profile = await Profile.findOne({'user': red.user.id});
            profile.experience.unshift(Exp);
            if(profiles) return res.status(200).json({profile: profile});
            return res.status(400).send('there is no profiles');

        }catch(err){
            console.error(err);
            res.status(500).send('Server error')
        }
});


// @route   Delete api/profile/experience/:expId
// @desc    Delete experience from profile 
// @access  Private
router.delete('/experience/:expId', async(req,res) =>{
        const errors = validationResult(req);
        if(errors)
        const {title,
            company, from, to,
            location, current, description} = req.body;
            const Exp = {
                company, title, from,
                to, location,
                current, description
            }
        try{
            const profile = await Profile.findOne({'user': red.user.id});
            profile.experience.unshift(Exp);
            if(profiles) return res.status(200).json({profile: profile});
            return res.status(400).send('there is no profiles');

        }catch(err){
            console.error(err);
            res.status(500).send('Server error')
        }
});

// @route   Put api/profile/education
// @desc    Add user education
// @access  Private
router.put('/education', auth, [
    check('school', 'school is required').not().isEmpty(),
    check('degree', 'degree is required').not().isEmpty(),
    check('study', 'study is required').not().isEmpty(),

    ], async(req,res) =>{
        const errors = validationResult(req);
        if(errors)
        const {school,
            degree, study } = req.body;
            const Edu = {
                degree, school, study
            }
        try{
            const profile = await Profile.findOne({'user': red.user.id});
            profile.education.unshift(Edu);
            if(profiles) return res.status(200).json({profile: profile});
            return res.status(400).send('there is no profiles');

        }catch(err){
            console.error(err);
            res.status(500).send('Server error')
        }
});


// @route   Delete api/profile/education/:expId
// @desc    Delete education from profile 
// @access  Private
router.delete('/education/:expId', async(req,res) =>{
        try{
            const profile = await Profile.findOne({'user': req.user.id});
            profile.experience.unshift(Exp);
            if(profiles) return res.status(200).json({profile: profile});
            return res.status(400).send('there is no profiles');

        }catch(err){
            console.error(err);
            res.status(500).send('Server error')
        }
});


// @route   Get api/profile/github/:username
// @desc    Get user repos from Github
// @access  Public
router.get('/github/:username', async(req,res) =>{
    try{
        const profile = await Profile.findOne({'user': req.user.id});
        profile.experience.unshift(Exp);
        if(profiles) return res.status(200).json({profile: profile});
        return res.status(400).send('there is no profiles');

    }catch(err){
        console.error(err);
        res.status(500).send('Server error')
    }
});
module.exports = router;