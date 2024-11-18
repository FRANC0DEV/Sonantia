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
exports.getUserSavedAlbums = exports.getUserPlaylists = void 0;
const index_utils_1 = require("../utils/index.utils");
const getUserPlaylists = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userPayload = req.user;
        const sqlParameters = {
            username: userPayload.username
        };
        const playlists = yield (0, index_utils_1.getPlaylistByUser)(sqlParameters);
        if (playlists.length === 0) {
            return (0, index_utils_1.successLauncher)(req, res, [], 200);
        }
        const returnInfo = playlists.map((collection) => {
            const playlist = {
                id_playlist: collection.id_collection,
                name: collection.Collection_name,
                description: collection.Collection_description,
                Photo_url: collection.Photo_url,
                owners: collection.owners.split(' ')
            };
            return playlist;
        });
        (0, index_utils_1.successLauncher)(req, res, returnInfo, 200);
    }
    catch (error) {
        next(error);
    }
});
exports.getUserPlaylists = getUserPlaylists;
const getUserSavedAlbums = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userPayload = req.user;
        const sqlParameters = {
            username: userPayload.username
        };
        const savedAlbums = yield (0, index_utils_1.getSavedAlbumsByUser)(sqlParameters);
        if (savedAlbums.length === 0) {
            return (0, index_utils_1.successLauncher)(req, res, [], 200);
        }
        const returnInfo = savedAlbums.map((collection) => {
            const savedAlbum = {
                id_album: collection.id_collection,
                name: collection.Collection_name,
                description: collection.Collection_description,
                Photo_url: collection.Photo_url,
                owners: collection.owners.split(' ')
            };
            return savedAlbum;
        });
        (0, index_utils_1.successLauncher)(req, res, returnInfo, 200);
    }
    catch (error) {
        next(error);
    }
});
exports.getUserSavedAlbums = getUserSavedAlbums;
