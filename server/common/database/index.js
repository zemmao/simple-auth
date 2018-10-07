'use strict';

const { 'migrations-path': migrationsPath } = require('../../../.sequelizerc');
const config = require('./config');
const invoke = require('lodash/invoke');
const Sequelize = require('sequelize');
const Umzug = require('umzug');
const User = require('../../user/user.model');

const sequelize = new Sequelize(config.url);
const { Sequelize: { DataTypes } } = sequelize;

const defineModel = Model => {
  const fields = invoke(Model, 'fields', DataTypes);
  const hooks = invoke(Model, 'hooks');
  const options = invoke(Model, 'options');
  return Model.init(fields, { sequelize, hooks, ...options });
};

const models = {
  User: defineModel(User)
};

function initialize() {
  const umzug = new Umzug({
    storage: 'sequelize',
    storageOptions: {
      sequelize,
      tableName: config.migrationTableName
    },
    migrations: {
      params: [sequelize.getQueryInterface(), Sequelize],
      path: migrationsPath
    }
  });

  return umzug.up()
    .then(() => umzug.executed())
    .then(migrations => console.log('[Executed migrations]', migrations));
}

module.exports = {
  initialize,
  Sequelize,
  sequelize,
  ...models
};
