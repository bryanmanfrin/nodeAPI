"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = __importStar(require("body-parser"));
const routes_1 = require("./routes/routes");
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
class App {
    constructor() {
        this.routePrv = new routes_1.Routes();
        this.dburl = "mongodb://dbuser:pass@localhost:27017/2start";
        this.app = express();
        this.config();
        this.routePrv.routes(this.app);
        this.mongo();
    }
    mongo() {
        mongoose_1.default.connect(this.dburl, err => {
            if (err) {
                console.log('error' + err);
            }
            else {
                console.log('connected to mongodb');
            }
        });
    }
    config() {
        this.app.use(cors_1.default());
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
    }
}
exports.default = new App().app;
//# sourceMappingURL=app.js.map