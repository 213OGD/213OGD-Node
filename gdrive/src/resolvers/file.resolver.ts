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
  /**
   * get all files fron api google drive and update files in mongodb
   *
   * @param {*} _
   * @param {*} __
   * @param {*} context provided from apollo server
   * @return {*}  {Promise<FileDoc[]>}
   */
  async createOrUpdate(
    parent: any,
    args: any,
    context: any
  ): Promise<FileDoc[] | undefined> {
    const user = JSON.parse(context.user);
    if (user.role !== 'teacher') {
      throw Error('unauthorized request');
    }
    try {
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
    } catch (error) {
      console.error('createOrUpdate error', error);
      throw error;
    }
  },
};

export { FileQuery, FileMutation };
