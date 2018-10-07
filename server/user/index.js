'use strict';

const auth = require('../common/auth').authenticate('jwt');
const ctrl = require('./user.controller');
const router = require('express').Router();

router
  .get('/', ctrl.list)
  .post('/login', ctrl.login)
  .post('/registration', ctrl.register)
  .post('/reset-password', ctrl.resetPassword)
  .use(auth)
  .post('/reset-email', ctrl.resetEmail);

module.exports = {
  path: '/users',
  router
};
