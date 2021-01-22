import db from './db.js';
import Sequelize from 'sequelize';
const { DataTypes } = Sequelize;

const Answer = db.define('Answer', {
    text: {
        type: DataTypes.STRING,
        allowNull: false,
    }
});

export default Answer;