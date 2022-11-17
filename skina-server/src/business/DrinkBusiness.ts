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
      throw new Error("Apenas admins podem criar drinks");
    }

    const drink_id = new IdGenerator().generateId();

    const newDrink = new Drink(drink_id, name, size, price);

    const drinkDatabase = new DrinkDatabase();
    await drinkDatabase.createDrink(newDrink);

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
  public editDrink = async (input: DrinkRequisitionParams) => {
    const { token, drink_id, name, size, price } = input;

    if (!token) {
      throw new Error("Token inválido ou faltando");
    }

    const payload = this.authenticator.getTokenData(token);

    if (!payload) {
      throw new Error("Token inválido");
    }

    if (payload.role !== UserRole.ADMIN) {
      throw new Error("Apenas admins podem editar as bebidas");
    }

    if (!drink_id) {
      throw new Error("Favor insira o id da bebida a ser alterada");
    }

    const selectedDrink = await this.drinkDatabase.findDrinkById(drink_id);

    if (!selectedDrink) {
      throw new Error("Bebida não existe");
    }

    const editedDrink = new Drink(
      selectedDrink.drink_id,
      selectedDrink.name,
      selectedDrink.size,
      selectedDrink.price
    );

    name && editedDrink.setName(name);
    size && editedDrink.setSize(size);
    price && editedDrink.setPrice(price);

    await this.drinkDatabase.editDrink(editedDrink);

    const response = {
      message: "Edição realizada com sucesso",
    };

    return response;
  };
  public deleteDrink = async (input: DrinkRequisitionParams) => {
    const { token, drink_id } = input;

    if (!token) {
      throw new Error("Token inválido ou faltando");
    }

    const payload = this.authenticator.getTokenData(token);

    if (!payload) {
      throw new Error("Token inválido");
    }

    if (payload.role !== UserRole.ADMIN) {
      throw new Error("Apenas admins podem alterar status das bebidas");
    }

    if (!drink_id) {
      throw new Error("Favor insira o id da bebida a ser alterada");
    }

    const selectedDrink = await this.drinkDatabase.findDrinkById(drink_id);

    if (!selectedDrink) {
      throw new Error("Bebida a ser excluída não existe");
    }

    const deletedDrink = new Drink(
      selectedDrink.drink_id,
      selectedDrink.name,
      selectedDrink.size,
      selectedDrink.price
    );

    await this.drinkDatabase.deleteDrink(deletedDrink);

    const response = {
      message: "Bebida excluída com sucesso",
    };

    return response;
  };
}
