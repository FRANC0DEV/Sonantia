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
exports.updateProfilePhoto = exports.deleteProfilePhoto = exports.uploadProfilePhoto = void 0;
const cloudinaryConfig_1 = __importDefault(require("../connections/cloudinaryConfig"));
const uploadProfilePhoto = (req, body) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.file) {
        try {
            const cloudRes = yield cloudinaryConfig_1.default.uploader.upload(req.file.path, {
                folder: '/sonantia/users/Profile_Photos',
                resource_type: 'image',
                public_id: `${body.username}-Profile_Photo`,
                upload_preset: 'sonantia_profile_photo',
            });
            return { photo_url: cloudRes.secure_url, photo_public_id: cloudRes.public_id };
        }
        catch (error) {
            console.log('Error while uploading the photo to cloudinary: ', error);
            throw new Error('Something wrong happened, try again later...');
        }
    }
    return { photo_url: '', photo_public_id: '' };
});
exports.uploadProfilePhoto = uploadProfilePhoto;
const deleteProfilePhoto = (photo_public_id) => __awaiter(void 0, void 0, void 0, function* () {
    return cloudinaryConfig_1.default.uploader.destroy(photo_public_id, {
        resource_type: 'image',
    });
});
exports.deleteProfilePhoto = deleteProfilePhoto;
const updateProfilePhoto = (req) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.file) {
            const userPayload = req.user;
            const cloudRes = yield cloudinaryConfig_1.default.uploader.upload(req.file.path, {
                folder: '/sonantia/users/Profile_Photos',
                resource_type: 'image',
                public_id: `${userPayload.username}-Profile_Photo`, /*we cannot put the entire public id saved on the database cause this is not the publicID that will be show in cloud, the folder path will be added by default befor this string. If we do, we will not reference the photo correctly, since we are saying that the id is <path>/<path>/<this string>*/
                upload_preset: 'sonantia_profile_photo',
            });
            return { photo_url: cloudRes.secure_url, photo_public_id: cloudRes.public_id };
            /*important to return the url since this one contains the link of the asset but in its lastest version */
        }
        return { photo_url: '', photo_public_id: '' };
    }
    catch (error) {
        console.log('Error while updating the profile photo on cloudinary: ', error);
        throw new Error('Something happened while updating the profile photo, try again later...');
    }
});
exports.updateProfilePhoto = updateProfilePhoto;
