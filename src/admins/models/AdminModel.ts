import { ObjectId } from 'mongodb';
import { dbInstance } from '../../infra/dbClient';
import { IAdminRepo, IAdminSearchOne } from '../interfaces/IAdminRepo';
import { IAdminEntity } from '../interfaces/IAdminEntity';
import * as encryptService from '../../infra/services/encryptionService';

const defaultPassword: string = process.env['ADMIN_PASS'] || ''; 

export const AdminModel : IAdminRepo = {
    getOne : async (searchOne : IAdminSearchOne) : Promise<null|IAdminEntity> => {

        const serachMongoObj = (searchOne : any) => { 
            if(searchOne._id !== undefined) searchOne._id = new ObjectId(searchOne._id); 
            return searchOne;  
        };

        let db = await dbInstance.client();
        let user = await db.collection('admin').findOne(serachMongoObj(searchOne));

        // initial request... lets fill default hash
        if(user !== null && user.hash === ''){
            user.hash = encryptService.performPasswordHash(defaultPassword);
        }

        // console.log(await db.collection('admins').find({}).toArray());
        console.log('----- found user --------');
        console.log(user);

        return user;
    },
    getCollection: async (filters : {}) : Promise<Array<IAdminEntity>> => {
        
        let db = await dbInstance.client();
        const data = await db.collection('admin').find(filters).toArray();

        return data;
    },
    insertOne : async (item : {}) : Promise<IAdminEntity> => { 
        
        let db = await dbInstance.client();
        let result = await db.collection('admin').insertOne(item);

        return result;
    },
    deleteOne : async (userId : string) : Promise<boolean> => {

        return Promise.resolve(true);

    },
    updateOne : async (userId : string, updateData : {}) : Promise<boolean> => {

        let db = await dbInstance.client();
        let updatingResult = await db.collection('admin').updateOne({_id: new ObjectId(userId)}, {$set: updateData});

        // updatingResult.matchedCount // how much items under current condition found
        // updatingResult.modifiedCount // how much items modified via quuery
        return updatingResult.modifiedCount === 1 ? true : false ;
    }
};