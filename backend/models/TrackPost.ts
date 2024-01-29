import mongoose, {Document, ObjectId, SchemaTypes} from 'mongoose';
const {ObjectId, String} = SchemaTypes;
const Schema = mongoose.Schema;

export const neededInstrumentTags = ['Guitar', 'Vocals', 'Bass', 'Drums', 'Violin', 'Cello', 'Double Bass', 'Trumpet', 'Piano', 'Vibraphone', 'Musical Saw', 'Theremin', 'Didgeridoo', 'Guzheng', 'Erhu'] as const;
export const genreTags = ['good', 'bad'] as const;

export interface ITrackPost extends Document {
  title: string
  subtitle: string
  description: string 
  albumArtSrc: string
  audioMasterSrc: string
  audioStemsSrc: string
  neededInstrumentTags: typeof neededInstrumentTags[number];
  genreTags: typeof genreTags[number];
  author: ObjectId
  // responses: ObjectId[]
}

const trackPostSchema = new Schema<ITrackPost>(
  {
    title: {type: String, required: true},
    subtitle: {type: String, required: true},
    description: {type: String , required: true},
    albumArtSrc: {type: String},
    audioMasterSrc: {type: String, required: true},
    audioStemsSrc: {type: String, required: true},
    neededInstrumentTags: {type: String, enum: neededInstrumentTags},
    genreTags: {type: String, enum: genreTags},
    author: {type: ObjectId, ref: 'User', required: true},
    // responses: {type: [ObjectId]}
  }, 
  {timestamps: true}
);

export default mongoose.model<ITrackPost>('TrackPost', trackPostSchema);
