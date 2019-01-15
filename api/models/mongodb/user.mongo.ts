import * as mongoose from 'mongoose'

const Schema = mongoose.Schema;
const userSchema = new Schema({
    email: String,
    hash: String,
    pseudo: String
})

module.exports = mongoose.model('user', userSchema, 'users');

