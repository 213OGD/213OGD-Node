import { File, FileDoc } from '../models/File';

const FileQuery = {
  async files(): Promise<FileDoc[]> {
    const files = await File.find();
    return files;
  },
  async file(id: string): Promise<FileDoc[]> {
    const file = await File.find({ id });
    return file;
  },
};

export default FileQuery;
