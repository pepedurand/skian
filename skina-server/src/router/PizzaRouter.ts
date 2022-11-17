import { Router } from "express";
import PizzaBusiness from "../business/PizzaBusiness";
import { PizzaController } from "../controller/PizzaController";
import PizzaDatabase from "../database/PizzaDatabase";
import Authenticator from "../services/Authenticator";
import HashManager from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";

export const pizzaRouter = Router();

const pizzaController = new PizzaController(
  new PizzaBusiness(
    new PizzaDatabase(),
    new Authenticator(),
    new IdGenerator(),
    new HashManager()
  )
);

pizzaRouter.post("/createPizza", pizzaController.createPizza);
pizzaRouter.put("/:pizza_id", pizzaController.editPizza);
pizzaRouter.get("/pizzas", pizzaController.getPizzas);
pizzaRouter.delete("/:pizza_id", pizzaController.deletePizza);
