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
  public findDrinkById = async (drink_id: string) => {
    const foundDrink: DrinkTypesAtDatabase[] = await BaseDatabase.connections(
      DrinkDatabase.DRINKS
    )
      .select()
      .where({ drink_id: drink_id });

    return foundDrink[0];
  };
  public editDrink = async (drink: Drink) => {
    const updatedDrink: DrinkTypesAtDatabase = {
      drink_id: drink.getId(),
      name: drink.getName(),
      size: drink.getSize(),
      price: drink.getPrice(),
    };

    await BaseDatabase.connections(DrinkDatabase.DRINKS)
      .update(updatedDrink)
      .where({ drink_id: updatedDrink.drink_id });
  };
  public deleteDrink = async (drink: Drink) => {
    const deletedDrink: DrinkTypesAtDatabase = {
      drink_id: drink.getId(),
      name: drink.getName(),
      size: drink.getSize(),
      price: drink.getPrice(),
    };

    await BaseDatabase.connections(DrinkDatabase.DRINKS)
      .delete()
      .where({ drink_id: deletedDrink.drink_id });
  };
}
