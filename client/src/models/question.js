import db from './index';
import { DataTypes } from 'sequelize';

import User from './user';
import Answer from './answer';

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

Question.belongsTo(User);
Question.hasMany(Answer);

Question.sync();

export { CATEGORIES };
export default Question;