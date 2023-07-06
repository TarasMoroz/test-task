import { Request, Response } from 'express';
import { getErrorMessage } from '../../infra/utils/errors';
import * as adminServices from '../services/adminServices';
import { AdminLoginRequest, IAdminLogin, AdminRefreshRequest, IAdminRefresh } from '../interfaces/IAdminRequestTypes';

export const login = async (req: AdminLoginRequest<IAdminLogin>, res: Response) => {
 try {
   const foundAdmin = await adminServices.login(req.body); // ex.: {login: userenteredlogin, password : userenteredpassword}
   res.status(200).send(foundAdmin);
 } catch (error) {
   return res.status(500).send(getErrorMessage(error));
 }
};

export const refresh = async (req: AdminRefreshRequest<IAdminRefresh>, res: Response) => {
  try {
    const foundAdmin = await adminServices.refresh(req.body); // ex.: {login: userenteredlogin, password : userenteredpassword}
    res.status(200).send(foundAdmin);
  } catch (error) {
    return res.status(500).send(getErrorMessage(error));
  }
 };

// TODO: need some review and implementation
// export const register = async (req: Request, res: Response) => {
//  try {
//    await adminServices.register(req.body);
//    res.status(200).send('Inserted successfully');
//  } catch (error) {
//    return res.status(500).send(getErrorMessage(error));
//  }
// };