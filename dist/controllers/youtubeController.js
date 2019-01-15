"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const youtubeClient_1 = require("../youtubeClient/youtubeClient");
class YoutubeApi {
    constructor() {
        this.youtubeClient = new youtubeClient_1.YoutubeClient();
    }
    getPlaylist(req, res) {
        //   this.youtubeClient.getPlaylist(req, res);
    }
}
exports.YoutubeApi = YoutubeApi;
/* exports.getPlaylistData = function(req, res) {
    console.log(youtubeClient);
    let videos = youtubeClient.getVideosFromChannel(req, res)
    const videoIdsOfChannel = youtubeClient.getVideosFromChannel('PLcsW_JwQZ34XMMtmd1hJUIhQL62plwAv5')
}; */
//# sourceMappingURL=youtubeController.js.map