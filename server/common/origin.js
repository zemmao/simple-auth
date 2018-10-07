'use strict';

module.exports = () => {
  return (req, res, next) => {
    req.origin = () => `${req.protocol}://${req.get('host')}`;
    next();
  };
};
