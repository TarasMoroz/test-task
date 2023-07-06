import { IUserRepo } from '../interfaces/IUserRepo';
import { IUserEntity } from '../interfaces/IUserEntity';

export const userItemMock : IUserEntity = {
    _id: "648ad57897637be44fd7d6b0",
    name: "Vasya_fake",
    email: "email1@test.com",
    token: "",
    refreshToken: ""
};

export const usersListMock : Array<IUserEntity> = [
    { "_id": "648ad57897637be44fd7d6b0", "name": "Vasya_fake_list", "email": "email1@test.com", "token": "", "refreshToken": "" },
    { "_id": "648ad57897637be44fd7d6b1", "name": "Petro_fake_list", "email": "email2@test.com", "token": "", "refreshToken": "" },
    { "_id": "648ad57897637be44fd7d6b2", "name": "Kostya_fake_list" , "email": "email3@test.com", "token": "", "refreshToken": "" }
];

export const userRepoFake : IUserRepo = {

    getOne : async (userId : string) : Promise<null|IUserEntity> => {

        return Promise.resolve(userId === userItemMock._id ? userItemMock : null);

    },
    getCollection: async (filters : {}) : Promise<Array<IUserEntity>> => {

        return Promise.resolve(usersListMock);

    },
    insertOne : async (item : {}) : Promise<IUserEntity> => {

        return Promise.resolve(userItemMock);
    },
    deleteOne : async (userId : string) : Promise<boolean> => {

        return Promise.resolve(true);

    },
    updateOne : async (userId : string, updateData : {}) : Promise<boolean> => {

        return Promise.resolve(true);
    }
};