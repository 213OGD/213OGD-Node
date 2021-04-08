/* eslint-disable @typescript-eslint/no-explicit-any, consistent-return, no-console */
import { File, FileDoc } from '../models/File';

const FileQuery = {
  async files(): Promise<FileDoc[]> {
    const files = await File.find();
    console.log('files', files);
    return files;
  },
  async file(id: string): Promise<FileDoc[]> {
    const file = await File.find({ id });
    console.log('file', file);
    return file;
  },
};

export default FileQuery;
