const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
//salt 만들 때 10자리인 salt 생성
const saltRounds = 10
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
        maxlength:500
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

//유저 정보를 저장하기 전에 실행
userSchema.pre('save', function(next){
    var user = this;
    //비밀번호 암호화
    if(user.isModified('password')){
        bcrypt.genSalt(saltRounds, function(err, salt){
            if(err) return next(err)
    
            bcrypt.hash(user.password, salt, function(err, hash){
                if(err) return next(err)
                user.password = hash
                next()
            })
        })
    }else{
        next()
    }
})


userSchema.methods.comparePassword = function(plainPassword){
    const user = this;
    return bcrypt.compare(plainPassword, this.password);
}

userSchema.methods.generateToken = function(){
    var user = this;
    //jsonwebtoken 사용해서 토큰 생성
    var token = jwt.sign(user._id.toHexString(), "secretToken");
    user.token = token;
    return user.save();
}
const User = mongoose.model('User', userSchema)

module.exports = {User} //다른 곳에서 사용할 수 있도록 export