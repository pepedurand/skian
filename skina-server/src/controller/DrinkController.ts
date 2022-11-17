import { Request, Response } from "express";
import DrinkBusiness from "../business/DrinkBusiness";
import { DrinkRequisitionParams } from "../types";

export class DrinkController {
  constructor(protected drinkBusiness: DrinkBusiness) {}

  public createDrink = async (req: Request, res: Response) => {
    try {
      const input: DrinkRequisitionParams = {
        token: req.headers.authorization,
        name: req.body.name,
        size: req.body.description,
        price: req.body.additional_price,
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
}
