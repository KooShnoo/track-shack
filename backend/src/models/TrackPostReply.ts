import mongoose, { Document, ObjectId, Schema, SchemaTypes } from "mongoose";
import { neededInstrumentTags } from "./TrackPost.ts";
const {ObjectId, String} = SchemaTypes;

export interface ITrackPostReplySchema {
  title          : string
  description    : string
  audioMasterSrc : string
  audioStemsSrc  : string
  instrumentTag  : typeof neededInstrumentTags[number];
  author         : ObjectId
}

export type ITrackPostReply = ITrackPostReplySchema & Document

const trackPostReplySchema = new Schema<ITrackPostReply>(
  {
  title         : {type: String, required: true},
  description   : {type: String, required: true},
  audioMasterSrc: {type: String, required: true},
  audioStemsSrc : {type: String, required: true},
  instrumentTag : {type: String, enum: neededInstrumentTags, required: true},
  author        : {type: ObjectId, ref: 'User', required: true},
}, 
{timestamps: true}
);

export default mongoose.model<ITrackPostReply>('TrackPostReply', trackPostReplySchema);