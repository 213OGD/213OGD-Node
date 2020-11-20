import { Request, Response } from 'express';
// @ts-ignore
import getGoogleFiles from '../services/googleAPI';

import FileModels from '../models/FileModels';

export default {
  create: async (req: Request, res: Response): Promise<void> => {
    await FileModels.init();

    // const file = new FileModels(req.body);
    // getGoogleFiles();

    const goo = getGoogleFiles().then((result: any) =>
      console.log('res:', result)
    );
    // eslint-disable-next-line no-console
    // console.log(`Received ${file}`);
    // @ts-ignore
    const result = goo;
    // @ts-ignore
    res.json({ success: true, result });
  },
};
