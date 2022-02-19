// サーバ側起動
// express 
const express = require('express') // 
const mongoose = require('mongoose') // mongoDb
const bodyParser = require('body-parser')
const config = require('./config')
const SampleDb = require('./sample-db')

const productRoutes = require('./routes/products')
const dialyRoutes = require('./routes/diaries')
const userRoutes = require('./routes/users')
const path = require('path')
console.log('config.DB_URI=>' + config.DB_URI);
console.log('process.env.NODE_ENV=>' + process.env.NODE_ENV)
// DB 接続
mongoose.connect(config.DB_URI, {
  useNewUrlParser: true,    // Parser使用
  useUnifiedTopology: true,
  useCreateIndex: true
}).then(
  () => {
    /* 接続に成功すればコンソールに表示 */
    console.log('I am running! OK')
    if(process.env.NODE_ENV !== 'production') {
      const sampleDb = new SampleDb()
      // sampleDb.initDb()
    }
  }
)

const app = express()
app.use(bodyParser.json())

app.use('/api/v1/products', productRoutes)
app.use('/api/v1/diaries', dialyRoutes)
app.use('/api/v1/users', userRoutes)


if(process.env.NODE_ENV === 'production') {
  const appPath = path.join( __dirname, '..', 'dist', 'reservation-app')
  app.use(express.static(appPath))
  app.get("*", function(req, res) {
    res.sendFile(path.resolve(appPath, 'index.html'))
  })
}


const PORT = process.env.PORT || '3001'
// 
app.listen(PORT, function() {
  console.log('I am running! PORT:' + PORT)
})
