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
class ComboDatabase extends BaseDatabase_1.BaseDatabase {
    constructor() {
        super(...arguments);
        this.createCombo = (combo) => __awaiter(this, void 0, void 0, function* () {
            const newCombo = {
                combo_id: combo.getId(),
                name: combo.getName(),
                description: combo.getDescription(),
                price: combo.getPrice(),
            };
            yield BaseDatabase_1.BaseDatabase.connections(ComboDatabase.COMBOS).insert(newCombo);
        });
        this.getCombo = (input) => __awaiter(this, void 0, void 0, function* () {
            const search = input.search;
            const order = input.order;
            const sort = input.sort;
            const limit = input.limit;
            const offset = input.offset;
            const comboListAtDb = yield BaseDatabase_1.BaseDatabase.connections(ComboDatabase.COMBOS)
                .select()
                .where("name", "LIKE", `%${search}%`)
                .orderBy(order, sort)
                .limit(limit)
                .offset(offset);
            return comboListAtDb;
        });
        this.findComboById = (combo_id) => __awaiter(this, void 0, void 0, function* () {
            const foundCombo = yield BaseDatabase_1.BaseDatabase.connections(ComboDatabase.COMBOS)
                .select()
                .where({ combo_id: combo_id });
            return foundCombo[0];
        });
        this.editCombo = (combo) => __awaiter(this, void 0, void 0, function* () {
            const updatedCombo = {
                combo_id: combo.getId(),
                name: combo.getName(),
                description: combo.getDescription(),
                price: combo.getPrice(),
            };
            yield BaseDatabase_1.BaseDatabase.connections(ComboDatabase.COMBOS)
                .update(updatedCombo)
                .where({ combo_id: updatedCombo.combo_id });
        });
        this.deleteCombo = (combo) => __awaiter(this, void 0, void 0, function* () {
            const deletedCombo = {
                combo_id: combo.getId(),
                name: combo.getName(),
                description: combo.getDescription(),
                price: combo.getPrice(),
            };
            yield BaseDatabase_1.BaseDatabase.connections(ComboDatabase.COMBOS)
                .delete()
                .where({ combo_id: deletedCombo.combo_id });
        });
    }
}
exports.default = ComboDatabase;
ComboDatabase.COMBOS = "combos";
