const http = require('http');
const fs = require('fs');
const path = require('path');
const querystring = require('querystring');

const hostname = '127.0.0.1';
const port = 3000;
const csvFile = 'data.csv';

// Helper function to write form data to CSV
function writeDataToCsv(formData) {
  const csvRow = [
    formData.name,
    formData.email,
    formData.gradYear,
    formData.willingToHelp ? 'Yes' : 'No'
  ].join(',') + '\n';

  fs.appendFile(csvFile, csvRow, (err) => {
    if (err) throw err;
    console.log('Form data saved to data.csv');
  });
}

const server = http.createServer((req, res) => {
  if (req.method === 'POST' && req.url === '/submit-form') {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
    });
  
    req.on('end', () => {
      const formData = querystring.parse(body);
      writeDataToCsv(formData);
  
      res.statusCode = 302;
      res.setHeader('Location', '/');
      res.end('Redirecting...');
    });
  
    return;
  }
  

  let filePath = req.url === '/' ? 'public/index.html' : `public${req.url}`;
  let extname = path.extname(filePath);
  let contentType = '';

  switch (extname) {
    case '.html':
      contentType = 'text/html';
      break;
    case '.css':
      contentType = 'text/css';
      break;
    case '.js':
      contentType = 'text/javascript';
      break;
    default:
      contentType = 'text/plain';
    }
    // Serve the requested file
  fs.readFile(path.join(__dirname, filePath), 'utf8', (err, data) => {
    if (err) {
      if (err.code === 'ENOENT') {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Not Found');
      } else {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Internal Server Error');
      }
    } else {
      res.statusCode = 200;
      res.setHeader('Content-Type', contentType);
      res.end(data);
    }
  });
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
