import * as mongoose from 'mongoose'

const Schema = mongoose.Schema;
const conferenceSchema = new Schema({
    title: String,
    description: String,
});

module.exports = mongoose.model('video', conferenceSchema, 'videos');

