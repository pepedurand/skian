"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Combo {
    constructor(combo_id, name, description, price) {
        this.combo_id = combo_id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.getId = () => {
            return this.combo_id;
        };
        this.getName = () => {
            return this.name;
        };
        this.getDescription = () => {
            return this.description;
        };
        this.getPrice = () => {
            return this.price;
        };
        this.setId = (newId) => {
            this.combo_id = newId;
        };
        this.setName = (newName) => {
            this.name = newName;
        };
        this.setDescription = (newDescription) => {
            this.description = newDescription;
        };
        this.setPrice = (newPrice) => {
            this.price = newPrice;
        };
    }
}
exports.default = Combo;
