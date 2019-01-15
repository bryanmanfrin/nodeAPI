"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const lodash_1 = require("lodash");
const User = require('../models/mongodb/user.mongo');
class MongodbUtils {
    static fetchUserByEmail(email) {
        return new Promise((resolve, reject) => {
            User.findOne({ email: email }, (err, user) => {
                if (err) {
                    reject({ code: 500, message: 'technical' });
                }
                else if (!user) {
                    reject({ code: 404, message: 'email' });
                }
                else {
                    resolve(user);
                }
            });
        });
    }
    static saveUser(user, hash) {
        return new Promise((resolve, reject) => {
            user.hash = hash;
            const dbUser = new User(lodash_1.omit(user, ['password']));
            dbUser.save((err, registeredUser) => {
                if (err) {
                    reject(err);
                }
                else {
                    const payload = { subject: registeredUser._id };
                    const token = jsonwebtoken_1.default.sign(payload, 'secretKey');
                    console.log('token: ' + token);
                    resolve({ token, pseudo: registeredUser._doc.pseudo });
                }
            });
        });
    }
}
exports.MongodbUtils = MongodbUtils;
//# sourceMappingURL=mongodb.utils.js.map