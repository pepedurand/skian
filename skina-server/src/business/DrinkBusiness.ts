import DrinkDatabase from "../database/DrinkDatabase";
import Drink, {
  DrinkTypesAtDatabase,
  GetDrinks,
  GetDrinksSearch,
} from "../model/Drink";
import Authenticator from "../services/Authenticator";
import HashManager from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";
import { DrinkRequisitionParams, UserRole } from "../types";

export default class DrinkBusiness {
  constructor(
    protected drinkDatabase: DrinkDatabase,
    protected authenticator: Authenticator,
    protected idGenerator: IdGenerator,
    protected hashManager: HashManager
  ) {}
  public createDrink = async (input: DrinkRequisitionParams) => {
    const name = input.name;
    const size = input.size;
    const price = input.price;
    const token = input.token;

    if ((name || size || price) === undefined) {
      throw new Error(
        "Por favor, preencha o nome, o tamanho e a preço da bebida."
      );
    }
    if (!token) {
      throw new Error("Token inválido ou faltando");
    }
    const payload = this.authenticator.getTokenData(token);

    if (!payload) {
      throw new Error("Token inválido");
    }

    if (payload.role !== UserRole.ADMIN) {
      throw new Error("Apenas admins podem criar pizzas");
    }

    const drink_id = new IdGenerator().generateId();

    const newDrink = new Drink(drink_id, name, size, price);

    const pizzaDatabase = new DrinkDatabase();
    await pizzaDatabase.createDrink(newDrink);

    const response = {
      message: `${name} adicionado com sucesso!`,
      drink_id,
    };

    return response;
  };
  public getDrinks = async (input: GetDrinks) => {
    const token = input.token;
    const search = input.search || "";
    const order = input.order || "name";
    const sort = input.sort || "ASC";
    const limit = Number(input.limit) || 10;
    const page = Number(input.page) || 1;

    const offset = limit * (page - 1);

    if (!token) {
      throw new Error("Token faltando");
    }

    const payload = this.authenticator.getTokenData(token);

    if (!payload) {
      throw new Error("Token inválido");
    }

    const getDrinksFromDb: GetDrinksSearch = {
      search,
      order,
      sort,
      limit,
      offset,
    };

    const drinksList = await this.drinkDatabase.getDrinks(getDrinksFromDb);

    const drinks = drinksList.map((drinkData: DrinkTypesAtDatabase) => {
      const drink = new Drink(
        drinkData.drink_id,
        drinkData.name,
        drinkData.size,
        drinkData.price
      );

      const searchResponse: DrinkTypesAtDatabase = {
        drink_id: drink.getId(),
        name: drink.getName(),
        size: drink.getSize(),
        price: drink.getPrice(),
      };

      return searchResponse;
    });

    const response = {
      drinks: drinks,
    };

    return response;
  };
}
