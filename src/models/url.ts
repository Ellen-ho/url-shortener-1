// const mongoose = require('mongoose')

// const Schema = mongoose.Schema

// const urlSchema: IUrl = new Schema({
//     originUrl: String,
//     shortUrlHash: String
// })

// module.exports = mongoose.model('Url', urlSchema)

// export interface IUrl {
//     originUrl: string;
//     shortUrlHash: string;
// }

import { model, Schema, Model, Document } from 'mongoose';

const UrlSchema: Schema = new Schema({
    originUrl: { type: String, required: true },
    shortUrlHash: { type: String, required: true },
});

const Url: Model<IUrl> = model('Url', UrlSchema);

export default Url;

export interface IUrl extends Document {
    originUrl: string;
    shortUrlHash: string;
}