export interface ComboTypesAtDatabase {
  combo_id: string;
  name: string;
  description: string;
  price: number;
}

export interface GetCombos {
  token: string | undefined;
  search: string;
  order: string;
  sort: string;
  limit: string;
  page: string;
}

export interface GetCombosSearch {
  search: string;
  order: string;
  sort: string;
  limit: number;
  offset: number;
}
export default class Combo {
  constructor(
    private combo_id: string,
    private name: string,
    private description: string,
    private price: number
  ) {}

  public getId = () => {
    return this.combo_id;
  };
  public getName = () => {
    return this.name;
  };
  public getDescription = () => {
    return this.description;
  };
  public getPrice = () => {
    return this.price;
  };
  public setId = (newId: string) => {
    this.combo_id = newId;
  };
  public setName = (newName: string) => {
    this.name = newName;
  };
  public setDescription = (newDescription: string) => {
    this.description = newDescription;
  };
  public setPrice = (newPrice: number) => {
    this.price = newPrice;
  };
}
