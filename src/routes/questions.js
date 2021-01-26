import { Question, User, Answer } from '../models/index.js';

const getFeed = async function(category) {
    return await Question.findAll({
        where: {
            category
        },
        include: [{model: User, required: true}, {model: Answer, required: false}]
    });
}

const getQuestion = async function(id) {
    return await Question.findByPk(id, {include: [{model: User, required: true}, {model: Answer, required: false}]});
}

const createQuestion = async function(user_id, text, category) {
    Question.create({
        text,
        category,
        UserId: user_id
    })
}

const answerQuestion = async function(text, user_id, question_id) {
    Answer.create({
        text,
        UserId: user_id,
        QuestionId: question_id
    })
}

export { getFeed, getQuestion, createQuestion, answerQuestion };