import express = require('express');
import * as bodyParser from "body-parser";
import {Routes} from "./routes/routes";
import mongoose from "mongoose";
import cors from 'cors';


class App {

    public app: express.Application;
    public routePrv: Routes = new Routes();
    private dburl = "mongodb://dbuser:pass@localhost:27017/2start";

    constructor() {
        this.app = express();
        this.config();
        this.routePrv.routes(this.app);
        this.mongo();
    }
    private mongo() {
        mongoose.connect(this.dburl, err => {
            if (err) {
                console.log('error' + err)
            } else {
                console.log('connected to mongodb')
            }
        })
    }

    private config(): void {
        this.app.use(cors());
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
    }
}

export default new App().app;
