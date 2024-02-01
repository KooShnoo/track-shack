import mongoose, {Document, ObjectId, SchemaTypes} from 'mongoose';
import { getFileUrl, getUploadUrl } from '../api_s3.ts';
import { serverLogger } from '../loggers.ts';
const {ObjectId, String} = SchemaTypes;
const Schema = mongoose.Schema;

export const neededInstrumentTags = ['Guitar', 'Vocals', 'Bass', 'Drums', 'Violin', 'Cello', 'Double Bass', 'Trumpet', 'Piano', 'Vibraphone', 'Musical Saw', 'Theremin', 'Didgeridoo', 'Guzheng', 'Erhu'] as const;
export const genreTags = ['good', 'bad'] as const;

export interface ITrackPostSchema {
  title: string
  subtitle: string
  description: string 
  albumArtSrc?: string
  audioMasterSrc: string
  audioStemsSrc: string
  neededInstrumentTags?: typeof neededInstrumentTags[number][];
  genreTags?: typeof genreTags[number][];
  author: ObjectId
  // responses: [ReponseSchema]
  comments: [ObjectId]
}

export type ITrackPost = ITrackPostSchema & Document


const trackPostSchema = new Schema<ITrackPost>(
  {
    title: {type: String, required: true},
    subtitle: {type: String, required: true},
    description: {type: String , required: true},
    albumArtSrc: {type: String},
    audioMasterSrc: {type: String, required: true},
    audioStemsSrc: {type: String, required: true},
    neededInstrumentTags: {type: [String], enum: neededInstrumentTags},
    genreTags: {type: [String], enum: genreTags},
    author: {type: ObjectId, ref: 'User', required: true},
    // responses: {type: [ObjectId]}
    comments: {type: [ObjectId], ref: 'Comment', default: []}
  }, 
  {timestamps: true}
);

/** formats a track post for a response */
export async function tpResponse(tp: ITrackPost) {
  // tp = tp.toObject();
  const [albumArtURL,  audioMasterURL,  audioStemsURL] = await Promise.all([
    tp.albumArtSrc && getFileUrl(tp.albumArtSrc),  
    getFileUrl(tp.audioMasterSrc),  
    getFileUrl(tp.audioStemsSrc)
  ]);
  tp.albumArtSrc = albumArtURL;
  tp.audioMasterSrc = audioMasterURL;
  tp.audioStemsSrc = audioStemsURL;
  serverLogger('plogo', tp)
  return tp;
}

export interface TpResponseForUpload {
  id: string
  trackPost: ITrackPostSchema
  albumArtUploadURL?: string
  audioMasterUploadURL: string
  audioStemsUploadURL: string
}
/** formats a response for posting a track post, including presigned file upload urls */
export async function tpResponseForUpload(tp: ITrackPost): Promise<TpResponseForUpload | {error: string}> {
  const [albumArtUploadURL, audioMasterUploadURL, audioStemsUploadURL] = await Promise.all([
    tp.albumArtSrc && getUploadUrl(tp.albumArtSrc),
    getUploadUrl(tp.audioMasterSrc),
    getUploadUrl(tp.audioStemsSrc)
  ]);
  if (!audioMasterUploadURL || !audioStemsUploadURL) return { error: "AWS problem!! AWShit!"};
  return {
    id: tp.id,
    trackPost: tp,
    ...(albumArtUploadURL && {albumArtUploadURL}),
    audioMasterUploadURL,
    audioStemsUploadURL
  };
}

export default mongoose.model<ITrackPost>('TrackPost', trackPostSchema);
