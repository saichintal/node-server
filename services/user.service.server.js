module.exports = app => {

  const userModel = require('../models/user/user.model.server');

  findAllUsers = (req, res) =>
    userModel.findAllUsers()
      .then(users => {
        res.send(users);
      });

  login = (req, res) => {
    const user = req.body;
    userModel.findUserByCredentials(user.username, user.password)
      .then(user => {
        if (user == null) {
          res.status(400).send({
            message: 'Invalid credentials'
          });
        }
        req.session['currentUser'] = user;
        res.send(req.session['currentUser']);
      });
  };

  register = (req, res) => {
    const user = req.body;
    userModel.findUserByUsername(user.username)
      .then(userFound => {
        if (userFound != null) {
          res.sendStatus(412)
        }
        else {
          var role = 'student';
          if (user.username == "admin" && user.password1 == "admin") {
              role = 'admin'; 
          }
          var newUser = {
            username: user.username,
            password: user.password1,
            role: role,
          }
          userModel.createUser(newUser);
          req.session['currentUser'] = newUser;
          res.send(req.session['currentUser']);
        }
      })
    };


  logout = (req, res) => {
    req.session['currentUser'] = null;
    req.session.destroy();
  }

  currentUser = (req, res) => {
    if (req.session.cookie.maxAge == 0) {
      res.sendStatus(403)
    }
    else {
    const currentUser = req.session['currentUser'];
    if (currentUser) {
      req.session.touch();
      userModel.findUserByIdExpanded(currentUser._id)
        .then(user => res.send(user))
    } else {
      res.sendStatus(403)
    }
  }
  }

  updateUser = (req, res) => {
    const updatedUser = req.body;
    const currentUser = req.session['currentUser'];
    if (currentUser) {
      userModel.findUserById(currentUser._id)
        .then(user => {
          userModel.updateUser(currentUser, updatedUser).then(ans => res.send(ans));
          }
        )
    } else {
      res.sendStatus(403)
    }
  }

  deleteUser = (req, res) => {
    const currentUser = req.session['currentUser'];
    if (currentUser) {
      userModel.findUserById(currentUser._id)
        .then(user => {
          userModel.removeUser(user._id).then(ans => res.send(ans)); 
        }
        )
    }
  }

  app.get('/api/profile', currentUser);
  app.get('/api/user', findAllUsers);
  app.post('/api/login', login);
  app.post('/api/register', register);
  app.put('/api/profile', updateUser)
  app.post('/api/logout', logout)
  app.delete('/api/profile', deleteUser)

};