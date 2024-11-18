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
exports.obtainArtists = void 0;
const index_utils_1 = require("../utils/index.utils");
const obtainArtists = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const artists = yield (0, index_utils_1.getArtists)();
        const returnInfo = artists.map((artist) => {
            const artistInfo = {
                username: artist.username,
                name: artist.name,
                profile_photo_url: artist.profile_photo_url,
                interface_color: artist.interface_color,
                profile_border_color: artist.profile_border_color
            };
            return artistInfo;
        });
        (0, index_utils_1.successLauncher)(req, res, returnInfo, 200);
    }
    catch (error) {
        next(error);
    }
});
exports.obtainArtists = obtainArtists;
