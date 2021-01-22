import { User } from '../models/index.js';

const register = async function(username, password) {
    let res = {};

    await User.create({
        username,
        password
    }).then((user) => {
        res = {
            success: true,
            user
        }
    }).catch((error) => {
        res = {
            success: false,
            error: error.errors[0].type
        }
    });

    return res;
}

const login = async function(username, password) {
    let res = {};

    let users = await User.findAll({
        where: {
            username,
            password
        }
    });

    if(users.length > 0) {
        res = {
            success: true,
            user: users[0]
        }
    } else {
        res = {
            success: false
        }
    }

    return res;
}

export { register, login };