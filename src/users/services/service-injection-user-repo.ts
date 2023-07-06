import { UserModel } from "../models/UserModel";
import { userRepoFake } from "../mocks/userRepoFake";
import { IUserRepo } from '../interfaces/IUserRepo';

const isProduction = process.env["NODE_ENV"] === "production";

export function getUserRepo(): IUserRepo {

	return isProduction  
        ? UserModel
        : userRepoFake;
        
}