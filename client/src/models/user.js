import db from './index';
import { DataTypes } from 'sequelize';

import Question from './question';
import Answer from './answer';

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

User.hasMany(Question);
User.hasMany(Answer);

User.sync();

export default User;