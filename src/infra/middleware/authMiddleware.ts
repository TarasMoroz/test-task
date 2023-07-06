import { Request, Response, NextFunction } from 'express';
import {CustomRequest, decodeJwt } from '../services/jwtService';

export const auth = async (req: Request, res: Response, next: NextFunction) => {
 try {
   const token = req.header('Authorization')?.replace('Bearer ', '');

   if (!token) {
     throw new Error('No auth provided');
   }

   const decoded = decodeJwt(token);
   (req as CustomRequest).token = decoded;

   next();

 } catch (err) {
   
    res.status(401).send('Please authenticate');

 }
 
};