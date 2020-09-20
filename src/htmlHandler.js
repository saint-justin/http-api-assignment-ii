const fs = require('fs');

const client = fs.readFileSync(`${__dirname}/../client/client.html`);
const css = fs.readFileSync(`${__dirname}/../client/style.css`);

const getClient = (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write(client);
  res.end();
};

const getStyle = (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/css' });
  res.write(css);
  res.end();
};

module.exports = {
  getClient,
  getStyle,
};
