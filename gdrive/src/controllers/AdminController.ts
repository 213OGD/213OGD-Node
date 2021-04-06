import { Request, Response } from 'express';
// eslint-disable-next-line import/extensions
import GetGoogleFiles from '../services/fetchDrive';

import FileModels from '../models/FileModels';

export default {
  create: async (req: Request, res: Response): Promise<void> => {
    await FileModels.init();

    // const file = new FileModels(req.body);
    // getGoogleFiles();

    const goo = new GetGoogleFiles().then((result: any) =>
      console.log('res:', result)
    );
    // eslint-disable-next-line no-console
    // console.log(`Received ${file}`);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const result = goo;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    res.json({ success: true, result });
  },
};
