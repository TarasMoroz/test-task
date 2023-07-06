import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import { getUserRepo } from "../services/service-injection-user-repo";

export const UserHandlers = {
  getOne : (req: Request, res: Response) : any => {},
  getCollection : (req: Request, res: Response) : any => {},
  createOne: (req: Request, res: Response) : any => {},
  deleteOne: (req: Request, res: Response) : any => {},
  updateOne: (req: Request, res: Response) : any => {}
};

const UserModel = getUserRepo();

const errorScheme = (errorCode: number, errorMessage: string) => {
  return {
    errorCode: errorCode,
    message: errorMessage
  }
}

// Update item
UserHandlers.updateOne = async (req, res) => {

  let userId = req?.params?.userId ?? null;
  const updateData = req.body;

  if(userId === null){
    res.status(400).json(errorScheme(1, 'The id should be passed'));
    return;
  }

  if( ! ObjectId.isValid(userId)){
    res.status(400).json(errorScheme(2, `Incorrect ID value: ${userId}`));
    return;
  }

  await UserModel.updateOne(userId, updateData).then(result => {

    result === true 
      ? res.json({isUpdated: true, id: userId})
      : res.status(400).json(errorScheme(3, `Changes not saved, ID: ${userId}`));

  }).catch(err => {

    res.status(500).send(err);

  });

};

// Delete one 
UserHandlers.deleteOne = async (req, res) => {

  let userId = req?.params?.userId ?? null;

  if(userId === null){
    res.status(400).send('The id should be passed');
    return;
  }

  if( ! ObjectId.isValid(userId)){
    res.status(400).send(`Incorrect ID value: ${userId}`);
    return;
  }

  await UserModel.deleteOne(userId).then(result => {

    result === true 
      ? res.send({isDeleted: true, id: userId})
      : res.status(400).send(`The item is not deleted, ID: ${userId}`);

  }).catch(err => {

    res.status(500).send(err);

  });

};

// Create one
UserHandlers.createOne = async (req, res) => {

  const item = req.body;

  UserModel.insertOne(item).then( result => {

    res.status(201).send(item);

  }).catch(err => {

    console.log(err);

    res.status(500).json({error: 'Could not create a new user'});

  });

};

// Display one.
UserHandlers.getOne = async (req, res) => {

  let userId = req?.params?.userId ?? null;
  // let someUser = UserModel.getOne(userId);

  if(userId === null){
    res.status(400).json(errorScheme(0, 'The id should be passed'));
    return;
  }

  if( ! ObjectId.isValid(userId)){
    res.status(400).json(errorScheme(1, `Incorrect ID value: ${userId}`));
    return;
  }

  await UserModel.getOne(userId).then((data) => {

    if(Object.is(data,null)){
      res.status(400).json(errorScheme(2, `The user was not found in database with provided ID: ${userId}`));
      return;
    }
    
    res.send(data);

  }).catch((err) => {

    console.log(err);

    res.status(500).send(err);

  });

};

// Users list
UserHandlers.getCollection = async (req, res) => {
  
  // let filters = { email: { $regex: /^email1/ }};

  let filters = {}; // here could be implemented filters recieving, validating and converting to mongo style
  
  await UserModel.getCollection(filters).then((data) => {
    
    res.send(data);

  }).catch((err) => {

    res.status(500).send(err);

  });

};