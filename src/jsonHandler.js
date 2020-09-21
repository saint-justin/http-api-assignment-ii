const userData = { users: {} };

// Generic version to write all the others with
const respondJSON = (req, res, status, object) => {
  res.writeHead(status, { 'Content-Type': 'application/json' });
  if (req.method !== 'HEAD') res.write(JSON.stringify(object));
  res.end();
};

// Fxn for client to add users to our user set
const addUser = (req, res, bodyParams) => {
  const responseData = {
    id: 'badRequest',
    message: 'Name and age parameters are both required.',
  };

  if (!bodyParams.name || !bodyParams.age) {
    respondJSON(req, res, 400, responseData);
  } else if (Object.keys(userData.users).includes(bodyParams.name)) {
    responseData.id = 'updated';
    respondJSON(req, res, 204, responseData);
  } else {
    responseData.id = 'success';
    responseData.message = 'Created Successfully';

    userData.users[bodyParams.name] = { name: bodyParams.name, age: bodyParams.age };
    respondJSON(req, res, 201, responseData);
  }
};

// Fxn for getting the users actively stored
const getUsers = (req, res) => {
  if (req.method === 'HEAD') respondJSON(req, res, 200);
  respondJSON(req, res, 200, userData.users);
};

// Fxn for when user requests assets that don't exist
const missing = (req, res) => {
  const responseData = {
    id: 'missing',
    message: 'The page you are looking for was not found.',
  };
  respondJSON(req, res, 404, responseData);
};

// Export everthing to be usable by server.js
module.exports = {
  getUsers,
  missing,
  addUser,
};
