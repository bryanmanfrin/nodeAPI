import {Request, Response} from "express";
import bcrypt from "bcrypt";
import {MongodbUtils} from "./mongodb.utils";
import {AuthUtils} from "./auth.utils";

export class AuthenticationService {
    constructor() {
    }

    static registerUser(req: Request, res: Response) {
        const userData = req.body;

        AuthUtils.createHash(userData)
            .then((hash) => MongodbUtils.saveUser(userData, hash))
            .then((token) => res.status(200).send(token))
            .catch((err) => res.status(500).send(err));
    }

    static loginUser(req: Request, res: Response) {
        res.setHeader("Access-Control-Allow-Origin", "*");
        AuthUtils.verifyUserCredentials(req.body)
            .then((data: any) => {
                res.status(200).send(data)
            })
            .catch((err: any) => res.status(err.code ? err.code : 500).send(err.message))
    }
}
