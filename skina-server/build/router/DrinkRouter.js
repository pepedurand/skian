"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.drinkRouter = void 0;
const express_1 = require("express");
const DrinkBusiness_1 = __importDefault(require("../business/DrinkBusiness"));
const DrinkController_1 = require("../controller/DrinkController");
const DrinkDatabase_1 = __importDefault(require("../database/DrinkDatabase"));
const Authenticator_1 = __importDefault(require("../services/Authenticator"));
const HashManager_1 = __importDefault(require("../services/HashManager"));
const IdGenerator_1 = require("../services/IdGenerator");
exports.drinkRouter = (0, express_1.Router)();
const drinkController = new DrinkController_1.DrinkController(new DrinkBusiness_1.default(new DrinkDatabase_1.default(), new Authenticator_1.default(), new IdGenerator_1.IdGenerator(), new HashManager_1.default()));
exports.drinkRouter.post("/createDrink", drinkController.createDrink);
exports.drinkRouter.get("/drinks", drinkController.getDrinks);
exports.drinkRouter.put("/editDrink/:drink_id", drinkController.editDrink);
exports.drinkRouter.delete("/deleteDrink/:drink_id", drinkController.deleteDrink);
