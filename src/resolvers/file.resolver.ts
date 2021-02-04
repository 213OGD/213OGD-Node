import FileModels from '../models/FileModels';
// import { find, filter } from 'lodash';

const FileQuery = {
  getFiles: async (): Promise<any> => {
    const files = await FileModels.find({});
    return files;
  },
  getFile: async (id: string): Promise<any> => {
    const file = await FileModels.find({ id });
    return file;
  },
};

export default FileQuery;
