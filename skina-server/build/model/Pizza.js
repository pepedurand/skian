"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Pizza {
    constructor(pizza_id, name, description, additional_price) {
        this.pizza_id = pizza_id;
        this.name = name;
        this.description = description;
        this.additional_price = additional_price;
        this.getId = () => {
            return this.pizza_id;
        };
        this.getName = () => {
            return this.name;
        };
        this.getDescription = () => {
            return this.description;
        };
        this.getAdditionalPrice = () => {
            return this.additional_price;
        };
        this.setId = (newId) => {
            this.pizza_id = newId;
        };
        this.setName = (newName) => {
            this.name = newName;
        };
        this.setDescription = (newDescription) => {
            this.description = newDescription;
        };
        this.setAdditionalPrice = (newAdditionalPrice) => {
            this.additional_price = newAdditionalPrice;
        };
    }
}
exports.default = Pizza;
