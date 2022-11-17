import Drink, { DrinkTypesAtDatabase, GetDrinksSearch } from "../model/Drink";
import { BaseDatabase } from "./BaseDatabase";

export default class DrinkDatabase extends BaseDatabase {
  public static DRINKS = "drinks";

  public createDrink = async (drink: Drink) => {
    const newDrink: DrinkTypesAtDatabase = {
      drink_id: drink.getId(),
      name: drink.getName(),
      size: drink.getSize(),
      price: drink.getPrice(),
    };
    await BaseDatabase.connections(DrinkDatabase.DRINKS).insert(newDrink);
  };
  public getDrinks = async (input: GetDrinksSearch) => {
    const search = input.search;
    const order = input.order;
    const sort = input.sort;
    const limit = input.limit;
    const offset = input.offset;

    const drinkListAtDb: DrinkTypesAtDatabase[] =
      await BaseDatabase.connections(DrinkDatabase.DRINKS)
        .select()
        .where("name", "LIKE", `%${search}%`)
        .orderBy(order, sort)
        .limit(limit)
        .offset(offset);

    return drinkListAtDb;
  };
  //   public findPizzaById = async (pizza_id: string) => {
  //     const foundPizza: PizzaTypesAtDatabase[] = await BaseDatabase.connections(
  //       PizzaDatabase.PIZZAS
  //     )
  //       .select()
  //       .where({ pizza_id });

  //     return foundPizza[0];
  //   };
  //   public editPizza = async (pizza: Pizza) => {
  //     const updatedPizza: PizzaTypesAtDatabase = {
  //       pizza_id: pizza.getId(),
  //       name: pizza.getName(),
  //       description: pizza.getDescription(),
  //       additional_price: pizza.getAdditionalPrice(),
  //     };

  //     await BaseDatabase.connections(PizzaDatabase.PIZZAS)
  //       .update(updatedPizza)
  //       .where({ pizza_id: updatedPizza.pizza_id });
  //   };
  //   public deletePizza = async (pizza: Pizza) => {
  //     const deletedPizza: PizzaTypesAtDatabase = {
  //       pizza_id: pizza.getId(),
  //       name: pizza.getName(),
  //       description: pizza.getDescription(),
  //       additional_price: pizza.getAdditionalPrice(),
  //     };

  //     await BaseDatabase.connections(PizzaDatabase.PIZZAS)
  //       .delete()
  //       .where({ pizza_id: deletedPizza.pizza_id });
  //   };
}
