import db from './index';
import { DataTypes } from 'sequelize';

const Answer = db.define('Answer', {
    text: {
        type: DataTypes.STRING,
        allowNull: false,
    }
});

Answer.sync();

export default Answer;