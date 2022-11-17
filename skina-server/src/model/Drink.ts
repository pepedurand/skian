export interface DrinkTypesAtDatabase {
  drink_id: string;
  name: string;
  size: string;
  price: number;
}

export default class Drink {
  constructor(
    private drink_id: string,
    private name: string,
    private size: string,
    private price: number
  ) {}

  public getId = () => {
    return this.drink_id;
  };
  public getName = () => {
    return this.name;
  };
  public getSize = () => {
    return this.size;
  };
  public getPrice = () => {
    return this.price;
  };
  public setId = (newId: string) => {
    this.drink_id = newId;
  };
  public setName = (newName: string) => {
    this.name = newName;
  };
  public setSize = (newSize: string) => {
    this.size = newSize;
  };
  public setPrice = (newPrice: number) => {
    this.price = newPrice;
  };
}
