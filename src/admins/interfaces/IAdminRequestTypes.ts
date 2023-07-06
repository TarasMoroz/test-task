import { Request } from "express";

// admin login request
export interface IAdminLogin {
    login: string,
    password: string
}

export interface AdminLoginRequest<IAdminLogin> extends Request {
    body: IAdminLogin
}


// refresh token request
export interface IAdminRefresh {
    refreshToken: string
}

export interface AdminRefreshRequest<IAdminRefresh> extends Request {
    body: IAdminRefresh
}

// update password request
export interface IAdminUpdatePassword {
    _id : string,
    currentPassword : string,
    newPassword : string
}

export interface AdminUpdatePasswordRequest<IAdminUpdatePassword> extends Request {
    body: IAdminUpdatePassword
}