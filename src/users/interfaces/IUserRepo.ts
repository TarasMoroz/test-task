import { IUserEntity } from './IUserEntity'

export interface IUserRepo {
    getOne : (userId : string) => Promise<null|IUserEntity>,
    getCollection : (filters : {}) => Promise<Array<IUserEntity>>,
    insertOne : (item : {}) => Promise<IUserEntity>,
    updateOne : (userId : string, updateData : {}) => Promise<boolean>,
    deleteOne : (userId : string) => Promise<boolean>
}