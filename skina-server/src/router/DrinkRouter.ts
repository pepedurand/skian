import { Router } from "express";
import DrinkBusiness from "../business/DrinkBusiness";
import { DrinkController } from "../controller/DrinkController";
import DrinkDatabase from "../database/DrinkDatabase";
import Authenticator from "../services/Authenticator";
import HashManager from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";

export const drinkRouter = Router();

const pizzaController = new DrinkController(
  new DrinkBusiness(
    new DrinkDatabase(),
    new Authenticator(),
    new IdGenerator(),
    new HashManager()
  )
);

drinkRouter.post("/createDrink", pizzaController.createDrink);
drinkRouter.get("/drinks", pizzaController.getDrinks);
