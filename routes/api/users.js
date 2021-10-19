const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrybt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const {check, validationResult } = require('express-validator');


const User = require('../../models/User')

// @route   Post api/users
// @desc    Register user
// @access  Public
router.post('/', [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'please enter valid email').isEmail(),
    check('password','password min_length is 6').isLength({ min:6 })
],
 async(req,res) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.send(400).json({error:errors.array()})
    }
    try{
        const {name, password, email,} = req.body;
        //Check if user exist
        const user = await User.findOne({ email });
        if(user){
          return res.status(400)
          .json({ errors: [{ msg: 'User already exists' }] })
        }
        //Get user gravatar
        const avatar = gravatar.url(email, {
            s: '200',
            r: 'pg',
            d: 'mm'
        });
        user = new User({
            name,
            email,
            password,
            avatar
        })

        //Encrypt password
        const salt = await bcrybt.genSalt(10);
        user.password = await bcrybt.hash( password, salt );
        await user.save();
        const payload = {
            user:{
                id: user.id
            }
        }
        jwt.sign(
            payload,
            config.get('jwtSecret'),
            { expiresIn: 360000 },
            (err, token)=>{
                if(err) throw err;
                res.json({token})
                
            } 
        )
        res.send('User registered');

    }catch(err){
        console.error(err);
        res.status(500).send('Server error')
    }
    
    //Return jsonwebtoken
});


module.exports = router;