import FileModels from '../models/FileModels';

export interface Ifile {
  _id: string;
  googleId: string;
  name: string;
  webViewLink: string;
  iconLink: string;
  tags: [string];
}

export default {
  /**
   * TO DO interface file to type the return
   * @param body
   */
  create: async (body: Ifile): Promise<Ifile> => {
    await FileModels.init();
    const file = new FileModels(body);
    const result = await file.save();
    return result;
  },
  read: async (): Promise<Ifile> => {
    const files = await FileModels.find();
    return files;
  },
  update: async (body: Ifile): Promise<Ifile> => {
    // eslint-disable-next-line no-underscore-dangle
    const result = await FileModels.updateOne({ _id: body._id }, body);
    return result;
  },
  delete: async (body: Ifile): Promise<Ifile> => {
    // eslint-disable-next-line no-underscore-dangle
    const result = await FileModels.deleteOne({ _id: body._id });
    return result;
  },
};
