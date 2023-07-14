const express = require('express')
const app = express()
const port = 4000
const {User} = require("./models/User")
const bodyParser = require('body-parser')
const config = require('./config/key')
const cookieParser = require('cookie-parser')
//application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended:true}));
//application/json
app.use(bodyParser.json());
app.use(cookieParser());
//mongodb 연결
const mongoose = require('mongoose')
const { mongoURI } = require('./config/prod')
mongoose.connect(config.mongoURI,{
}).then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err))
app.get('/', (req, res) => {
  res.send('Hello World! 안녕안녕')
})
app.post('/register', async(req, res)=>{
  //회원가입 할 때 필요한 정보를 client에서 가져오면
  //그것들을 데이터베이스에 넣어줌

  const user = new User(req.body)
  //mongodb method
  const result = await user.save().then(()=>{
    res.status(200).json({
      success: true
    })
  }).catch((err)=>{
    res.json({ success: false, err })
  })
})

app.post('/login', async (req, res) =>{
  //요청된 이메일이 데터이스에 있는지 찾음
  try{
  const user = await User.findOne({email: req.body.email});
    if(!user){
      return res.json({
        loginSuccess:false,
        message: "제공된 이메일에 해당하는 유저가 없습니다."
      })
  }
  
  const isMatch = await user.comparePassword(req.body.password);

      if(!isMatch)  //틀림
      return res.json({loginSuccess:false, message:"비밀번호가 틀렸습니다."})

      const token = await user.generateToken();

        //토큰 저장 쿠키, 로컬스토리지

        //쿠키에 저장
       res.cookie("x_auth", user.token)
       .status(200)
       .json({loginSuccess:true, userId: user._id})
      } catch(err){
    return res.status(400).send(err);
  }
  });
  //았다면 맞는 비밀번호인지 확인
  
  //비밀번호 맞으면 토큰 생성

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

//nodemon -> 소스 변경하면 자동으로 감지해서 실행, 서버 껐다 켰다 안해도 됨