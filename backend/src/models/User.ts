import mongoose, {Document} from 'mongoose';
const Schema = mongoose.Schema;

export interface IUser extends Document {
  username: string;
  email: string;
  bio?: string;
  pfpSrc?: string;
  hashedPassword: string;
}

const userSchema = new Schema<IUser>(
  {
    username: {type: String, required: true},
    email: {type: String, required: true},
    bio: {type: String},
    pfpSrc: {type: String},
    hashedPassword: {type: String, required: true, select: false}
  }, 
  {timestamps: true}
);

export default mongoose.model<IUser>('User', userSchema);
