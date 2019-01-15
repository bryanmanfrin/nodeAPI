import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import {User} from "../models/user.model";
import {MongodbUtils} from "./mongodb.utils";
import { omit } from 'lodash';
const saltRounds = 10;

export class AuthUtils {

    static verifyUserCredentials = (user: User) => {
        return MongodbUtils.fetchUserByEmail(user.email)
            .then((dbUser: User) => AuthUtils.verifyPassword(user.password, dbUser))
            .then((dbUser: User) => Promise.resolve({token: AuthUtils.createTokenForUser(dbUser), pseudo: dbUser.pseudo}))
            .catch((err: any) => Promise.reject(err))
    }

    private static verifyPassword = (plaintextPassword: string, { _doc } : any) => {
        return new Promise((resolve, reject) => {
            if (!plaintextPassword) reject({code: 400, input: 'password', message: 'No password provided'});
            bcrypt.compare(plaintextPassword, _doc.hash, function(err, res) {
                if (res) {
                    resolve(omit(_doc, ['hash']));
                } else {
                    reject({code: 404, message: 'password'});
                }
            });
        })
    }

    static createTokenForUser = (user: User) => {
        const payload = { subject: user._id };
        return jwt.sign(payload, 'secretKey');
    }

    static createHash = (user: User) => new Promise((resolve, reject) => {
        bcrypt.hash(user.password, saltRounds, (err, hash) => {
            console.log('hash error: ' + err);
            err ? reject({code: 500, message: 'password'}) : resolve(hash)
        });
    })
}
