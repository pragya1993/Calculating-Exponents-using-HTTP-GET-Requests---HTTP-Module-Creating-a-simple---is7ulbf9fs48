const http = require('http');

const server = http.createServer((req, res) => {
  if (req.method === 'POST') {
    const chunks = [];

    req.on('data', chunk => {
      const buf = Buffer.from(chunk);
      const str = buf.toString();
      chunks.push(str);
      const obj = JSON.parse(chunks)
      const value1 = obj.num1;
      const value2 = obj.num2;

      // Write code here to calculate power of a number
      if(value1 <= 0){
        res.statusCode=404;
        res.end("Not Found");
      }
      if(value2 < 0){
        res.statusCode=200;
      }
      
    });
    }
});

module.exports = server;