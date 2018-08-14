const mongoose = require('mongoose');
const userSchema = require('./user.schema.server');

const userModel = mongoose.model('UserModel', userSchema);

findAllUsers = () =>
  userModel.find();

findUserByCredentials = (username, password) =>
  userModel.findOne({ username: username, password: password });

findUserByUsername = username =>
  userModel.findOne({ username: username });

findUserById = userId =>
  userModel.findById(userId)

findUserByIdExpanded = userId =>
  userModel
    .findById(userId)
    .populate('sections')
    .exec()

createUser = user =>
  userModel.create(user)

updateUser = (oldUser, updatedUser) => {
  return userModel.findById(oldUser._id)
    .then(user => {
      user.password = updatedUser.password;
      user.firstName = updatedUser.firstName;
      user.lastName = updatedUser.lastName;
      user.phone = updatedUser.phone;
      user.email = updatedUser.email;
      user.role = updatedUser.role;
      user.sections = updatedUser.sections;
      user.save();
    })
}

removeUser = (userId) => {
  userModel.findByIdAndRemove(userId);
}

module.exports = {
  findUserByIdExpanded,
  findUserById,
  findAllUsers,
  findUserByCredentials,
  findUserByUsername,
  createUser,
  updateUser,
  removeUser
};