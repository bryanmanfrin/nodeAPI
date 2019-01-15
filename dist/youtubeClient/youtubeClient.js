"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Video = require('../models/mongodb/video.mongo');
const { google } = require('googleapis');
var MongoClient = require('mongodb').MongoClient;
const youtube = google.youtube({
    version: 'v3',
    auth: 'AIzaSyDuFOQzYKkaLA6gyL2zz8g0tNZX7uhj9B4'
});
class YoutubeClient {
    constructor() {
    }
    static getVideoById(req, res) {
        Video.find({ id: req.params.id }, (err, results) => {
            if (err) {
                console.log(err);
                throw err;
            }
            const videos = results.map((video) => video._doc);
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.json(videos[0]);
        });
    }
    static getPlaylist(req, res) {
        console.log('playlist');
        Video.find({}, (err, results) => {
            if (err) {
                console.log(err);
                throw err;
            }
            const videos = results.map((video) => video._doc);
            res.setHeader("Access-Control-Allow-Origin", "*");
            console.log('answer sent!!');
            res.json(videos);
        });
        /* MongoClient.connect(dburl, { useNewUrlParser: true } ,(err: any, client: any) => {
            if (!client) {
                const msg = 'No Mongodb instance was found running on this machine.\''
                res.send(msg)
                console.log(msg)
            } else {
                var db = client.db('local');
                if (err) {  console.log(err); throw err;  }
                db.collection('videos').find().toArray(function(err: any, docs: any){
                    if(err) throw err;
                    client.close();
                    res.setHeader("Access-Control-Allow-Origin", "*");
                    console.log('answer sent!!')
                    res.json(docs);
                });
            }
        });*/
    }
}
exports.YoutubeClient = YoutubeClient;
const getPlaylistData = (etag = null) => {
    // Create custom HTTP headers for the request to enable use of eTags
    /*const headers = {};
    if (etag) {
      headers['If-None-Match'] = etag;
    }
    return youtube.playlists.list({
      part: 'id,snippet',
      id: 'PLIivdWyY5sqIij_cgINUHZDMnGjVx3rxi',
      headers: headers,
    }); */
};
const getVideosFromChannel = (req, res) => {
    /* const headers = {};
    headers['If-None-Match'] = null;

    return youtube.playlistItems.list({
        part: 'contentDetails, snippet',
        playlistId: 'PLcsW_JwQZ34XMMtmd1hJUIhQL62plwAv5',
        headers: headers,
    }).then((apiResult) => {
        const data = apiResult.data;
        const videos = [];
        data.items.forEach(element => {
            videos.push({
                id: element.contentDetails.videoId,
                title: element.snippet.title
            })
        });
        return videos;
    }); */
};
//# sourceMappingURL=youtubeClient.js.map