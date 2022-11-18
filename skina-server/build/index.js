"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const UserRouter_1 = require("./router/UserRouter");
const PizzaRouter_1 = require("./router/PizzaRouter");
const DrinkRouter_1 = require("./router/DrinkRouter");
const ComboRouter_1 = require("./router/ComboRouter");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.listen(process.env.PORT || 3003, () => {
    console.log("Servidor rodando na porta 3003");
});
exports.default = app;
app.use("/", UserRouter_1.userRouter);
app.use("/", PizzaRouter_1.pizzaRouter);
app.use("/", DrinkRouter_1.drinkRouter);
app.use("/", ComboRouter_1.comboRouter);
