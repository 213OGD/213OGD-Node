import FileModels from '../models/FileModels';


const TagMutation = {
    updateTag: async (body): Promise<any> => {
        const updatedTag = await FileModels.updateOne({googleId: body.googleId}, body)
    }
}