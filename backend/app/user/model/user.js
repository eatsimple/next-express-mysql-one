import { Sequelize } from 'sequelize';
import db from '../../../config/Database.js';

const { DataTypes } = Sequelize;

const Users = db.define(
  'users',
  {
    uuid: {
      type: DataTypes.STRING, // uuid type nya STRING
      defaultValue: DataTypes.UUIDV4, // default value nya apa UUIDV4
      allowNull: false, // allow null atau tidak
      validate: {
        notEmpty: true, // validate nya apa
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [3, 100],
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: 'user',
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  }
);

export default Users;
