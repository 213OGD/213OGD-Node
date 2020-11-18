import { Request, Response } from 'express';
import FilesModel from '../models/FileModels';

export default {
  create: async (req: Request, res: Response): Promise<void> => {
    await FilesModel.init();
    const file = new FilesModel(req.body);
    const result = await file.save();
    res.json({ success: true });
  },
};
