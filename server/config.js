'use strict';

module.exports = {
  port: process.env.PORT,
  ip: process.env.IP,
  auth: {
    saltRounds: parseInt(process.env.AUTH_SALT_ROUNDS, 10),
    scheme: process.env.AUTH_JWT_SCHEME || 'JWT',
    secret: process.env.AUTH_JWT_SECRET
  },
  email: {
    sender: process.env.EMAIL_ADDRESS,
    user: process.env.EMAIL_USER,
    password: process.env.EMAIL_PASSWORD,
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT || null,
    ssl: !!process.env.EMAIL_SSL,
    tls: !!process.env.EMAIL_TLS
  }
};
