import * as jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { UserRole } from "../types";

dotenv.config();

export type authenticationData = {
  user_id: string;
  role: UserRole;
};

export default class Authenticator {
  generateToken = (payload: authenticationData) => {
    return jwt.sign(payload, process.env.JWT_KEY as string, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
  };

  getTokenData = (token: string) => {
    try {
      const payload = jwt.verify(token, process.env.JWT_KEY as string);

      return payload as authenticationData;
    } catch (error) {
      return null;
    }
  };
}
