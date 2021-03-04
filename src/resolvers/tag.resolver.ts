/* eslint-disable import/prefer-default-export */
import FileModels from '../models/FileModels';

interface FileInput extends Document {
  file: {
    _id: string;
    tags: string[];
  };
}

const TagMutation = {
  async updateTag(_: unknown, args: FileInput): Promise<unknown> {
    const { file } = args;
    const updatedTag = await FileModels.findOneAndUpdate(
      // eslint-disable-next-line no-underscore-dangle
      { _id: file._id },
      { $addToSet: { tags: file.tags } },
      { new: true }
    );
    return updatedTag;
  },
};
export { TagMutation };
