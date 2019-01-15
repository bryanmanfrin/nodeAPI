import jwt from "jsonwebtoken";
import {User} from "../models/user.model";
import {omit} from "lodash";

const User = require('../models/mongodb/user.mongo')

export class MongodbUtils {
    static fetchUserByEmail(email: string): User | any {
        return new Promise((resolve, reject) => {
            User.findOne({email: email}, (err: any, user: User) => {
                if (err) {
                    reject({code: 500, message: 'technical'});
                } else if (!user) {
                    reject({code: 404, message: 'email'});
                } else {
                    resolve(user);
                }
            })
        });
    }


    static saveUser(user: any, hash: any) {
        return new Promise((resolve, reject) => {
            user.hash = hash;
            const dbUser = new User(omit(user, ['password']));
            dbUser.save((err: any, registeredUser: any) => {
                if (err) {
                    reject(err)
                } else {
                    const payload = {subject: registeredUser._id};
                    const token = jwt.sign(payload, 'secretKey');
                    console.log('token: ' + token);
                    resolve({token, pseudo: registeredUser._doc.pseudo})
                }
            })
        });
    }
}
