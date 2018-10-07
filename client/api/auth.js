import request from './request';

const url = {
  login: '/users/login',
  registration: '/users/registration',
  resetPassword: '/users/reset-password',
  resetEmail: '/users/reset-email'

};

function login(credentials) {
  return request.post(url.login, credentials)
    .then(res => res.data.data)
    .then(({ token, user }) => {
      window.localStorage.setItem('APP_TOKEN', token);
      return user;
    });
}

function logout() {
  window.localStorage.removeItem('APP_TOKEN');
  // TODO: Add server side invalidation
  return Promise.resolve(true);
}

function register(body) {
  return request.post(url.registration, body);
}

function resetPassword(body) {
  return request.post(url.resetPassword, body);
}

function resetEmail(body) {
  return request.post(url.resetEmail, body);
}

export default {
  login,
  logout,
  register,
  resetPassword,
  resetEmail
};
