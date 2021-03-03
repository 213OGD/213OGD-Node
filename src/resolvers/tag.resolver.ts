/* eslint-disable import/prefer-default-export */
import FileModels from '../models/FileModels';

interface FileInput extends Document {
  file: {
    _id: string;
    tags: string[];
  };
}

const TagMutation = {
  async updateTag(_: unknown, args: FileInput): Promise<any> {
    const { file } = args;
    console.log(file._id);
    const updatedTag = await FileModels.findOneAndUpdate(
      { _id: file._id },
      { tags: file.tags }
    );
    console.log(updatedTag);
    //console.log('updateTag => ', updatedTag); 
    // eslint-disable-next-line no-console
    return updatedTag;
  },
};
export { TagMutation };
