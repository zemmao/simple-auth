'use strict';

const { createError } = require('../common/errors');
const HttpStatus = require('http-status');
const { User } = require('../common/database');
const pick = require('lodash/pick');

const { BAD_REQUEST, CONFLICT, NOT_FOUND } = HttpStatus;
const inputAttrs = ['email', 'username'];
const patchAtts = ['email', 'password'];

function list({ query }, res) {
  return User.findOne({ where: { email: query.email } })
    .then(user => res.jsend.success(user));
}

function login({ body }, res) {
  const { email, password } = body;
  if (!email || !password) {
    return createError(BAD_REQUEST, 'Please enter email and password!');
  }

  return User.find({ where: { email } })
    .then(user => user || createError(NOT_FOUND, 'User does not exist!'))
    .then(user => user.authenticate(password))
    .then(user => user || createError(NOT_FOUND, 'Wrong password!'))
    .then(user => {
      const token = user.createToken({ expiresIn: '5 days' });
      res.jsend.success({ token, user: user.profile });
    });
}

function register(req, res) {
  const { body } = req;
  const origin = req.origin();

  return User.findOne({ where: { email: body.email } })
    .then(user => !user || createError(NOT_FOUND, 'User already exists!'))
    .then(() => User.invite(pick(body, inputAttrs), { origin }))
    .then(user => {
      return res.jsend.success(user.profile);
    });
}

function resetPassword({ body }, res) {
  const { password, token } = body;
  return User.find({ where: { token } })
    .then(user => user || createError(NOT_FOUND, 'Invalid token!'))
    .then(user => {
      user.password = password;
      return user.save();
    })
    .then(() => res.end());
}

function resetEmail(req, res) {
  const updateData = { email: req.body.newEmail, password: null };
  const origin = req.origin();

  return User.find({ where: { email: req.body.newEmail } })
    .then(user => !user || createError(CONFLICT, 'Provided email exists!'))
    .then(() => User.findOne({ where: { email: req.body.oldEmail } }))
    .then(user => user || createError(NOT_FOUND, 'User does not exist!'))
    .then(user => user.sendResetToken(pick(updateData, patchAtts), { origin }))
    .then(user => res.jsend.success(user.profile));
}

module.exports = {
  list,
  login,
  register,
  resetPassword,
  resetEmail
};
