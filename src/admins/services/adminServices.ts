import { getAdminRepo } from './adminRepoInjection';
import * as encryptService from '../../infra/services/encryptionService';
import * as jwtService from '../../infra/services/jwtService';
import { IAdminLogin, IAdminRefresh, IAdminUpdatePassword } from '../interfaces/IAdminRequestTypes';
import { IAdminEntity, AllowedFields } from '../interfaces/IAdminEntity';

const adminRepo = getAdminRepo();

// export async function register(userObject : object): Promise<void> {
//  try {
//    await adminRepo.insertOne(userObject);
//  } catch (error) {
//    throw error;
//  }
// }

const adminEntityMutate = async (adminObj : IAdminEntity, AllowedFields : string[] ) => {

  console.log(adminObj);

  (Object.keys(adminObj) as (keyof typeof adminObj)[]).forEach((key, index) => {

    // here we can extend, filter, reduce ...
    if( ! AllowedFields.includes(key) ) delete adminObj[key];

  });


  return adminObj;
}

export async function login( adminLoginData: IAdminLogin ) {

  try {

    const foundAdmin = await adminRepo.getOne({login : adminLoginData.login});
 
    if (!foundAdmin) { throw new Error('There is no such admin'); }
 
    const isMatch = encryptService.compareHash(adminLoginData.password, foundAdmin.hash);
 
    if (isMatch) {

      const safeAdminObject = await adminEntityMutate(foundAdmin, AllowedFields);

      return { ...await generateTokens(foundAdmin), 'admin': safeAdminObject }; // bearer 1h, refresh 1 day

    } else {

      throw new Error('Password is not correct');

    }

  } catch (error) {
    throw error;
  }
}

export async function refresh(requestData : IAdminRefresh)
{
  try {
    
    if(!requestData.refreshToken) { throw new Error('Please send refreshToken'); }

    let decoded = jwtService.decodeJwt(requestData.refreshToken);

    console.log(decoded);

    // TODO: check for token lifetime

    if(typeof decoded !== 'object')  { throw new Error('Unable to decode passed token'); }

    const foundAdmin = await adminRepo.getOne({refreshToken : decoded.token});
    
    if (!foundAdmin) { throw new Error('Wrong token, admin not found'); }

    return await generateTokens(foundAdmin); // bearer 1h, refresh 1 day
    
  } catch (error) {
    throw error;
  }
}

export async function updatePassword(requestData : IAdminUpdatePassword) 
{
  try {

    console.log(requestData);

    if( requestData.newPassword === undefined || requestData.newPassword.length <= 10) throw new Error('New password should be more than 10 chars');

    const foundAdmin = await adminRepo.getOne({_id : requestData._id});
 
    if ( ! foundAdmin ) { throw new Error('There is no such admin'); }

    console.log(foundAdmin);

    if( ! encryptService.compareHash(requestData.currentPassword, foundAdmin.hash) ) { throw new Error('Password is not correct'); }

    // save the new password hash to DB
    adminRepo.updateOne(foundAdmin._id, {'hash' : encryptService.performPasswordHash(requestData.newPassword)});

    return { 'result': true }
    
  } catch (error) {

    throw error;
    
  }
}

async function generateTokens(foundAdmin: IAdminEntity)
{

  const foundAdminPayload = { _id: foundAdmin._id?.toString(), login: foundAdmin.login };
  const token = jwtService.signJwt(foundAdminPayload, '1h'); // short
  const refreshToken = jwtService.getRefreshToken(); // long
  const encodedRefreshToken = jwtService.signJwt({ token : refreshToken }, '1d'); // long

  // save refresh token to DB
  adminRepo.updateOne(foundAdminPayload._id, {'refreshToken' : refreshToken});

  return { bearer : token , refresh : encodedRefreshToken };

}