import { Request, Response } from "express";
import ComboBusiness from "../business/ComboBusiness";
import { GetCombos } from "../model/Combos";
import { ComboRequisitionsParams } from "../types";

export class ComboController {
  constructor(protected comboBusiness: ComboBusiness) {}

  public createCombo = async (req: Request, res: Response) => {
    try {
      const input: ComboRequisitionsParams = {
        token: req.headers.authorization,
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
      };

      const response = await this.comboBusiness.createCombo(input);

      res.status(200).send(response);
    } catch (error) {
      console.log(error);

      if (error instanceof Error) {
        return res.status(400).send({ message: error.message });
      }

      res.status(500).send({ message: "Erro inesperado" });
    }
  };
  public getCombos = async (req: Request, res: Response) => {
    try {
      const input: GetCombos = {
        token: req.headers.authorization,
        search: req.query.search as string,
        order: req.query.order as string,
        sort: req.query.sort as string,
        limit: req.query.limit as string,
        page: req.query.page as string,
      };

      const response = await this.comboBusiness.getCombos(input);

      res.status(200).send(response);
    } catch (error) {
      console.log(error);

      if (error instanceof Error) {
        return res.status(400).send({ message: error.message });
      }

      res.status(500).send({ message: "Erro inesperado" });
    }
  };

  public editCombo = async (req: Request, res: Response) => {
    try {
      const input: ComboRequisitionsParams = {
        token: req.headers.authorization,
        combo_id: req.params.combo_id,
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
      };

      const response = await this.comboBusiness.editCombo(input);

      res.status(200).send(response);
    } catch (error) {
      console.log(error);

      if (error instanceof Error) {
        return res.status(400).send({ message: error.message });
      }

      res.status(500).send({ message: "Erro inesperado" });
    }
  };
  public deleteCombo = async (req: Request, res: Response) => {
    try {
      const input: ComboRequisitionsParams = {
        token: req.headers.authorization,
        combo_id: req.params.combo_id,
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
      };

      const response = await this.comboBusiness.deleteCombo(input);

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
