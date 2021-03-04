import FileModels, { Ifile } from '../models/FileModels';

const FileQuery = {
  async files(): Promise<Ifile[]> {
    const files = await FileModels.find();
    return files;
  },
  async file(id: string): Promise<Ifile[]> {
    const file = await FileModels.find({ id });
    return file;
  },
};

export default FileQuery;
