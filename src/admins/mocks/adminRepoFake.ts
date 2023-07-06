import { IAdminRepo, IAdminSearchOne } from '../interfaces/IAdminRepo';
import { IAdminEntity } from '../interfaces/IAdminEntity';
import * as encryptService from '../../infra/services/encryptionService';

const defaultPassword: string = process.env['ADMIN_PASS'] || ''; 

export const adminItemMock : IAdminEntity = {
    _id: "648ad57897637be44fd7d6b0",
    login: "adminlogin",
    hash: encryptService.performPasswordHash(defaultPassword),
    refreshToken: "sometoken"
};

export const adminsListMock : Array<IAdminEntity> = [adminItemMock];

export const adminRepoFake : IAdminRepo = {

    getOne : async (searchOne : IAdminSearchOne) : Promise<null|IAdminEntity> => {
        
        let isMatched = true;
        (Object.keys(searchOne) as Array<keyof IAdminSearchOne>).forEach((key) => {
            if(searchOne[key] !== adminItemMock[key]) isMatched = false;
        });

        return Promise.resolve(isMatched ? adminItemMock : null);

    },
    getCollection: async (filters : {}) : Promise<Array<IAdminEntity>> => {

        return Promise.resolve(adminsListMock);

    },
    insertOne : async (item : {}) : Promise<IAdminEntity> => {

        return Promise.resolve(adminItemMock);
    },
    deleteOne : async (adminId : string) : Promise<boolean> => {

        return Promise.resolve(true);

    },
    updateOne : async (adminId : string, updateData : {[key: string]: string}) : Promise<boolean> => {

        const mocksIntersectionsKeys = Object.keys(adminItemMock).filter({}.hasOwnProperty.bind(updateData));

        console.log(mocksIntersectionsKeys);
        console.log(updateData);

        // check for correct mock's id and intersection of mock's fields with updating data
        if(adminId === adminItemMock._id &&  mocksIntersectionsKeys.length > 0)
        {
                // emulate update within mock item
            (mocksIntersectionsKeys as Array<keyof IAdminEntity>).forEach((key) => {
                adminItemMock[key] = updateData[key];
            });

            console.log('updated:');
            console.log(adminItemMock);

            return Promise.resolve(true);
        } else {
            return Promise.resolve(false);
        }
    }
};