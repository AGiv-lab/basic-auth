'use strict';

const bcrypt = require('bcrypt');
const { DataTypes } = require('sequelize');

const Users = (sequelize) => sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  hooks: {
    beforeCreate: async (user) => {
      user.password = await bcrypt.hash(user.password, 10);
    },
  },
});

Users.authenticateBasic = async function (username, password) {
  const user = await this.findOne({ where: { username } });

  if (!user) {
    throw new Error('Invalid Login');
  }

  const valid = await bcrypt.compare(password, user.password);

  if (!valid) {
    throw new Error('Invalid Login');
  }

  return user;
};

module.exports = Users;

