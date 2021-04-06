import { File, FileDoc } from '../models/File';

interface TagInput {
  idFile: string;
  tag: string;
}

const TagMutation = {
  async addTag(
    _: unknown,
    args: { tagInput: TagInput }
  ): Promise<FileDoc | null> {
    const { idFile, tag } = args.tagInput;
    const file = await File.findOneAndUpdate(
      { id: idFile },
      { $addToSet: { tags: tag } },
      { new: true }
    );
    return file;
  },
  async deleteTag(
    _: unknown,
    args: { tagInput: TagInput }
  ): Promise<FileDoc | null> {
    const { idFile, tag } = args.tagInput;
    const deleteTag = await File.findByIdAndUpdate(
      { id: idFile },
      { $pull: { tags: { $in: [tag] } } },
      { multi: true, new: true }
    );
    return deleteTag;
  },
};
export default TagMutation;
