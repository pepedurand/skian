import { Request, Response } from "express";
import DrinkBusiness from "../business/DrinkBusiness";
import { GetDrinks } from "../model/Drink";
import { DrinkRequisitionParams } from "../types";

export class DrinkController {
  constructor(protected drinkBusiness: DrinkBusiness) {}

  public createDrink = async (req: Request, res: Response) => {
    try {
      const input: DrinkRequisitionParams = {
        token: req.headers.authorization,
        name: req.body.name,
        size: req.body.size,
        price: req.body.price,
      };

      const response = await this.drinkBusiness.createDrink(input);

      res.status(200).send(response);
    } catch (error) {
      console.log(error);

      if (error instanceof Error) {
        return res.status(400).send({ message: error.message });
      }

      res.status(500).send({ message: "Erro inesperado" });
    }
  };
  public getDrinks = async (req: Request, res: Response) => {
    try {
      const input: GetDrinks = {
        token: req.headers.authorization,
        search: req.query.search as string,
        order: req.query.order as string,
        sort: req.query.sort as string,
        limit: req.query.limit as string,
        page: req.query.page as string,
      };

      const response = await this.drinkBusiness.getDrinks(input);

      res.status(200).send(response);
    } catch (error) {
      console.log(error);

      if (error instanceof Error) {
        return res.status(400).send({ message: error.message });
      }

      res.status(500).send({ message: "Erro inesperado" });
    }
  };
}
