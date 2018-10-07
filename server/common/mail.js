'use strict';

const { email: config } = require('../config');
const { parse: parseUrl } = require('url');
const { promisify } = require('util');
const email = require('emailjs');

const server = email.server.connect(config);
const send = promisify(server.send.bind(server));

function sendEmail(receiver, subject, message) {
  return send({
    from: `APP <${config.sender}>`,
    to: receiver,
    subject,
    attachment: [{ data: `<html>${message}</html>`, alternative: true }]
  });
}

function invite(user, { origin }) {
  const href = `${origin}/#/reset-password/${user.token}`;
  const { hostname } = parseUrl(href);
  const message = `
    An account has been created on ${hostname}.
    Please click <a href="${href}">here</a> to complete your registration.`;

  const subject = 'Invite';
  return sendEmail(user.email, subject, message);
}

function resetPassword(user, { origin }) {
  const href = `${origin}/#/reset-password/${user.token}`;
  const message = `
    You requested email address change. That means you have to change/confirm
    your password, too.
    Please click <a href="${href}">here</a> to complete the reset process.`;

  const subject = 'New email/password';
  return sendEmail(user.email, subject, message);
}

module.exports = {
  invite,
  resetPassword
};
