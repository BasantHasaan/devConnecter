const express = require('express');
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

module.exports = router;