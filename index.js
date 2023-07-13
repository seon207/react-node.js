const express = require('express')
const app = express()
const port = 3000
const {User} = require("./models/User")
const bodyParser = require('body-parser')
const config = require('./config/key')
//application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended:true}));
//application/json
app.use(bodyParser.json());

//mongodb 연결
const mongoose = require('mongoose')
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
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

//nodemon -> 소스 변경하면 자동으로 감지해서 실행, 서버 껐다 켰다 안해도 됨