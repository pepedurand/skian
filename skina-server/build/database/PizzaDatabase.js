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
Object.defineProperty(exports, "__esModule", { value: true });
const BaseDatabase_1 = require("./BaseDatabase");
class PizzaDatabase extends BaseDatabase_1.BaseDatabase {
    constructor() {
        super(...arguments);
        this.createPizza = (pizza) => __awaiter(this, void 0, void 0, function* () {
            const newPizza = {
                pizza_id: pizza.getId(),
                name: pizza.getName(),
                description: pizza.getDescription(),
                additional_price: pizza.getAdditionalPrice(),
            };
            yield BaseDatabase_1.BaseDatabase.connections(PizzaDatabase.PIZZAS).insert(newPizza);
        });
        this.getPizzas = (input) => __awaiter(this, void 0, void 0, function* () {
            const search = input.search;
            const order = input.order;
            const sort = input.sort;
            const limit = input.limit;
            const offset = input.offset;
            const pizzaListAtDb = yield BaseDatabase_1.BaseDatabase.connections(PizzaDatabase.PIZZAS)
                .select()
                .where("name", "LIKE", `%${search}%`)
                .orderBy(order, sort)
                .limit(limit)
                .offset(offset);
            return pizzaListAtDb;
        });
        this.findPizzaById = (pizza_id) => __awaiter(this, void 0, void 0, function* () {
            const foundPizza = yield BaseDatabase_1.BaseDatabase.connections(PizzaDatabase.PIZZAS)
                .select()
                .where({ pizza_id });
            return foundPizza[0];
        });
        this.editPizza = (pizza) => __awaiter(this, void 0, void 0, function* () {
            const updatedPizza = {
                pizza_id: pizza.getId(),
                name: pizza.getName(),
                description: pizza.getDescription(),
                additional_price: pizza.getAdditionalPrice(),
            };
            yield BaseDatabase_1.BaseDatabase.connections(PizzaDatabase.PIZZAS)
                .update(updatedPizza)
                .where({ pizza_id: updatedPizza.pizza_id });
        });
        this.deletePizza = (pizza) => __awaiter(this, void 0, void 0, function* () {
            const deletedPizza = {
                pizza_id: pizza.getId(),
                name: pizza.getName(),
                description: pizza.getDescription(),
                additional_price: pizza.getAdditionalPrice(),
            };
            yield BaseDatabase_1.BaseDatabase.connections(PizzaDatabase.PIZZAS)
                .delete()
                .where({ pizza_id: deletedPizza.pizza_id });
        });
    }
}
exports.default = PizzaDatabase;
PizzaDatabase.PIZZAS = "pizzas";
