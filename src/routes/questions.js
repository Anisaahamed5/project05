import { Question } from '../models/index.js';

const getFeed = async function(category) {
    return await Question.findAll({
        where: {
            category
        }
    });
}

const getQuestion = async function(id) {
    return await Question.findByPk(id);
}

export { getFeed, getQuestion };