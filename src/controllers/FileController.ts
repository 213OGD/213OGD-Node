import { Request, Response } from 'express';
import FileModels from '../models/FileModels';

export default {
  create: async (req: Request, res: Response): Promise<void> => {
    await FileModels.init();
    const file = new FileModels(req.body);
    const result = await file.save();
    res.json({ success: true, result });
  },
  read: async (req: Request, res: Response): Promise<void> => {
    const result = await FileModels.find();
    res.json({ success: true, result });
  },
  update: async (req: Request, res: Response): Promise<void> => {
    // eslint-disable-next-line no-underscore-dangle
    const result = await FileModels.updateOne({ _id: req.body._id }, req.body);
    res.json({ success: true, result });
  },
  delete: async (req: Request, res: Response): Promise<void> => {
    // eslint-disable-next-line no-underscore-dangle
    const result = await FileModels.deleteOne({ _id: req.body._id });
    res.json({ success: true, result });
  },
};
