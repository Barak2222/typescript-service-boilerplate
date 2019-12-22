

export interface Pet {
    id: number,
    name: string
}

export interface PetsService {
    create(): Promise<Pet>
    search(id?: number): Promise<Pet[]>
}