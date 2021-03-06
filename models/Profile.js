const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    companey:{
        type: String
    },
    website:{
        type: String
    },
    location:{
        type: String
    },
    status:{
        type: String,
        required: true
    },
    skills: {
        type: [String],
        required: true
    },
    githubusername:{
        type: String
    },
    bio:{
        type: String
    },
    experience:[
        {
            title:{
                type: String,
                required: true
            },
          
            from:{
                type: Date,
                required: true

            },
            to:{
                type: Date,

            },
            current:{
                type: Boolean,
                default: false
            },
           
            description:{
                type: String
            },

        }
    ],
    social:{
        youtube:{
            type: String
        },
        twitter:{
            type: String
        },
        facebook:{
            type: String
        },
        instegram:{
            type: String
        },
        linkedin:{
            type: String
        }
    }

})


module.exports = Profile = mongoose.model('profile', profileSchema)