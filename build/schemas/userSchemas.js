"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserBodySchema = exports.loginUserBodySchema = exports.createUserBodySchema = void 0;
const zod_1 = require("zod");
exports.createUserBodySchema = zod_1.z.object({
    username: zod_1.z.string().regex(/^(?!\d+$)[\p{L}\p{N}_]{8,30}$/gu, { message: 'Username must have 8-30 characters (could include \'_\'), must include at least one letter and one number, whitespace characters not admitted' }),
    name: zod_1.z.string().regex(/^[\p{L} ]{2,30}$/gu, { message: 'Name must have 2-30 characters in the following range: a-z' }),
    email: zod_1.z.string().email({ message: 'Invalid field, send a proper email' }),
    password: zod_1.z.string().regex(/^(?=.*\d)(?=.*[!@#$\-%^&*])[\p{L}\p{N}_\-!@#$%^&*]{8,20}$/gu, { message: "Password must have 8-20 characters, must contain at least one letter, one number, and one special character(!,@,#,$,%,^,& or *)" }),
});
exports.loginUserBodySchema = zod_1.z.object({
    email: zod_1.z.string().email({ message: 'Invalid field, send a proper email' }),
    password: zod_1.z.string().min(1, { message: 'You must send a password' })
});
exports.updateUserBodySchema = zod_1.z.object({
    profile_border_color: zod_1.z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, {
        message: 'The profile border color must be in HEX format'
    }).optional(),
    interface_color: zod_1.z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, {
        message: 'The interface color must be in HEX format'
    }).optional(),
    password: zod_1.z.string().regex(/^(?=.*\d)(?=.*[!@#$\-%^&*])[\p{L}\p{N}_\-!@#$%^&*]{8,20}$/gu, { message: "Password must have 8-20 characters, must contain at least one letter, one number, and one special character(!,@,#,$,%,^,& or *)" }).optional(),
});
