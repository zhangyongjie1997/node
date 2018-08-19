let fs = require('fs');
let http = require('http');
let url = require('url');
let path = require('path');
let io = require('socket.io');

let httpServer = http.createServer((req, res) => {
  if (req.method == "OPTIONS") return res.end(); /*让options请求快速返回*/
  let {pathname,query} = url.parse(req.url,true);
  if(pathname = '/demohtml'){
    fs.readdir(path.join(__dirname,'./',pathname),function(err,data){
      if(err){
        console.log(err);
        return res.end('faile',err,data)
      }
      res.setHeader('Content-Type','text/html;charset=utf8')
      res.end(data.toString());
    });
  }
}).listen(3000, function () {
  console.log('running...');
})
let wsServer = io.listen(httpServer);
wsServer.on('connection',function(sock){
 sock.on('from client',function(a,b){
   console.log('from client',a,b);
   
 });
  setInterval(function(){
    sock.emit('from server',4,5)
  },1000)
});

// function find(arr){
//   if(arr.length<=1){return '';}
//   let result = '';
//   let first = arr[0];
//   for(let i = 0; i<first.length; i++){
//     for(let j = 1; j<arr.length;j++){
//       console.log(first[i],arr[j][i]);
      
//       if(first[i]!=arr[j][i]){return result;}
//     }
//     result += first[i]
//   }
// }
// console.log(['asd','abg']);
