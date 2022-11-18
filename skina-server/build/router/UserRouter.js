"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const UserBusiness_1 = __importDefault(require("../business/UserBusiness"));
const UserController_1 = __importDefault(require("../controller/UserController"));
const UserDatabase_1 = __importDefault(require("../database/UserDatabase"));
const Authenticator_1 = __importDefault(require("../services/Authenticator"));
const HashManager_1 = __importDefault(require("../services/HashManager"));
const IdGenerator_1 = require("../services/IdGenerator");
exports.userRouter = (0, express_1.Router)();
const userController = new UserController_1.default(new UserBusiness_1.default(new UserDatabase_1.default(), new Authenticator_1.default(), new IdGenerator_1.IdGenerator(), new HashManager_1.default()));
exports.userRouter.post("/signup", userController.signup);
exports.userRouter.post("/login", userController.login);
