import FileModels from '../models/FileModels';

const FileQuery = {
  async files(): Promise<unknown> {
    const files = await FileModels.find();
    return files;
  },
  async file(id: string): Promise<unknown> {
    const file = await FileModels.find({ id });
    return file;
  },
};

export { FileQuery };
