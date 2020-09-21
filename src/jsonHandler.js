const userData = { users: {} };

// Generic version to write all the others with
const respondJSON = (req, res, status, object) => {
  res.writeHead(status, { 'Content-Type': 'application/json' });
  // if (req.method !== 'HEAD')
  res.write(JSON.stringify(object));
  res.end();
};

// Fxn for a bad request
const badRequest = (req, res) => {
  const obj = {
    id: 'badRequest',
    message: 'Name and age parameters are both required.',
  };

  respondJSON(req, res, 400, obj);
};

// Fxn for client to add users to our user set
const addUser = (req, res, bodyParams) => {
  // Bugtesting
  console.log(bodyParams);

  // Catch if the params are invalid and shoot a bad request error if they are
  if (!bodyParams.name || !bodyParams.age) {
    // console.log('addUser bad request');
    badRequest(req, res, bodyParams);
  } else {
    const obj = {
      id: 'success',
    };

    userData.users[bodyParams.name] = { name: bodyParams.name, age: bodyParams.age };
    respondJSON(req, res, 200, obj);
  }
};

// Fxn for getting the users actively stored
const getUsers = (req, res) => {
  if (req.method === 'HEAD') respondJSON(req, res, 200);
  respondJSON(req, res, 200, userData);
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
  missing,
  addUser,
};
