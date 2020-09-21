const http = require('http');
const url = require('url');
const query = require('querystring');

const htmlHandler = require('./htmlHandler.js');
const jsonHandler = require('./jsonHandler.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;
const urlStruct = {
  '/': htmlHandler.getClient,
  '/style.css': htmlHandler.getStyle,
  '/getUsers': jsonHandler.getUsers,
};

const handlePost = (req, res, parsedUrl) => {
  if (parsedUrl.pathname === '/addUser') {
    const body = [];

    req.on('error', (err) => {
      console.dir(err);
      res.statusCode = 400;
      res.end();
    });

    req.on('data', (chunk) => {
      body.push(chunk);
    });

    req.on('end', () => {
      const bodyString = Buffer.concat(body).toString();
      const bodyParams = query.parse(bodyString);
      jsonHandler.addUser(req, res, bodyParams);
    });
  } else {
    jsonHandler.missing(req, res);
  }
};

const onRequest = (req, res) => {
  const parsedUrl = url.parse(req.url);
  console.log('REQUEST URL: ', req.url);

  // Prints info about the request
  console.log(`PATH: '${parsedUrl.pathname}'    METHOD: ${req.method}`);

  // Handle cases for get, post, and head requests
  if (req.method === 'GET' && urlStruct[parsedUrl.pathname]) {
    urlStruct[parsedUrl.pathname](req, res);
  } else if (req.method === 'HEAD' && urlStruct[parsedUrl.pathname]) {
    urlStruct[parsedUrl.pathname](req, res);
  } else if (req.method === 'POST') {
    handlePost(req, res, parsedUrl);
  } else {
    jsonHandler.missing(req, res);
  }
};

http.createServer(onRequest).listen(port);
// console.log(`Listening on 127.0.0.1:${port}`);
