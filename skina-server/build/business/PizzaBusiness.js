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
const PizzaDatabase_1 = __importDefault(require("../database/PizzaDatabase"));
const Pizza_1 = __importDefault(require("../model/Pizza"));
const IdGenerator_1 = require("../services/IdGenerator");
const types_1 = require("../types");
class PizzaBusiness {
    constructor(pizzaDatabase, authenticator, idGenerator, hashManager) {
        this.pizzaDatabase = pizzaDatabase;
        this.authenticator = authenticator;
        this.idGenerator = idGenerator;
        this.hashManager = hashManager;
        this.createPizza = (input) => __awaiter(this, void 0, void 0, function* () {
            const name = input.name;
            const description = input.description;
            const additional_price = input.additional_price;
            const token = input.token;
            if (!name || !description) {
                throw new Error("Por favor, preencha o sabor e a descrição da pizza.");
            }
            const payload = this.authenticator.getTokenData(token);
            if (!payload) {
                throw new Error("Token inválido ou faltando");
            }
            if (payload.role !== types_1.UserRole.ADMIN) {
                throw new Error("Apenas admins podem criar pizzas");
            }
            const pizza_id = new IdGenerator_1.IdGenerator().generateId();
            const newPizza = new Pizza_1.default(pizza_id, name, description, additional_price);
            const pizzaDatabase = new PizzaDatabase_1.default();
            yield pizzaDatabase.createPizza(newPizza);
            const response = {
                message: `Pizza de ${name} criada com sucesso!`,
                pizza_id,
            };
            return response;
        });
        this.getPizzas = (input) => __awaiter(this, void 0, void 0, function* () {
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
            const getPizzasFromDb = {
                search,
                order,
                sort,
                limit,
                offset,
            };
            const pizzasList = yield this.pizzaDatabase.getPizzas(getPizzasFromDb);
            const pizzas = pizzasList.map((pizzaData) => {
                const pizza = new Pizza_1.default(pizzaData.pizza_id, pizzaData.name, pizzaData.description, pizzaData.additional_price);
                const searchResponse = {
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
        });
        this.editPizza = (input) => __awaiter(this, void 0, void 0, function* () {
            const { token, pizza_id, name, description, additional_price } = input;
            if (!token) {
                throw new Error("Token inválido ou faltando");
            }
            const payload = this.authenticator.getTokenData(token);
            if (!payload) {
                throw new Error("Token inválido");
            }
            if (payload.role !== types_1.UserRole.ADMIN) {
                throw new Error("Apenas admins podem alterar status das pizzas");
            }
            if (!pizza_id) {
                throw new Error("Favor insira o id da pizza a ser alterada");
            }
            const selectedPizza = yield this.pizzaDatabase.findPizzaById(pizza_id);
            if (!selectedPizza) {
                throw new Error("Pizza a ser editada não existe");
            }
            const editedPizza = new Pizza_1.default(selectedPizza.pizza_id, selectedPizza.name, selectedPizza.description, selectedPizza.additional_price);
            name && editedPizza.setName(name);
            description && editedPizza.setDescription(description);
            additional_price && editedPizza.setAdditionalPrice(additional_price);
            yield this.pizzaDatabase.editPizza(editedPizza);
            const response = {
                message: "Edição realizada com sucesso",
            };
            return response;
        });
        this.deletePizza = (input) => __awaiter(this, void 0, void 0, function* () {
            const { token, pizza_id } = input;
            if (!token) {
                throw new Error("Token inválido ou faltando");
            }
            const payload = this.authenticator.getTokenData(token);
            if (!payload) {
                throw new Error("Token inválido");
            }
            if (payload.role !== types_1.UserRole.ADMIN) {
                throw new Error("Apenas admins podem alterar status das pizzas");
            }
            if (!pizza_id) {
                throw new Error("Favor insira o id da pizza a ser alterada");
            }
            const selectedPizza = yield this.pizzaDatabase.findPizzaById(pizza_id);
            if (!selectedPizza) {
                throw new Error("Pizza a ser excluída não existe");
            }
            const deletedPizza = new Pizza_1.default(selectedPizza.pizza_id, selectedPizza.name, selectedPizza.description, selectedPizza.additional_price);
            yield this.pizzaDatabase.deletePizza(deletedPizza);
            const response = {
                message: "Pizza excluída com sucesso",
            };
            return response;
        });
    }
}
exports.default = PizzaBusiness;
