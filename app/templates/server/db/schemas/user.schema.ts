import { Schema, model, Document } from 'mongoose';

export const UserSchema = new Schema(
  {
    nickname: { type: String, required: false },
    avatarUrl: { type: String, required: false },
    email: { type: String, required: true },
    phone: { type: String, required: false },
    gender: { type: String, required: false },
    password: { type: String, required: true },
    status: { type: String, required: false },
  },
  {
    toObject: {
      transform(doc, ret) {
        delete ret.__v;
      },
    },
  },
);

export interface IUserMember extends Document {
  nickname?: string;
  avatarUrl?: string;
  email?: string;
  phone?: string;
  gender?: string;
  password?: string;
  status?: string;
}

const UserModel = model<IUserMember>('user', UserSchema);

export default UserModel;
