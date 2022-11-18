"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PizzaController = void 0;
class PizzaController {
    constructor(pizzaBusiness) {
        this.pizzaBusiness = pizzaBusiness;
        this.createPizza = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const input = {
                    token: req.headers.authorization,
                    name: req.body.name,
                    description: req.body.description,
                    additional_price: req.body.additional_price,
                };
                const response = yield this.pizzaBusiness.createPizza(input);
                res.status(200).send(response);
            }
            catch (error) {
                console.log(error);
                if (error instanceof Error) {
                    return res.status(400).send({ message: error.message });
                }
                res.status(500).send({ message: "Erro inesperado" });
            }
        });
        this.getPizzas = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const input = {
                    token: req.headers.authorization,
                    search: req.query.search,
                    order: req.query.order,
                    sort: req.query.sort,
                    limit: req.query.limit,
                    page: req.query.page,
                };
                const response = yield this.pizzaBusiness.getPizzas(input);
                res.status(200).send(response);
            }
            catch (error) {
                console.log(error);
                if (error instanceof Error) {
                    return res.status(400).send({ message: error.message });
                }
                res.status(500).send({ message: "Erro inesperado" });
            }
        });
        this.editPizza = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const input = {
                    token: req.headers.authorization,
                    pizza_id: req.params.pizza_id,
                    name: req.body.name,
                    description: req.body.description,
                    additional_price: req.body.additional_price,
                };
                const response = yield this.pizzaBusiness.editPizza(input);
                res.status(200).send(response);
            }
            catch (error) {
                console.log(error);
                if (error instanceof Error) {
                    return res.status(400).send({ message: error.message });
                }
                res.status(500).send({ message: "Erro inesperado" });
            }
        });
        this.deletePizza = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const input = {
                    token: req.headers.authorization,
                    pizza_id: req.params.pizza_id,
                    name: req.body.name,
                    description: req.body.description,
                    additional_price: req.body.additional_price,
                };
                const response = yield this.pizzaBusiness.deletePizza(input);
                res.status(200).send(response);
            }
            catch (error) {
                console.log(error);
                if (error instanceof Error) {
                    return res.status(400).send({ message: error.message });
                }
                res.status(500).send({ message: "Erro inesperado" });
            }
        });
    }
}
exports.PizzaController = PizzaController;
