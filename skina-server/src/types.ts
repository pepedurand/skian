export enum UserRole {
  NORMAL = "normal",
  ADMIN = "admin",
}

export interface SingUpInputTypes {
  name: string;
  email: string;
  whatsapp: string;
  password: string;
  role: UserRole;
}

export interface LoginParams {
  email: string;
  password: string;
}

export interface PizzaRequisitionParams {
  token: string | undefined;
  pizza_id?: string;
  name: string;
  description: string;
  additional_price: number;
}
