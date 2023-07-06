import { ObjectId } from 'mongodb';
import { dbInstance } from '../../infra/dbClient';
import { IUserRepo } from '../interfaces/IUserRepo';
import { IUserEntity } from '../interfaces/IUserEntity';

export const UserModel : IUserRepo = {
    getOne : async (userId : string) : Promise<IUserEntity> => {

        let db = await dbInstance.client();
        let user = await db.collection('users').findOne({_id: new ObjectId(userId)});

        return user;
    },
    getCollection: async (filters : {}) : Promise<Array<IUserEntity>> => {
        
        let db = await dbInstance.client();
        const data = await db.collection('users').find(filters).toArray();

        return data;
    },
    insertOne : async (item : {}) : Promise<IUserEntity> => { 
        
        let db = await dbInstance.client();
        let result = await db.collection('users').insertOne(item);

        return result;
    },
    deleteOne : async (userId : string) : Promise<boolean> => {

        let db = await dbInstance.client();
        let deletingResult = await db.collection('users').deleteOne({_id: new ObjectId(userId)});

        return deletingResult.deletedCount === 1 ? true : false ;

    },
    updateOne : async (userId : string, updateData : {}) : Promise<boolean> => {

        let db = await dbInstance.client();
        let updatingResult = await db.collection('users').updateOne({_id: new ObjectId(userId)}, {$set: updateData});

        // updatingResult.matchedCount // how much items under current condition found
        // updatingResult.modifiedCount // how much items modified via quuery
        return updatingResult.modifiedCount === 1 ? true : false ;
    }
};