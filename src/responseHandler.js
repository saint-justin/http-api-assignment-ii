const users = { users: {} };

// Generic version to write all the others with
const respondJSON = (req, res, status, object) => {
  res.writeHead(status, { 'Content-Type': 'application/json' });
  res.write(JSON.stringify(object));
  res.end();
};

// Fxn for getting the users actively stored
const getUsers = (req, res) => {
  respondJSON(req, res, 200, users);
};

// Fxn for a bad request
const badRequest = (req, res, params) => {
  const obj = {
    id: 'badRequest',
    message: 'Missing valid query param set to true',
  };

  if (params.valid === 'yes') obj.message = 'This request has the required params';

  respondJSON(req, res, 400, obj);
};

// Fxn for user requesting data when not logged in
const unauthorized = (req, res, params) => {
  const obj = {
    id: 'unauthorized',
    message: 'Missing loggedIn query param set to "yes"',
  };

  if (params.loggedIn === 'yes') obj.message = 'Yay you viewed the content';
  respondJSON(req, res, 401, obj);
};

// Fxn for user requesting data that they don't have access to
const forbidden = (req, res) => {
  const obj = {
    id: 'forbidden',
    message: 'You do not have access to this content.',
  };

  respondJSON(req, res, 403, obj);
};

// Fxn for internal server error handling
const internal = (req, res) => {
  const obj = {
    id: 'internalError',
    message: 'Internal server error. Something went wrong.',
  };
  respondJSON(req, res, 500, obj);
};

// Fxn for when user requests features not yet implemented
const notImplemented = (req, res) => {
  const obj = {
    id: 'notImplemented',
    message: 'Feature not yet implemented. Check again later for updated content.',
  };
  respondJSON(req, res, 501, obj);
};

// Fxn for when user requests assets that don't exist
const missing = (req, res) => {
  const obj = {
    id: 'missing',
    message: 'Requested information not found.',
  };
  respondJSON(req, res, 404, obj);
};

// Export everthing to be usable by server.js
module.exports = {
  getUsers,
  badRequest,
  unauthorized,
  forbidden,
  internal,
  notImplemented,
  missing,
};
