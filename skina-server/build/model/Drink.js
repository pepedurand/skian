"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Drink {
    constructor(drink_id, name, size, price) {
        this.drink_id = drink_id;
        this.name = name;
        this.size = size;
        this.price = price;
        this.getId = () => {
            return this.drink_id;
        };
        this.getName = () => {
            return this.name;
        };
        this.getSize = () => {
            return this.size;
        };
        this.getPrice = () => {
            return this.price;
        };
        this.setId = (newId) => {
            this.drink_id = newId;
        };
        this.setName = (newName) => {
            this.name = newName;
        };
        this.setSize = (newSize) => {
            this.size = newSize;
        };
        this.setPrice = (newPrice) => {
            this.price = newPrice;
        };
    }
}
exports.default = Drink;
