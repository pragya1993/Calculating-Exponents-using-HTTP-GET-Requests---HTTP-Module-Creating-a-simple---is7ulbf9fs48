const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
  const reqUrl = url.parse(req.url, true);
  
  // Check if the request method is POST and the URL is "/"
  if (req.method === 'POST' && reqUrl.pathname === '/') {
    let body = '';
    
    // Read the request body
    req.on('data', chunk => {
      body += chunk.toString();
    });
    
    req.on('end', () => {
      try {
        const data = JSON.parse(body);
        
        // Check if num1 and num2 are valid
        const num1 = parseInt(data.num1);
        const num2 = parseInt(data.num2);
        
        if (isNaN(num1) || isNaN(num2) || num1 <= 0 || num2 < 0) {
          res.writeHead(400, {'Content-Type': 'text/plain'});
          res.end('Invalid input');
        } else {
          // Calculate the exponentiation
          const result = Math.pow(num1, num2);
          
          res.writeHead(200, {'Content-Type': 'text/plain'});
          res.end(`The result is ${result}`);
        }
      } catch (err) {
        res.writeHead(400, {'Content-Type': 'text/plain'});
        res.end('Invalid input');
      }
    });
  } else {
    res.writeHead(404, {'Content-Type': 'text/plain'});
    res.end('Not Found');
  }
});

server.listen(3000, () => {
  console.log('Server listening on port 3000');
});
