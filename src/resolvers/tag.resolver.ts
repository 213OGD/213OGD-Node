/* eslint-disable import/prefer-default-export */
import FileModels, { Ifile } from '../models/FileModels';

interface TagInput {
  idFile: string;
  tag: string;
}

const TagMutation = {
  async addTag(
    _: unknown,
    args: { tagInput: TagInput }
  ): Promise<Ifile | null> {
    const { idFile, tag } = args.tagInput;
    const file = await FileModels.findOneAndUpdate(
      // eslint-disable-next-line no-underscore-dangle
      { _id: idFile },
      { $addToSet: { tags: tag } },
      { new: true }
    );
    return file;
  },
  async deleteTag(
    _: unknown,
    args: { tagInput: TagInput }
  ): Promise<Ifile | null> {
    const { idFile, tag } = args.tagInput;
    const deleteTag = await FileModels.findByIdAndUpdate(
      { _id: idFile },
      { $pull: { tags: { $in: [tag] } } },
      { multi: true, new: true }
    );
    return deleteTag;
  },
};
export default TagMutation;
