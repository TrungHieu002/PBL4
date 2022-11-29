const InforUserModel = require('../models/InforUserModels');
const bcrypt = require('bcrypt');
let handleUserLogin = (username, password) => {
    return new Promise(async (resolve, reject) => {
        let userData = {};
        try {
            let isExist = await checkUserEmail(username);
            if (isExist) {
                InforUserModel.findOne({ username: username })
                    .then(user => {
                        if (user) {
                            let check = bcrypt.compareSync(password, user.password);
                            if (check){
                                userData.errCode = 0;
                                userData.errMessage = '';
                                delete user._doc.password;
                                userData.user = user;
                            }else{
                                userData.errCode = 3;
                                userData.errMessage = 'Sai mat khau';
                            }
                            resolve(userData);
                        } else {
                            userData.errCode = 2;
                            userData.errMessage = `Khong tim thay user`;
                            resolve(userData);
                        }
                    })
                    .catch(err => res.status(400).send(err));
            } else {
                userData.errCode = 1;
                userData.errMessage = `Username khong ton tai`;
                resolve(userData);
            }
        } catch (err) {
            reject(err);
        }
    })
}

let checkUserEmail = (username) => {
    return new Promise((resolve, reject) => {
        try {
            InforUserModel.findOne({ username: username })
                .then(user => {
                    if (!user) {
                        resolve(false);
                    } else {
                        resolve(true);
                    }
                })
        } catch (err) {
            reject(err);
        }
    })
}

module.exports = {
    handleUserLogin: handleUserLogin
}