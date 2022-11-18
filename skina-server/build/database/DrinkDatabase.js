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
class DrinkDatabase extends BaseDatabase_1.BaseDatabase {
    constructor() {
        super(...arguments);
        this.createDrink = (drink) => __awaiter(this, void 0, void 0, function* () {
            const newDrink = {
                drink_id: drink.getId(),
                name: drink.getName(),
                size: drink.getSize(),
                price: drink.getPrice(),
            };
            yield BaseDatabase_1.BaseDatabase.connections(DrinkDatabase.DRINKS).insert(newDrink);
        });
        this.getDrinks = (input) => __awaiter(this, void 0, void 0, function* () {
            const search = input.search;
            const order = input.order;
            const sort = input.sort;
            const limit = input.limit;
            const offset = input.offset;
            const drinkListAtDb = yield BaseDatabase_1.BaseDatabase.connections(DrinkDatabase.DRINKS)
                .select()
                .where("name", "LIKE", `%${search}%`)
                .orderBy(order, sort)
                .limit(limit)
                .offset(offset);
            return drinkListAtDb;
        });
        this.findDrinkById = (drink_id) => __awaiter(this, void 0, void 0, function* () {
            const foundDrink = yield BaseDatabase_1.BaseDatabase.connections(DrinkDatabase.DRINKS)
                .select()
                .where({ drink_id: drink_id });
            return foundDrink[0];
        });
        this.editDrink = (drink) => __awaiter(this, void 0, void 0, function* () {
            const updatedDrink = {
                drink_id: drink.getId(),
                name: drink.getName(),
                size: drink.getSize(),
                price: drink.getPrice(),
            };
            yield BaseDatabase_1.BaseDatabase.connections(DrinkDatabase.DRINKS)
                .update(updatedDrink)
                .where({ drink_id: updatedDrink.drink_id });
        });
        this.deleteDrink = (drink) => __awaiter(this, void 0, void 0, function* () {
            const deletedDrink = {
                drink_id: drink.getId(),
                name: drink.getName(),
                size: drink.getSize(),
                price: drink.getPrice(),
            };
            yield BaseDatabase_1.BaseDatabase.connections(DrinkDatabase.DRINKS)
                .delete()
                .where({ drink_id: deletedDrink.drink_id });
        });
    }
}
exports.default = DrinkDatabase;
DrinkDatabase.DRINKS = "drinks";
