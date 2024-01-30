import mongoose, {Document} from 'mongoose';
const Schema = mongoose.Schema;

export interface IUser extends Document {
  username: string;
  email: string;
  hashedPassword: string;
}

const userSchema = new Schema<IUser>(
  {
    username: {type: String, required: true},
    email: {type: String, required: true},
    hashedPassword: {type: String, required: true, select: false}
  }, 
  {timestamps: true}
);

export default mongoose.model<IUser>('User', userSchema);
