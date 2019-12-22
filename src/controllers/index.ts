import Pets from './PetsController';
import { Request, Response } from 'express';


const genericInvoker = async (controllerName: string, operationId: string, request: Request, response: Response) => {
  if (controllerName === 'pets') {
    await new Pets().genericInvoker(operationId, request, response);
  }
}

export default genericInvoker;