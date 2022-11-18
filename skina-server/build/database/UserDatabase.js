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
const BaseDatabase_1 = require("./BaseDatabase");
class UserDatabase extends BaseDatabase_1.BaseDatabase {
    constructor() {
        super(...arguments);
        this.loginUser = (email) => __awaiter(this, void 0, void 0, function* () {
            const usersDB = yield BaseDatabase_1.BaseDatabase.connections(UserDatabase.TABLE_USERS)
                .select()
                .where({ email });
            return usersDB[0];
        });
        this.createUser = (user) => __awaiter(this, void 0, void 0, function* () {
            const newUser = {
                user_id: user.getId(),
                name: user.getName(),
                email: user.getEmail(),
                whatsapp: user.getWhatsapp(),
                password: user.getPassword(),
                role: user.getRole(),
            };
            yield BaseDatabase_1.BaseDatabase.connections(UserDatabase.TABLE_USERS).insert(newUser);
        });
    }
}
exports.default = UserDatabase;
UserDatabase.TABLE_USERS = "users";
