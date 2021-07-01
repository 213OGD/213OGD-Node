import Tag, { TagDoc } from '../models/Tag';
import { File, FileDoc } from '../models/File';

interface TagInput {
  idFile: string;
  tag: string;
}

interface FileTagDoc {
  file: FileDoc;
  tags: TagDoc[];
}

export const TagQuery = {
  async tags(): Promise<TagDoc[]> {
    const tags = await Tag.find();
    return tags;
  },
};

const TagMutation = {
  async addTag(_: unknown, args: { tagInput: TagInput }): Promise<FileTagDoc> {
    const { idFile, tag } = args.tagInput;

    const file = await File.findOneAndUpdate(
      { _id: idFile },
      { $addToSet: { tags: tag } },
      { new: true }
      //  thow error
    );
    if (file === null) {
      throw new Error('Un problème est survenu');
    }
    const isInTags = await Tag.find({ name: tag });

    if (isInTags.length === 0) {
      const newTag = new Tag({ name: tag });
      await newTag.save();
    }
    const tags = await Tag.find();
    return { file, tags };
  },
  async deleteTag(
    _: unknown,
    args: { tagInput: TagInput }
  ): Promise<FileTagDoc> {
    const { idFile, tag } = args.tagInput;
    const file = await File.findByIdAndUpdate(
      { _id: idFile },
      { $pull: { tags: { $in: [tag] } } },
      { new: true }
    );
    if (file === null) {
      throw new Error('Un problème est survenu');
    }

    const filesWithTag = await File.find({ tags: { $in: [tag] } });
    if (filesWithTag.length === 0) {
      await Tag.deleteOne({ name: tag });
    }
    const tags = await Tag.find();
    return { file, tags };
  },
};
export default TagMutation;

// const TagMutation = {
//   async addTag(
//     _: unknown,
//     args: { tagInput: TagInput }
//   ): Promise<FileDoc | null> {
//     const { idFile, tag } = args.tagInput;
//     const file = await File.findOneAndUpdate(
//       { _id: idFile },
//       { $addToSet: { tags: tag } },
//       { new: true }
//     );
