"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_utils_1 = require("./mongodb.utils");
const auth_utils_1 = require("./auth.utils");
class AuthenticationService {
    constructor() {
    }
    static registerUser(req, res) {
        const userData = req.body;
        auth_utils_1.AuthUtils.createHash(userData)
            .then((hash) => mongodb_utils_1.MongodbUtils.saveUser(userData, hash))
            .then((token) => res.status(200).send(token))
            .catch((err) => res.status(500).send(err));
    }
    static loginUser(req, res) {
        res.setHeader("Access-Control-Allow-Origin", "*");
        auth_utils_1.AuthUtils.verifyUserCredentials(req.body)
            .then((data) => {
            res.status(200).send(data);
        })
            .catch((err) => res.status(err.code ? err.code : 500).send(err.message));
    }
}
exports.AuthenticationService = AuthenticationService;
//# sourceMappingURL=authentication.service.js.map