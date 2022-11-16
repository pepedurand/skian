import Pizza, { GetPizzasSearch, PizzaTypesAtDatabase } from "../model/Pizza";
import { BaseDatabase } from "./BaseDatabase";

export default class PizzaDatabase extends BaseDatabase {
  public static PIZZAS = "pizzas";

  public createPizza = async (pizza: Pizza) => {
    const newPizza: PizzaTypesAtDatabase = {
      pizza_id: pizza.getId(),
      name: pizza.getName(),
      description: pizza.getDescription(),
      additional_price: pizza.getAdditionalPrice(),
    };
    await BaseDatabase.connections(PizzaDatabase.PIZZAS).insert(newPizza);
  };
  public getPizzas = async (input: GetPizzasSearch) => {
    const search = input.search;
    const order = input.order;
    const sort = input.sort;
    const limit = input.limit;
    const offset = input.offset;

    const pizzaListAtDb: PizzaTypesAtDatabase[] =
      await BaseDatabase.connections(PizzaDatabase.PIZZAS)
        .select()
        .where("name", "LIKE", `%${search}%`)
        .orderBy(order, sort)
        .limit(limit)
        .offset(offset);

    return pizzaListAtDb;
  };
  public findPizzaById = async (pizza_id: string) => {
    const foundPizza: PizzaTypesAtDatabase[] = await BaseDatabase.connections(
      PizzaDatabase.PIZZAS
    )
      .select()
      .where({ pizza_id });

    return foundPizza[0];
  };
  public editPizza = async (pizza: Pizza) => {
    const updatedPizza: PizzaTypesAtDatabase = {
      pizza_id: pizza.getId(),
      name: pizza.getName(),
      description: pizza.getDescription(),
      additional_price: pizza.getAdditionalPrice(),
    };

    await BaseDatabase.connections(PizzaDatabase.PIZZAS)
      .update(updatedPizza)
      .where({ pizza_id: updatedPizza.pizza_id });
  };
}
