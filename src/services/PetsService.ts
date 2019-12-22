import { PetsService, Pet } from "./types";

const pets: Pet[] = [
  {
    id: 1,
    name: "A",
  },
  {
    id: 2,
    name: "B",
  },
]


export default class PetsServiceImpl implements PetsService {
  async search(id?: number): Promise<Pet[]> {
    return new Promise(
      async () => {
        if (id === undefined) {
          return pets;
        } else {
          return pets.filter(pet => pet.id === id);
        }
      },
    );
  }

  /**
   * Creates a new classifier for a given rule
   *
   * ruleUnderscoreid String 
   * classifierInput ClassifierInput 
   * xTENANTID String Tenant header (optional)
   * returns Classifier
   **/
  async create(): Promise<Pet> {
    return new Promise(
      async () => {
        const newPet: Pet = {
          id: Math.floor(Math.random() * (1000)),
          name: 'n' + (Math.floor(Math.random() * (1000))).toString,
        }
        pets.push(newPet);
        return newPet;
      },
    );
  }
}
