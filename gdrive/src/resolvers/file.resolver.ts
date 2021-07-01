/* eslint-disable @typescript-eslint/no-explicit-any, consistent-return, no-console */
import { File, FileDoc } from '../models/File';
import FetchDrive from '../services/fetchDrive';

const fetchDrive = new FetchDrive();

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

const FileMutation = {
  async createOrUpdate(): Promise<any> {
    const files = await fetchDrive.listFiles();
    files?.forEach(async (file) => {
      const { id, name, webViewLink, iconLink } = file;

      if (id && name && webViewLink && iconLink) {
        await File.updateMany(
          { googleId: id },
          {
            googleId: id,
            name,
            webViewLink,
            iconLink,
          },
          { upsert: true }
        );
      }
    });
    const Files = await File.find();
    return Files;
  },
};

export { FileQuery, FileMutation };
