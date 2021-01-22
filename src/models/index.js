import sequelize from './db.js';

import Answer from './answer.js';
import Question from './question.js';
import User from './user.js';

Answer.belongsTo(Question);
Answer.belongsTo(User);

Question.belongsTo(User);
Question.hasMany(Answer);

User.hasMany(Question);
User.hasMany(Answer);

sequelize.sync();

export {Answer, Question, User};