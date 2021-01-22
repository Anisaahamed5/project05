import db from './db.js';
import Sequelize from 'sequelize';
const { DataTypes } = Sequelize;

const CATEGORIES = [
    'category1',
    'category2',
    'category3',
];

const Question = db.define('Question', {
    text: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false,
    }
});

export { CATEGORIES };
export default Question;