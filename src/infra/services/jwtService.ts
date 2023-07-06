import jwt, {verify, Secret, JwtPayload } from 'jsonwebtoken';
import { Request } from 'express';

export const SECRET_KEY = process.env.JWT_SECRET || "";

export interface CustomRequest extends Request {
 token: string | JwtPayload;
}

export function signJwt(payload : object, lifetime : string = '1h' ) : string 
{
    return jwt.sign(payload, SECRET_KEY, {
        expiresIn: lifetime
    });
}

export function decodeJwt(token: string) : string | JwtPayload
{
    return verify(token, SECRET_KEY);
}

export function getRefreshToken()
{
    return getRandomString(16);
}

function getRandomString(length : number) : string {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}