import { Request, Response } from 'express';
import { getErrorMessage } from '../../infra/utils/errors';
import * as adminServices from '../services/adminServices';
import { AdminUpdatePasswordRequest, IAdminUpdatePassword } from '../interfaces/IAdminRequestTypes';
import { CustomRequest } from '../../infra/services/jwtService';


export const updateAdminPassword = async (req : AdminUpdatePasswordRequest<IAdminUpdatePassword>, res: Response) => {
  try {

    console.log(req.body);

    const updatingResult = await adminServices.updatePassword(req.body); // has to be with auth middleware provided

    res.status(200).send({'isUpdated': true});
  } catch (error) {
    return res.status(500).send(getErrorMessage(error));
  }
 };