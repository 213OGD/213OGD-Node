import { NextFunction, Request, Response } from 'express';
import FileModels from '../models/FileModels';

export default {
  create: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    await FileModels.init();
    const file = new FileModels(req.body);

    console.log('Received ' + file);
    const result = await file.save();
    res.json({ success: true, result: result });
  },
  read: async (req: Request, res: Response) => {
    const result = await FileModels.find();
    res.json({ success: true, result: result });
  },
};
