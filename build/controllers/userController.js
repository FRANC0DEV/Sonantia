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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProfile = exports.login = exports.createNewUser = void 0;
const promises_1 = __importDefault(require("fs/promises"));
const userSchemas_1 = require("../schemas/userSchemas");
const index_utils_1 = require("../utils/index.utils");
const createNewUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Valida el cuerpo (metadata)
        const body = userSchemas_1.createUserBodySchema.parse(req.body);
        //parallel promise execution
        const hashed_password = yield (0, index_utils_1.hashPassword)(body.password);
        //once both promises are completed, we can execute the code below
        const sqlParameters = {
            username: body.username,
            name: body.name,
            email: body.email,
            password_hash: hashed_password,
            profile_photo_url: '',
            profile_photo_public_id: ''
        };
        // Storing metadata in the database,
        yield (0, index_utils_1.createUser)(sqlParameters);
        (0, index_utils_1.successLauncher)(req, res, 'User successfully created!', 200);
    }
    catch (err) {
        next(err); // Passing principal error to the handler
    }
    finally {
        //   Erasing local file
        if (req.file) {
            promises_1.default.unlink(req.file.path)
                .then(() => { console.log('Local profile photo successfully deleted'); })
                .catch((err) => { console.log('Error while deleting the file: ', err); });
        }
    }
});
exports.createNewUser = createNewUser;
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //validate the body
        const body = userSchemas_1.loginUserBodySchema.parse(req.body);
        const parameters = body;
        //then we must see if the user exists or not
        const result = yield (0, index_utils_1.seekUser)(parameters);
        if (result.length === 0) {
            throw new Error('Email or password incorrect, try again.');
        }
        const user = result[0];
        //after that, we must check if the password is correct
        const match = yield (0, index_utils_1.comparePassword)(body.password, user.password_hash);
        if (!match) {
            throw new Error('Email or password incorrect, try again.');
        }
        //from here, email and password are correct
        const userTokenInfo = {
            username: user.username,
            name: user.name,
            email: user.email,
            profile_photo: { profile_photo_url: user.profile_photo_url, profile_photo_public_id: user.profile_photo_public_id },
            preferences: { interface_color: user.interface_color, profile_border_color: user.profile_border_color },
            roles: user.roles.split(', ')
        };
        const accesstoken = (0, index_utils_1.generateAccessToken)(userTokenInfo);
        const refreshtoken = (0, index_utils_1.generateRefreshToken)(userTokenInfo);
        (0, index_utils_1.successLauncher)(req, res, { accesstoken, refreshtoken }, 200);
    }
    catch (err) {
        next(err);
    }
});
exports.login = login;
const updateProfile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //parse the body
        const body = userSchemas_1.updateUserBodySchema.parse(req.body);
        const userPayload = req.user;
        const new_password_hash = body.password ? yield (0, index_utils_1.hashPassword)(body.password) : '';
        const profile_border_color = body.profile_border_color || '';
        const interface_color = body.interface_color || '';
        //update cloudinary photo
        const cloudResponse = yield (0, index_utils_1.updateProfilePhoto)(req /*,userPayload*/);
        const sqlParameters = {
            username: userPayload.username,
            new_password_hash: new_password_hash,
            new_profile_border_color: profile_border_color,
            new_interface_color: interface_color,
            new_photo_url: cloudResponse.photo_url,
            new_photo_public_id: cloudResponse.photo_public_id
        };
        const result = yield (0, index_utils_1.updateUser)(sqlParameters);
        const userData = result[0];
        const newUserTokenInfo = {
            username: userData.username,
            name: userData.name,
            email: userData.email,
            profile_photo: { profile_photo_url: userData.profile_photo_url, profile_photo_public_id: userData.profile_photo_public_id },
            preferences: { profile_border_color: userData.profile_border_color, interface_color: userData.interface_color },
            roles: userData.roles.split(', ')
        };
        const newAccessToken = (0, index_utils_1.generateAccessToken)(newUserTokenInfo);
        const newRefreshToken = (0, index_utils_1.generateRefreshToken)(newUserTokenInfo);
        const message = {
            message: 'User data updated successfully',
            newAccessToken: newAccessToken,
            newRefreshToken: newRefreshToken
        };
        (0, index_utils_1.successLauncher)(req, res, message, 200);
    }
    catch (error) {
        next(error);
    }
    finally {
        if (req.file) {
            promises_1.default.unlink(req.file.path)
                .then(() => { console.log('Local profile photo successfully deleted'); })
                .catch((err) => { console.log('Error while deleting the file: ', err); });
        }
    }
});
exports.updateProfile = updateProfile;
