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
      { $addToSet: { tags: tag.toLowerCase() } },
      { new: true }
    );
    if (file === null) {
      throw new Error('Un problème est survenu');
    }
    const isInTags = await Tag.find({ name: tag.toLowerCase() });

    if (isInTags.length === 0) {
      const newTag = new Tag({ name: tag.toLowerCase() });
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
      { $pull: { tags: tag.toLowerCase() } },
      { new: true }
    );
    if (file === null) {
      throw new Error('Un problème est survenu');
    }

    const filesWithTag = await File.find({ tags: tag.toLowerCase() });
    if (filesWithTag.length === 0) {
      await Tag.deleteOne({ name: tag.toLowerCase() });
    }
    const tags = await Tag.find();
    return { file, tags };
  },
};
export default TagMutation;
