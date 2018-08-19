let express = require('express')
let app = express()
app.use('/',function(){
  console.log('get request');
  
})
app.listen(3000,function () {
  console.log('runnng');
})