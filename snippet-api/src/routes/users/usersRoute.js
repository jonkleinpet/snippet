const express = require('express');
const usersService = require('./usersService');
const errorHandling = require('../../helpers');
const authService = require('../../services/auth-service');
const parser = express.json();
const usersRoute = express.Router();

usersRoute
  .route('/register')
  .post(parser, async (req, res, next) => {
    try {
      const knex = req.app.get('db');
      const { user_name, password } = req.body;

      if (!user_name) {
        return res.send({ message: 'user name is missing' });
      }
      if (!password) {
        return res.send({ message: 'password is missing' });
      }
      const passwordError = errorHandling.validatePassword(password);
      if (passwordError) {
        return res.send({ message: passwordError });
      }

      
      const notValid = await usersService.checkUserName(knex, user_name);
      
      if (notValid) {
        return res.send({ message: 'User name already taken' });
      }   
      
      const hashPassword = await usersService.hashPassword(password);
      const user = {
        user_name,
        password: hashPassword
      };
      
      const newUser = await usersService.registerUser(knex, user);
      const sub = newUser.user_name;
      const payload = {
        id: newUser.id
      };

      return res.send({ authToken: authService.createJwt(sub, payload) });

    }
    catch (error) {
      next(error);
    }
  });

usersRoute
  .route('/login')
  .post(parser, async (req, res, next) => {
    try {
      const knex = req.app.get('db');
      const { user_name, password } = req.body;
      
      if (!user_name) {
        return res.send({ message: 'user name is missing' });
      }
      if (!password) {
        return res.send({ message: 'password is missing' });
      }

      const dbUser = await usersService.getUser(knex, user_name);
      const validPassword = await authService.comparePasswords(password, dbUser.password);

      if (dbUser.user_name === user_name && validPassword) {
        const sub = dbUser.user_name;
        const payload = {
          id: dbUser.id
        };

        return res.send({ authToken: authService.createJwt(sub, payload) });
      }
      return res.send({ message: 'incorrect user name or password' });
    }

    catch (error) {
      next(error);
    }
  });

module.exports = usersRoute;