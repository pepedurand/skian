"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ComboDatabase_1 = __importDefault(require("../database/ComboDatabase"));
const Combos_1 = __importDefault(require("../model/Combos"));
const IdGenerator_1 = require("../services/IdGenerator");
const types_1 = require("../types");
class ComboBusiness {
    constructor(comboDatabase, authenticator, idGenerator, hashManager) {
        this.comboDatabase = comboDatabase;
        this.authenticator = authenticator;
        this.idGenerator = idGenerator;
        this.hashManager = hashManager;
        this.createCombo = (input) => __awaiter(this, void 0, void 0, function* () {
            const name = input.name;
            const description = input.description;
            const price = input.price;
            const token = input.token;
            if (!name || !description) {
                throw new Error("Por favor, preencha o nome e a descrição do combo.");
            }
            const payload = this.authenticator.getTokenData(token);
            if (!payload) {
                throw new Error("Token inválido ou faltando");
            }
            if (payload.role !== types_1.UserRole.ADMIN) {
                throw new Error("Apenas admins podem criar combos");
            }
            const combo_id = new IdGenerator_1.IdGenerator().generateId();
            const newCombo = new Combos_1.default(combo_id, name, description, price);
            const comboDatabase = new ComboDatabase_1.default();
            yield comboDatabase.createCombo(newCombo);
            const response = {
                message: `Combo ${name} criada com sucesso!`,
                combo_id: combo_id,
            };
            return response;
        });
        this.getCombos = (input) => __awaiter(this, void 0, void 0, function* () {
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
            const getComboFromDb = {
                search,
                order,
                sort,
                limit,
                offset,
            };
            const combosList = yield this.comboDatabase.getCombo(getComboFromDb);
            const combos = combosList.map((comboData) => {
                const combo = new Combos_1.default(comboData.combo_id, comboData.name, comboData.description, comboData.price);
                const searchResponse = {
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
        });
        this.editCombo = (input) => __awaiter(this, void 0, void 0, function* () {
            const { token, combo_id, name, description, price } = input;
            if (!token) {
                throw new Error("Token inválido ou faltando");
            }
            const payload = this.authenticator.getTokenData(token);
            if (!payload) {
                throw new Error("Token inválido");
            }
            if (payload.role !== types_1.UserRole.ADMIN) {
                throw new Error("Apenas admins podem editar os combos");
            }
            if (!combo_id) {
                throw new Error("Favor insira o id do combo");
            }
            const selectedCombo = yield this.comboDatabase.findComboById(combo_id);
            if (!selectedCombo) {
                throw new Error("Combo a ser editado não existe");
            }
            const editedCombo = new Combos_1.default(selectedCombo.combo_id, selectedCombo.name, selectedCombo.description, selectedCombo.price);
            name && editedCombo.setName(name);
            description && editedCombo.setDescription(description);
            price && editedCombo.setPrice(price);
            yield this.comboDatabase.editCombo(editedCombo);
            const response = {
                message: "Edição realizada com sucesso",
            };
            return response;
        });
        this.deleteCombo = (input) => __awaiter(this, void 0, void 0, function* () {
            const { token, combo_id } = input;
            if (!token) {
                throw new Error("Token inválido ou faltando");
            }
            const payload = this.authenticator.getTokenData(token);
            if (!payload) {
                throw new Error("Token inválido");
            }
            if (payload.role !== types_1.UserRole.ADMIN) {
                throw new Error("Apenas admins podem editar status os combos");
            }
            if (!combo_id) {
                throw new Error("Favor insira o id do combo a ser alterada");
            }
            const selectedCombo = yield this.comboDatabase.findComboById(combo_id);
            if (!selectedCombo) {
                throw new Error("Combo a ser excluída não existe");
            }
            const deletedCombo = new Combos_1.default(selectedCombo.combo_id, selectedCombo.name, selectedCombo.description, selectedCombo.price);
            yield this.comboDatabase.deleteCombo(deletedCombo);
            const response = {
                message: "Combo excluído com sucesso",
            };
            return response;
        });
    }
}
exports.default = ComboBusiness;
