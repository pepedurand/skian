import { Router } from "express";
import ComboBusiness from "../business/ComboBusiness";
import { ComboController } from "../controller/ComboController";
import ComboDatabase from "../database/ComboDatabase";
import Authenticator from "../services/Authenticator";
import HashManager from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";

export const comboRouter = Router();

const comboController = new ComboController(
  new ComboBusiness(
    new ComboDatabase(),
    new Authenticator(),
    new IdGenerator(),
    new HashManager()
  )
);

comboRouter.post("/createCombo", comboController.createCombo);
comboRouter.put("/editCombo/:combo_id", comboController.editCombo);
comboRouter.get("/combos", comboController.getCombos);
comboRouter.delete("/deleteCombo/:combo_id", comboController.deleteCombo);
