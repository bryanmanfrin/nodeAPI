"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const mongodb_utils_1 = require("./mongodb.utils");
const lodash_1 = require("lodash");
const saltRounds = 10;
class AuthUtils {
}
AuthUtils.verifyUserCredentials = (user) => {
    return mongodb_utils_1.MongodbUtils.fetchUserByEmail(user.email)
        .then((dbUser) => AuthUtils.verifyPassword(user.password, dbUser))
        .then((dbUser) => Promise.resolve({ token: AuthUtils.createTokenForUser(dbUser), pseudo: dbUser.pseudo }))
        .catch((err) => Promise.reject(err));
};
AuthUtils.verifyPassword = (plaintextPassword, { _doc }) => {
    return new Promise((resolve, reject) => {
        if (!plaintextPassword)
            reject({ code: 400, message: 'password' });
        bcrypt_1.default.compare(plaintextPassword, _doc.hash, function (err, res) {
            if (res) {
                resolve(lodash_1.omit(_doc, ['hash']));
            }
            else {
                reject({ code: 404, message: 'password' });
            }
        });
    });
};
AuthUtils.createTokenForUser = (user) => {
    const payload = { subject: user._id };
    return jsonwebtoken_1.default.sign(payload, 'secretKey');
};
AuthUtils.createHash = (user) => new Promise((resolve, reject) => {
    bcrypt_1.default.hash(user.password, saltRounds, (err, hash) => {
        console.log('hash error: ' + err);
        err ? reject({ code: 500, message: 'password' }) : resolve(hash);
    });
});
exports.AuthUtils = AuthUtils;
//# sourceMappingURL=auth.utils.js.map
