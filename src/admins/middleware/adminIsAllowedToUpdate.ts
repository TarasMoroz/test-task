import { Request, Response, NextFunction } from 'express';


export const isAllowedToUpdate = async (req: Request, res: Response, next: NextFunction) => {
 try {

   const isValidated = true;

   if (!isValidated) {
     throw new Error('Validation error description');
   }

   next();

 } catch (err) {
   
    res.status(400).send('Validation error');

 }
 
};