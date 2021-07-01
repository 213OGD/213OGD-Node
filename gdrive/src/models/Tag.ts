/* eslint-disable @typescript-eslint/no-empty-interface */
import mongoose from 'mongoose';

export interface TagDoc extends mongoose.Document {
  name: string;
}

interface TagModel extends mongoose.Model<TagDoc> {}

const TagsSchema = new mongoose.Schema({
  name: { type: String, required: true },
});

const Tag = mongoose.model<TagDoc, TagModel>('Tag', TagsSchema);

export default Tag;
