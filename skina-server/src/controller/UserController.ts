import { Request, Response } from "express";
import UserBusiness from "../business/UserBusiness";
import { LoginParams, SingUpInputTypes } from "../types";

export default class UserController {
  constructor(protected userBusiness: UserBusiness) {}

  public signup = async (req: Request, res: Response) => {
    try {
      const input: SingUpInputTypes = {
        name: req.body.name,
        email: req.body.email,
        whatsapp: req.body.whatsapp,
        password: req.body.password,
        role: req.body.role,
      };
      const response = await this.userBusiness.signup(input);

      res.status(201).send(response);
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(400).send({ message: error.message });
      }
      res.status(500).send({ message: "Erro inesperado" });
    }
  };
  public login = async (req: Request, res: Response) => {
    try {
      const input: LoginParams = {
        email: req.body.email,
        password: req.body.password,
      };

      const response = await this.userBusiness.login(input);

      res.status(200).send(response);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).send({ message: error.message });
      }

      res.status(500).send({ message: "Erro inesperado" });
    }
  };
}
