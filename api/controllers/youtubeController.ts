import  { YoutubeClient } from '../youtubeClient/youtubeClient';
import {Request, Response} from "express";

export class YoutubeApi {

    private youtubeClient: YoutubeClient;

   constructor() {
       this.youtubeClient = new YoutubeClient();
   }

   getPlaylist(req: Request, res: Response):void {
    //   this.youtubeClient.getPlaylist(req, res);
   }
}

/* exports.getPlaylistData = function(req, res) {
    console.log(youtubeClient);
    let videos = youtubeClient.getVideosFromChannel(req, res)
    const videoIdsOfChannel = youtubeClient.getVideosFromChannel('PLcsW_JwQZ34XMMtmd1hJUIhQL62plwAv5')
}; */
