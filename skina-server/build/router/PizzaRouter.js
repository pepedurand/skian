"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pizzaRouter = void 0;
const express_1 = require("express");
const PizzaBusiness_1 = __importDefault(require("../business/PizzaBusiness"));
const PizzaController_1 = require("../controller/PizzaController");
const PizzaDatabase_1 = __importDefault(require("../database/PizzaDatabase"));
const Authenticator_1 = __importDefault(require("../services/Authenticator"));
const HashManager_1 = __importDefault(require("../services/HashManager"));
const IdGenerator_1 = require("../services/IdGenerator");
exports.pizzaRouter = (0, express_1.Router)();
const pizzaController = new PizzaController_1.PizzaController(new PizzaBusiness_1.default(new PizzaDatabase_1.default(), new Authenticator_1.default(), new IdGenerator_1.IdGenerator(), new HashManager_1.default()));
exports.pizzaRouter.post("/createPizza", pizzaController.createPizza);
exports.pizzaRouter.put("/editPizza/:pizza_id", pizzaController.editPizza);
exports.pizzaRouter.get("/pizzas", pizzaController.getPizzas);
exports.pizzaRouter.delete("/deletepizza/:pizza_id", pizzaController.deletePizza);
