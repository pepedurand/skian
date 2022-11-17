import DrinkDatabase from "../database/DrinkDatabase";
import Drink from "../model/Drink";
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
}
