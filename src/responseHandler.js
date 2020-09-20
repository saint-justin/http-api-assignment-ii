const userData = { users: {} };

// Generic version to write all the others with
const respondJSON = (req, res, status, object, type) => {
  res.writeHead(status, { 'Content-Type': 'application/json' });
  if (type === 'GET') res.write(JSON.stringify(object));
  res.end();
};

// Fxn for getting the users actively stored
const getUsers = (req, res, type) => {
  if (type === 'HEAD') respondJSON(req, res, 200);
  respondJSON(req, res, 200, userData);
};

// Fxn for client to add users to our user set
const addUser = (req, res, params) => {
  // Catch if the params are invalid and shoot a bad request error if they are
  if (!params.name || !params.age) {
    badRequest(req, res, params);
  }

  const obj = {
    id: 'success',
  };

  userData[params.user] = params.age;
  respondJSON(req, res, 200, obj);
};

// Fxn for a bad request
const badRequest = (req, res) => {
  const obj = {
    id: 'badRequest',
    message: 'Name and age parameters are both required.',
  };

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
  missing,
  addUser,
};
