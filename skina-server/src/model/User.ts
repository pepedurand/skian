import { UserRole } from "../types";

export interface UserTypesAtDatabase {
  user_id: string;
  name: string;
  email: string;
  whatsapp: string;
  password: string;
  role: UserRole;
}

export default class User {
  constructor(
    private user_id: string,
    private name: string,
    private email: string,
    private whatsapp: string,
    private password: string,
    private role: UserRole
  ) {}

  public getId = () => {
    return this.user_id;
  };
  public getName = () => {
    return this.name;
  };
  public getEmail = () => {
    return this.email;
  };
  public getWhatsapp = () => {
    return this.whatsapp;
  };
  public getPassword = () => {
    return this.password;
  };
  public getRole = () => {
    return this.role;
  };
  public setId = (newId: string) => {
    this.user_id = newId;
  };
  public setName = (newName: string) => {
    this.name = newName;
  };
  public setEmail = (newEmail: string) => {
    this.email = newEmail;
  };
  public setWhatsapp = (newWhatsapp: string) => {
    this.whatsapp = newWhatsapp;
  };
  public setPassword = (newPassword: string) => {
    this.password = newPassword;
  };
  public setRole = (newRole: UserRole) => {
    this.role = newRole;
  };
}
