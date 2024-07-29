// server/controllers/userController.js

const User = require('../models/userModel');

const getAllUsers = (req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
};

const createUser = (req, res) => {
  const { username, email, role } = req.body;

  const newUser = new User({ username, email, role });

  newUser.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err));
};

const getUserById = (req, res) => {
  User.findById(req.params.id)
    .then(user => res.json(user))
    .catch(err => res.status(400).json('Error: ' + err));
};

const deleteUserById = (req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then(() => res.json('User deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
};

const updateUserById = (req, res) => {
  User.findById(req.params.id)
    .then(user => {
      user.username = req.body.username;
      user.email = req.body.email;
      user.role = req.body.role;

      user.save()
        .then(() => res.json('User updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
};

module.exports = {
  getAllUsers,
  createUser,
  getUserById,
  deleteUserById,
  updateUserById
};
