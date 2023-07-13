const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name:{
        type:String,
        maxlength:50
    },
    email:{
        type:String,
        trim: true, //스페이스바 없애기
        unique:1        
    },
    password:{
        type:String,
        maxlength:50
    },
    role:{
        type: Number,
        default:0
    },
    image:String,
    token:{
        type:String
    },
    tokenExp:{
        type:Number
    }
})

const User = mongoose.model('User', userSchema)

module.exports = {User} //다른 곳에서 사용할 수 있도록 export