import { Router } from "express";
import DrinkBusiness from "../business/DrinkBusiness";
import { DrinkController } from "../controller/DrinkController";
import DrinkDatabase from "../database/DrinkDatabase";
import Authenticator from "../services/Authenticator";
import HashManager from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";

export const drinkRouter = Router();

const drinkController = new DrinkController(
  new DrinkBusiness(
    new DrinkDatabase(),
    new Authenticator(),
    new IdGenerator(),
    new HashManager()
  )
);

drinkRouter.post("/createDrink", drinkController.createDrink);
drinkRouter.get("/drinks", drinkController.getDrinks);
drinkRouter.put("/editDrink/:drink_id", drinkController.editDrink);
drinkRouter.delete("/deleteDrink/:drink_id", drinkController.deleteDrink);
