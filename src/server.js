const http = require('http');
const url = require('url');
const query = require('querystring');

const htmlHandler = require('./htmlHandler.js');
const responseHandler = require('./responseHandler.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;
const urlStruct = {
  GET: {
    '/': htmlHandler.getClient,
    '/style.css': htmlHandler.getStyle,
    '/getUsers': responseHandler.getUsers,
  },
  POST: {
    user: 'garbage',
  },
};

const onRequest = (req, res) => {
  const parsedUrl = url.parse(req.url);
  // const params = query.parse(parsedUrl.query);
  const type = req.headers.accept.split(',')[0] || 'application/json';

  // Prints info about the request
  console.log(`TYPE: ${type}    PATH: '${parsedUrl.pathname}'    METHOD: ${req.method}`);

  if (urlStruct[req.method][parsedUrl.pathname]) {
    urlStruct[req.method][parsedUrl.pathname](req, res);
  } else {
    responseHandler.missing(req, res);
  }
};

http.createServer(onRequest).listen(port);
// console.log(`Listening on 127.0.0.1:${port}`);
