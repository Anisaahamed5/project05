import db from './index';
import { DataTypes } from 'sequelize';

import Question from './question';
import User from './user';

const Answer = db.define('Answer', {
    text: {
        type: DataTypes.STRING,
        allowNull: false,
    }
});


Answer.belongsTo(Question);
Answer.belongsTo(User);

Answer.sync();

export default Answer;