import mongoose, { Document, ObjectId, Schema, SchemaTypes } from "mongoose";
import { getFileUrl, getUploadUrl } from "../api_s3.ts";
import { ITrackPostReply, ITrackPostReplySchema } from "./TrackPostReply.ts";
const { ObjectId, String } = SchemaTypes;

export const neededInstrumentTags = [
  "Guitar",
  "Vocals",
  "Bass",
  "Drums",
  "Violin",
  "Cello",
  "Double Bass",
  "Trumpet",
  "Piano",
  "Vibraphone",
  "Musical Saw",
  "Theremin",
  "Didgeridoo",
  "Guzheng",
  "Erhu",
] as const;
export const genreTags = ["good", "bad"] as const;

export interface ITrackPostSchema {
  title                : string;
  subtitle             : string;
  description          : string;
  albumArtSrc         ?: string;
  audioMasterSrc       : string;
  audioStemsSrc        : string;
  neededInstrumentTags : (typeof neededInstrumentTags)[number][];
  genreTags            : (typeof genreTags)[number][];
  author               : ObjectId;
  responses            : ObjectId[];
  comments             : [ObjectId]
    // comments: [commentsSchema]
}

export type ITrackPost = ITrackPostSchema & Document;

const trackPostSchema = new Schema<ITrackPost>(
  {
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
    description: { type: String, required: true },
    albumArtSrc: { type: String },
    audioMasterSrc: { type: String, required: true },
    audioStemsSrc: { type: String, required: true },
    neededInstrumentTags: {
      type: [String],
      enum: neededInstrumentTags,
      default: [],
    },
    genreTags: { type: [String], enum: genreTags, default: [] },
    author: { type: ObjectId, ref: "User", required: true },
    responses: { type: [ObjectId], ref: "TrackPostReply", default: [] },
    comments: {type: [ObjectId], ref: 'Comment', default: []}
  },
  { timestamps: true }
);

/** formats a track post for a response */
export async function tpResponse(tp: ITrackPost | ITrackPostReply) {
  const [albumArtURL, audioMasterURL, audioStemsURL] = await Promise.all([
    // this is kinda ugly but it just means `if (tp.albumArtSrc) getFileUrl(tp.albumArtSrc)`
    "albumArtSrc" in tp && tp.albumArtSrc
      ? getFileUrl(tp.albumArtSrc)
      : undefined,
    getFileUrl(tp.audioMasterSrc),
    getFileUrl(tp.audioStemsSrc),
  ]);
  if ("albumArtSrc" in tp) tp.albumArtSrc = albumArtURL;
  tp.audioMasterSrc = audioMasterURL;
  tp.audioStemsSrc = audioStemsURL;
  return tp;
}

export interface TpResponseForUpload {
  id: string;
  trackPost: ITrackPostSchema;
  albumArtUploadURL?: string;
  audioMasterUploadURL: string;
  audioStemsUploadURL: string;
}
export type TpReplyResponseForUpload = Omit<TpResponseForUpload, "trackPost"> & {
  trackPostReply: ITrackPostReplySchema;
};

/** formats a response for posting a track post, including presigned file upload urls */
export async function tpResponseForUpload(
  tp: ITrackPost | ITrackPostReply
): Promise<TpResponseForUpload | TpReplyResponseForUpload | { error: string }> {
  const [albumArtUploadURL, audioMasterUploadURL, audioStemsUploadURL] =
    await Promise.all([
      "albumArtSrc" in tp && tp.albumArtSrc
        ? getUploadUrl(tp.albumArtSrc)
        : undefined,
      getUploadUrl(tp.audioMasterSrc),
      getUploadUrl(tp.audioStemsSrc),
    ]);
  if (!audioMasterUploadURL || !audioStemsUploadURL)
    return { error: "AWS problem!! AWShit!" };
  if ("subtitle" in tp) {
    return {
      id: tp.id,
      trackPost: tp,
      ...(albumArtUploadURL && { albumArtUploadURL }),
      audioMasterUploadURL,
      audioStemsUploadURL,
    };
  } else {
    return {
      id: tp.id,
      trackPostReply: tp,
      ...(albumArtUploadURL && { albumArtUploadURL }),
      audioMasterUploadURL,
      audioStemsUploadURL,
    };
  }
}

export default mongoose.model<ITrackPost>("TrackPost", trackPostSchema);
