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
const DrinkDatabase_1 = __importDefault(require("../database/DrinkDatabase"));
const Drink_1 = __importDefault(require("../model/Drink"));
const IdGenerator_1 = require("../services/IdGenerator");
const types_1 = require("../types");
class DrinkBusiness {
    constructor(drinkDatabase, authenticator, idGenerator, hashManager) {
        this.drinkDatabase = drinkDatabase;
        this.authenticator = authenticator;
        this.idGenerator = idGenerator;
        this.hashManager = hashManager;
        this.createDrink = (input) => __awaiter(this, void 0, void 0, function* () {
            const name = input.name;
            const size = input.size;
            const price = input.price;
            const token = input.token;
            if ((name || size || price) === undefined) {
                throw new Error("Por favor, preencha o nome, o tamanho e a preço da bebida.");
            }
            if (!token) {
                throw new Error("Token inválido ou faltando");
            }
            const payload = this.authenticator.getTokenData(token);
            if (!payload) {
                throw new Error("Token inválido");
            }
            if (payload.role !== types_1.UserRole.ADMIN) {
                throw new Error("Apenas admins podem criar drinks");
            }
            const drink_id = new IdGenerator_1.IdGenerator().generateId();
            const newDrink = new Drink_1.default(drink_id, name, size, price);
            const drinkDatabase = new DrinkDatabase_1.default();
            yield drinkDatabase.createDrink(newDrink);
            const response = {
                message: `${name} adicionado com sucesso!`,
                drink_id,
            };
            return response;
        });
        this.getDrinks = (input) => __awaiter(this, void 0, void 0, function* () {
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
            const getDrinksFromDb = {
                search,
                order,
                sort,
                limit,
                offset,
            };
            const drinksList = yield this.drinkDatabase.getDrinks(getDrinksFromDb);
            const drinks = drinksList.map((drinkData) => {
                const drink = new Drink_1.default(drinkData.drink_id, drinkData.name, drinkData.size, drinkData.price);
                const searchResponse = {
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
        });
        this.editDrink = (input) => __awaiter(this, void 0, void 0, function* () {
            const { token, drink_id, name, size, price } = input;
            if (!token) {
                throw new Error("Token inválido ou faltando");
            }
            const payload = this.authenticator.getTokenData(token);
            if (!payload) {
                throw new Error("Token inválido");
            }
            if (payload.role !== types_1.UserRole.ADMIN) {
                throw new Error("Apenas admins podem editar as bebidas");
            }
            if (!drink_id) {
                throw new Error("Favor insira o id da bebida a ser alterada");
            }
            const selectedDrink = yield this.drinkDatabase.findDrinkById(drink_id);
            if (!selectedDrink) {
                throw new Error("Bebida não existe");
            }
            const editedDrink = new Drink_1.default(selectedDrink.drink_id, selectedDrink.name, selectedDrink.size, selectedDrink.price);
            name && editedDrink.setName(name);
            size && editedDrink.setSize(size);
            price && editedDrink.setPrice(price);
            yield this.drinkDatabase.editDrink(editedDrink);
            const response = {
                message: "Edição realizada com sucesso",
            };
            return response;
        });
        this.deleteDrink = (input) => __awaiter(this, void 0, void 0, function* () {
            const { token, drink_id } = input;
            if (!token) {
                throw new Error("Token inválido ou faltando");
            }
            const payload = this.authenticator.getTokenData(token);
            if (!payload) {
                throw new Error("Token inválido");
            }
            if (payload.role !== types_1.UserRole.ADMIN) {
                throw new Error("Apenas admins podem alterar status das bebidas");
            }
            if (!drink_id) {
                throw new Error("Favor insira o id da bebida a ser alterada");
            }
            const selectedDrink = yield this.drinkDatabase.findDrinkById(drink_id);
            if (!selectedDrink) {
                throw new Error("Bebida a ser excluída não existe");
            }
            const deletedDrink = new Drink_1.default(selectedDrink.drink_id, selectedDrink.name, selectedDrink.size, selectedDrink.price);
            yield this.drinkDatabase.deleteDrink(deletedDrink);
            const response = {
                message: "Bebida excluída com sucesso",
            };
            return response;
        });
    }
}
exports.default = DrinkBusiness;
