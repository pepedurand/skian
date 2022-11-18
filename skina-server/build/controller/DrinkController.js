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
exports.DrinkController = void 0;
class DrinkController {
    constructor(drinkBusiness) {
        this.drinkBusiness = drinkBusiness;
        this.createDrink = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const input = {
                    token: req.headers.authorization,
                    name: req.body.name,
                    size: req.body.size,
                    price: req.body.price,
                };
                const response = yield this.drinkBusiness.createDrink(input);
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
        this.getDrinks = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const input = {
                    token: req.headers.authorization,
                    search: req.query.search,
                    order: req.query.order,
                    sort: req.query.sort,
                    limit: req.query.limit,
                    page: req.query.page,
                };
                const response = yield this.drinkBusiness.getDrinks(input);
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
        this.editDrink = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const input = {
                    token: req.headers.authorization,
                    drink_id: req.params.drink_id,
                    name: req.body.name,
                    size: req.body.size,
                    price: req.body.price,
                };
                const response = yield this.drinkBusiness.editDrink(input);
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
        this.deleteDrink = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const input = {
                    token: req.headers.authorization,
                    drink_id: req.params.drink_id,
                    name: req.body.name,
                    size: req.body.size,
                    price: req.body.price,
                };
                const response = yield this.drinkBusiness.deleteDrink(input);
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
exports.DrinkController = DrinkController;
