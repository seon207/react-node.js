const express = require('express')
const app = express()
const port = 3000

const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://seon:<mvseon>@moviecluster.k5wwmg8.mongodb.net/',{

}).then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err))
app.get('/', (req, res) => {
  res.send('Hello World! 안녕안녕')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})