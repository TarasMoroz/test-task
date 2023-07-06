import { AdminModel } from "../models/AdminModel";
import { adminRepoFake } from "../mocks/adminRepoFake";
import { IAdminRepo } from '../interfaces/IAdminRepo';

const isProduction = process.env["NODE_ENV"] === "production";

export function getAdminRepo(): IAdminRepo {

	return isProduction  
        ? AdminModel
        : adminRepoFake;
        
}