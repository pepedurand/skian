import PizzaDatabase from "../database/PizzaDatabase";
import Pizza, {
  GetPizzas,
  GetPizzasSearch,
  PizzaTypesAtDatabase,
} from "../model/Pizza";
import Authenticator from "../services/Authenticator";
import HashManager from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";
import { PizzaRequisitionParams, UserRole } from "../types";

export default class PizzaBusiness {
  constructor(
    protected pizzaDatabase: PizzaDatabase,
    protected authenticator: Authenticator,
    protected idGenerator: IdGenerator,
    protected hashManager: HashManager
  ) {}
  public createPizza = async (input: PizzaRequisitionParams) => {
    const name = input.name;
    const description = input.description;
    const additional_price = input.additional_price;
    const token = input.token;

    if (!name || !description) {
      throw new Error("Por favor, preencha o sabor e a descrição da pizza.");
    }
    const payload = this.authenticator.getTokenData(token as string);

    if (!payload) {
      throw new Error("Token inválido ou faltando");
    }

    if (payload.role !== UserRole.ADMIN) {
      throw new Error("Apenas admins podem criar pizzas");
    }

    const pizza_id = new IdGenerator().generateId();

    const newPizza = new Pizza(pizza_id, name, description, additional_price);

    const pizzaDatabase = new PizzaDatabase();
    await pizzaDatabase.createPizza(newPizza);

    const response = {
      message: `Pizza de ${name} criada com sucesso!`,
      pizza_id,
    };

    return response;
  };

  public getPizzas = async (input: GetPizzas) => {
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

    const getPizzasFromDb: GetPizzasSearch = {
      search,
      order,
      sort,
      limit,
      offset,
    };

    const pizzasList = await this.pizzaDatabase.getPizzas(getPizzasFromDb);

    const pizzas = pizzasList.map((pizzaData: PizzaTypesAtDatabase) => {
      const pizza = new Pizza(
        pizzaData.pizza_id,
        pizzaData.name,
        pizzaData.description,
        pizzaData.additional_price
      );

      const searchResponse: PizzaTypesAtDatabase = {
        pizza_id: pizza.getId(),
        name: pizza.getName(),
        description: pizza.getDescription(),
        additional_price: pizza.getAdditionalPrice(),
      };

      return searchResponse;
    });

    const response = {
      pizzas,
    };

    return response;
  };
  public editPizza = async (input: PizzaRequisitionParams) => {
    const { token, pizza_id, name, description, additional_price } = input;

    if (!token) {
      throw new Error("Token inválido ou faltando");
    }

    const payload = this.authenticator.getTokenData(token);

    if (!payload) {
      throw new Error("Token inválido");
    }

    if (payload.role !== UserRole.ADMIN) {
      throw new Error("Apenas admins podem alterar status das pizzas");
    }

    if (!pizza_id) {
      throw new Error("Favor insira o id da pizza a ser alterada");
    }

    const selectedPizza = await this.pizzaDatabase.findPizzaById(pizza_id);

    if (!selectedPizza) {
      throw new Error("Pizza a ser editada não existe");
    }

    const editedPizza = new Pizza(
      selectedPizza.pizza_id,
      selectedPizza.name,
      selectedPizza.description,
      selectedPizza.additional_price
    );

    name && editedPizza.setName(name);
    description && editedPizza.setDescription(description);
    additional_price && editedPizza.setAdditionalPrice(additional_price);

    await this.pizzaDatabase.editPizza(editedPizza);

    const response = {
      message: "Edição realizada com sucesso",
    };

    return response;
  };
  public deletePizza = async (input: PizzaRequisitionParams) => {
    const { token, pizza_id } = input;

    if (!token) {
      throw new Error("Token inválido ou faltando");
    }

    const payload = this.authenticator.getTokenData(token);

    if (!payload) {
      throw new Error("Token inválido");
    }

    if (payload.role !== UserRole.ADMIN) {
      throw new Error("Apenas admins podem alterar status das pizzas");
    }

    if (!pizza_id) {
      throw new Error("Favor insira o id da pizza a ser alterada");
    }

    const selectedPizza = await this.pizzaDatabase.findPizzaById(pizza_id);

    if (!selectedPizza) {
      throw new Error("Pizza a ser excluída não existe");
    }

    const deletedPizza = new Pizza(
      selectedPizza.pizza_id,
      selectedPizza.name,
      selectedPizza.description,
      selectedPizza.additional_price
    );

    await this.pizzaDatabase.deletePizza(deletedPizza);

    const response = {
      message: "Pizza excluída com sucesso",
    };

    return response;
  };
}
