import Combo, { ComboTypesAtDatabase, GetCombosSearch } from "../model/Combos";
import { BaseDatabase } from "./BaseDatabase";

export default class ComboDatabase extends BaseDatabase {
  public static COMBOS = "combos";

  public createCombo = async (combo: Combo) => {
    const newCombo: ComboTypesAtDatabase = {
      combo_id: combo.getId(),
      name: combo.getName(),
      description: combo.getDescription(),
      price: combo.getPrice(),
    };
    await BaseDatabase.connections(ComboDatabase.COMBOS).insert(newCombo);
  };
  public getCombo = async (input: GetCombosSearch) => {
    const search = input.search;
    const order = input.order;
    const sort = input.sort;
    const limit = input.limit;
    const offset = input.offset;

    const comboListAtDb: ComboTypesAtDatabase[] =
      await BaseDatabase.connections(ComboDatabase.COMBOS)
        .select()
        .where("name", "LIKE", `%${search}%`)
        .orderBy(order, sort)
        .limit(limit)
        .offset(offset);

    return comboListAtDb;
  };
  public findComboById = async (combo_id: string) => {
    const foundCombo: ComboTypesAtDatabase[] = await BaseDatabase.connections(
      ComboDatabase.COMBOS
    )
      .select()
      .where({ combo_id: combo_id });

    return foundCombo[0];
  };
  public editCombo = async (combo: Combo) => {
    const updatedCombo: ComboTypesAtDatabase = {
      combo_id: combo.getId(),
      name: combo.getName(),
      description: combo.getDescription(),
      price: combo.getPrice(),
    };

    await BaseDatabase.connections(ComboDatabase.COMBOS)
      .update(updatedCombo)
      .where({ combo_id: updatedCombo.combo_id });
  };
  public deleteCombo = async (combo: Combo) => {
    const deletedCombo: ComboTypesAtDatabase = {
      combo_id: combo.getId(),
      name: combo.getName(),
      description: combo.getDescription(),
      price: combo.getPrice(),
    };

    await BaseDatabase.connections(ComboDatabase.COMBOS)
      .delete()
      .where({ combo_id: deletedCombo.combo_id });
  };
}
