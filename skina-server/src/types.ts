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
