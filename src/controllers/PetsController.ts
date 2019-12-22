import Controller from './Controller';
import { ResponseDefinition } from './types';
import { Request, Response } from 'express';
import { PetsService, Pet } from '../services/types';
import PetsServiceImpl from '../services/PetsService';

export default class Pets {
  petsService!: PetsService;

  constructor(petsService?: PetsService) {
    if (petsService !== undefined){
      this.petsService = petsService;
    } else {
      this.petsService = new PetsServiceImpl();
    }
  }

  async listPets(request: Request, response: Response) {
    const executeRequest: () => Promise<Pet[]> = async () => {
      return this.petsService.search();
    }
    const wrapResult = (pets: Pet[]): ResponseDefinition => {
      return new ResponseDefinition(pets);
    }
    await Controller.handleRequest(request, response, executeRequest, wrapResult);
  }

  async createPets(request: Request, response: Response) {
    const executeRequest: () => Promise<Pet> = async () => {
      return this.petsService.create();
    }
    const wrapResult = (pet: Pet): ResponseDefinition => {
      return new ResponseDefinition(pet, 201);
    }
    await Controller.handleRequest(request, response, executeRequest, wrapResult);
  }

  async showPetById(request: Request, response: Response) {
    const executeRequest: () => Promise<Pet | undefined> = async () => {
      const id: number = (request as any).openapi.params.id;
      const searchResults: Pet[] = await this.petsService.search(id);
      if (searchResults.length > 0) {
        return searchResults[1];
      } else {
        return undefined;
      }
    }
    const wrapResult = (pet?: Pet): ResponseDefinition => {
      if (pet === undefined) {
        return new ResponseDefinition(undefined, 404);
      } else {
        return new ResponseDefinition(pet);
      }
    }
    await Controller.handleRequest(request, response, executeRequest, wrapResult);
  }

  async genericInvoker(operationId: string, request: Request, response: Response) {
    if (operationId === 'listPets') {
      await this.listPets(request, response);
    } else if (operationId === 'createPets') {
      await this.createPets(request, response);
    } else if (operationId === 'showPetById') {
      await this.showPetById(request, response);
    }
  }
}
