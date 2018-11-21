import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export interface IExampleModel extends mongoose.Document {
  name: string;
};

const schema = new Schema({
  name: String
});

export const Example = mongoose.model<IExampleModel>("Example", schema);