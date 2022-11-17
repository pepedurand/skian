export interface PizzaTypesAtDatabase {
  pizza_id: string;
  name: string;
  description: string;
  additional_price: number;
}

export interface GetPizzas {
  token: string | undefined;
  search: string;
  order: string;
  sort: string;
  limit: string;
  page: string;
}

export interface GetPizzasSearch {
  search: string;
  order: string;
  sort: string;
  limit: number;
  offset: number;
}

export default class Pizza {
  constructor(
    private pizza_id: string,
    private name: string,
    private description: string,
    private additional_price: number
  ) {}

  public getId = () => {
    return this.pizza_id;
  };
  public getName = () => {
    return this.name;
  };
  public getDescription = () => {
    return this.description;
  };
  public getAdditionalPrice = () => {
    return this.additional_price;
  };
  public setId = (newId: string) => {
    this.pizza_id = newId;
  };
  public setName = (newName: string) => {
    this.name = newName;
  };
  public setDescription = (newDescription: string) => {
    this.description = newDescription;
  };
  public setAdditionalPrice = (newAdditionalPrice: number) => {
    this.additional_price = newAdditionalPrice;
  };
}
