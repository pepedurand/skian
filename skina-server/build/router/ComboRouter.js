"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.comboRouter = void 0;
const express_1 = require("express");
const ComboBusiness_1 = __importDefault(require("../business/ComboBusiness"));
const ComboController_1 = require("../controller/ComboController");
const ComboDatabase_1 = __importDefault(require("../database/ComboDatabase"));
const Authenticator_1 = __importDefault(require("../services/Authenticator"));
const HashManager_1 = __importDefault(require("../services/HashManager"));
const IdGenerator_1 = require("../services/IdGenerator");
exports.comboRouter = (0, express_1.Router)();
const comboController = new ComboController_1.ComboController(new ComboBusiness_1.default(new ComboDatabase_1.default(), new Authenticator_1.default(), new IdGenerator_1.IdGenerator(), new HashManager_1.default()));
exports.comboRouter.post("/createCombo", comboController.createCombo);
exports.comboRouter.put("/editCombo/:combo_id", comboController.editCombo);
exports.comboRouter.get("/combos", comboController.getCombos);
exports.comboRouter.delete("/deleteCombo/:combo_id", comboController.deleteCombo);
