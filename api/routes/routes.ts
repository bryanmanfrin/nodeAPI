import {Request, Response} from "express";
import { YoutubeClient } from "../youtubeClient/youtubeClient";
import {AuthenticationService} from "../authentication/authentication.service";
import jwt from "jsonwebtoken";


export class Routes {

    verifyToken(req: Request | any, res: Response, next: any) {
        if (!req.headers.authorization) {
            return res.status(401).send('Unauthorized request')
        }
        const token = req.headers.authorization.split(' ')[1];
        if (token === null) {
            return res.status(401).send('Unauthorized request')
        }
        const payload: any = jwt.verify(token, 'secretKey');
        if (!payload) {
            return res.status(401).send('Unauthorized request')
        }
        req.userId = payload.subject;
        next();
    }

    public routes(app: any): void {
        app.route('')
            .get((req: Request, res: Response) => {
                res.status(200).send({
                message: 'GET request successfulll!!!!'
            })})

        app.route('/listVids').get((req: Request, res: Response) => YoutubeClient.getPlaylist(req, res));
        app.route('/video/:id').get((req: Request, res: Response) => YoutubeClient.getVideoById(req, res));

        app.route('/register').post((req: Request, res: Response) => AuthenticationService.registerUser(req, res));
        app.route('/login').post((req: Request, res: Response) => AuthenticationService.loginUser(req, res));
    }
}
