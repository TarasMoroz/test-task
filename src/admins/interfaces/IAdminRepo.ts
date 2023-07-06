import { IAdminEntity } from './IAdminEntity'

export interface IAdminSearchOne {
    _id? : string,
    login? : string,
    refreshToken? : string
}

export interface IAdminRepo {
    getOne : (searchOne : IAdminSearchOne) => Promise<null|IAdminEntity>,
    getCollection : (filters : {}) => Promise<Array<IAdminEntity>>,
    insertOne : (item : {}) => Promise<IAdminEntity>,
    updateOne : (adminId : string, updateData : {[key: string]: string}) => Promise<boolean>,
    deleteOne : (adminId : string) => Promise<boolean>
}