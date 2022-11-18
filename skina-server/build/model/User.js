"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class User {
    constructor(user_id, name, email, whatsapp, password, role) {
        this.user_id = user_id;
        this.name = name;
        this.email = email;
        this.whatsapp = whatsapp;
        this.password = password;
        this.role = role;
        this.getId = () => {
            return this.user_id;
        };
        this.getName = () => {
            return this.name;
        };
        this.getEmail = () => {
            return this.email;
        };
        this.getWhatsapp = () => {
            return this.whatsapp;
        };
        this.getPassword = () => {
            return this.password;
        };
        this.getRole = () => {
            return this.role;
        };
        this.setId = (newId) => {
            this.user_id = newId;
        };
        this.setName = (newName) => {
            this.name = newName;
        };
        this.setEmail = (newEmail) => {
            this.email = newEmail;
        };
        this.setWhatsapp = (newWhatsapp) => {
            this.whatsapp = newWhatsapp;
        };
        this.setPassword = (newPassword) => {
            this.password = newPassword;
        };
        this.setRole = (newRole) => {
            this.role = newRole;
        };
    }
}
exports.default = User;
