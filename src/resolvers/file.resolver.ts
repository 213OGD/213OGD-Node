import FileModels from '../models/FileModels';

const FileQuery = {
  async files(): Promise<unknown> {
    const files = await FileModels.find();
    console.log('files', files);
    return files;
  },
  async file(id: string): Promise<unknown> {
    const file = await FileModels.find({ id });
    console.log(file);
    return file;
  },
};

export { FileQuery };
