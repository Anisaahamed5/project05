import db from './db.js';
import Sequelize from 'sequelize';
const { DataTypes } = Sequelize;

const User = db.define('User', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

export default User;