export interface IAdminEntity {
    _id: string,
    login: string,
    hash: string,
    refreshToken: string
}

export const AllowedFields = [
    '_id', 'login'
];