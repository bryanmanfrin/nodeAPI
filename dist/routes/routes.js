"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const youtubeClient_1 = require("../youtubeClient/youtubeClient");
const authentication_service_1 = require("../authentication/authentication.service");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class Routes {
    verifyToken(req, res, next) {
        if (!req.headers.authorization) {
            return res.status(401).send('Unauthorized request');
        }
        const token = req.headers.authorization.split(' ')[1];
        if (token === null) {
            return res.status(401).send('Unauthorized request');
        }
        const payload = jsonwebtoken_1.default.verify(token, 'secretKey');
        if (!payload) {
            return res.status(401).send('Unauthorized request');
        }
        req.userId = payload.subject;
        next();
    }
    routes(app) {
        app.route('')
            .get((req, res) => {
            res.status(200).send({
                message: 'GET request successfulll!!!!'
            });
        });
        app.route('/listVids').get((req, res) => youtubeClient_1.YoutubeClient.getPlaylist(req, res));
        app.route('/video/:id').get((req, res) => youtubeClient_1.YoutubeClient.getVideoById(req, res));
        app.route('/register').post((req, res) => authentication_service_1.AuthenticationService.registerUser(req, res));
        app.route('/login').post((req, res) => authentication_service_1.AuthenticationService.loginUser(req, res));
    }
}
exports.Routes = Routes;
//# sourceMappingURL=routes.js.map