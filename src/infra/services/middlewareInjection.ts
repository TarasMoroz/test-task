import { auth } from "../middleware/authMiddleware";
import { Request, Response, NextFunction } from 'express';

const isProduction = process.env["NODE_ENV"] === "production";

export type TAuthMiddleware = (req: Request, res: Response, next: NextFunction) => void;

export function getAuthMiddleware(): TAuthMiddleware {

	return isProduction  
        ? auth
        : (req: Request, res: Response, next: NextFunction) => { next(); }; // mock for the testing purpose
        
}
