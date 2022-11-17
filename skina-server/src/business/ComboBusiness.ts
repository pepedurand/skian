import ComboDatabase from "../database/ComboDatabase";
import Combo, {
  ComboTypesAtDatabase,
  GetCombos,
  GetCombosSearch,
} from "../model/Combos";
import Authenticator from "../services/Authenticator";
import HashManager from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";
import { ComboRequisitionsParams, UserRole } from "../types";

export default class ComboBusiness {
  constructor(
    protected comboDatabase: ComboDatabase,
    protected authenticator: Authenticator,
    protected idGenerator: IdGenerator,
    protected hashManager: HashManager
  ) {}
  public createCombo = async (input: ComboRequisitionsParams) => {
    const name = input.name;
    const description = input.description;
    const price = input.price;
    const token = input.token;

    if (!name || !description) {
      throw new Error("Por favor, preencha o nome e a descrição do combo.");
    }
    const payload = this.authenticator.getTokenData(token as string);

    if (!payload) {
      throw new Error("Token inválido ou faltando");
    }

    if (payload.role !== UserRole.ADMIN) {
      throw new Error("Apenas admins podem criar combos");
    }

    const combo_id = new IdGenerator().generateId();

    const newCombo = new Combo(combo_id, name, description, price);

    const comboDatabase = new ComboDatabase();
    await comboDatabase.createCombo(newCombo);

    const response = {
      message: `Combo ${name} criada com sucesso!`,
      combo_id: combo_id,
    };

    return response;
  };

  public getCombos = async (input: GetCombos) => {
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

    const getComboFromDb: GetCombosSearch = {
      search,
      order,
      sort,
      limit,
      offset,
    };

    const combosList = await this.comboDatabase.getCombo(getComboFromDb);

    const combos = combosList.map((comboData: ComboTypesAtDatabase) => {
      const combo = new Combo(
        comboData.combo_id,
        comboData.name,
        comboData.description,
        comboData.price
      );

      const searchResponse: ComboTypesAtDatabase = {
        combo_id: combo.getId(),
        name: combo.getName(),
        description: combo.getDescription(),
        price: combo.getPrice(),
      };

      return searchResponse;
    });

    const response = {
      combos: combos,
    };

    return response;
  };
  public editCombo = async (input: ComboRequisitionsParams) => {
    const { token, combo_id, name, description, price } = input;

    if (!token) {
      throw new Error("Token inválido ou faltando");
    }

    const payload = this.authenticator.getTokenData(token);

    if (!payload) {
      throw new Error("Token inválido");
    }

    if (payload.role !== UserRole.ADMIN) {
      throw new Error("Apenas admins podem editar os combos");
    }

    if (!combo_id) {
      throw new Error("Favor insira o id do combo");
    }

    const selectedCombo = await this.comboDatabase.findComboById(combo_id);

    if (!selectedCombo) {
      throw new Error("Combo a ser editado não existe");
    }

    const editedCombo = new Combo(
      selectedCombo.combo_id,
      selectedCombo.name,
      selectedCombo.description,
      selectedCombo.price
    );

    name && editedCombo.setName(name);
    description && editedCombo.setDescription(description);
    price && editedCombo.setPrice(price);

    await this.comboDatabase.editCombo(editedCombo);

    const response = {
      message: "Edição realizada com sucesso",
    };

    return response;
  };
  public deleteCombo = async (input: ComboRequisitionsParams) => {
    const { token, combo_id } = input;

    if (!token) {
      throw new Error("Token inválido ou faltando");
    }

    const payload = this.authenticator.getTokenData(token);

    if (!payload) {
      throw new Error("Token inválido");
    }

    if (payload.role !== UserRole.ADMIN) {
      throw new Error("Apenas admins podem editar status os combos");
    }

    if (!combo_id) {
      throw new Error("Favor insira o id do combo a ser alterada");
    }

    const selectedCombo = await this.comboDatabase.findComboById(combo_id);

    if (!selectedCombo) {
      throw new Error("Combo a ser excluída não existe");
    }

    const deletedCombo = new Combo(
      selectedCombo.combo_id,
      selectedCombo.name,
      selectedCombo.description,
      selectedCombo.price
    );

    await this.comboDatabase.deleteCombo(deletedCombo);

    const response = {
      message: "Combo excluído com sucesso",
    };

    return response;
  };
}
