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
exports.obtainSongsByArtist = exports.obtainSongsByGenre = exports.obtainSongsByAlbum = exports.obtainSongsByPlaylist = void 0;
const index_utils_1 = require("../utils/index.utils");
const obtainSongsByPlaylist = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const playlist_id = parseInt(req.params.id_playlist);
        const songs = yield (0, index_utils_1.getSongsByPlaylist)(playlist_id);
        if (songs.length === 0) {
            return (0, index_utils_1.successLauncher)(req, res, [], 200);
        }
        const returnInfo = songs.map((song) => {
            const songInfo = {
                id_song: song.id_song,
                name: song.name,
                lyrics: song.lyrics,
                song_photo_url: song.song_photo_url,
                song_url: song.song_url,
                genre: song.genre,
                owners: song.owners.split(' ')
            };
            return songInfo;
        });
        (0, index_utils_1.successLauncher)(req, res, returnInfo, 200);
    }
    catch (error) {
        next(error);
    }
});
exports.obtainSongsByPlaylist = obtainSongsByPlaylist;
const obtainSongsByAlbum = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const album_id = parseInt(req.params.id_album);
        const songs = yield (0, index_utils_1.getSongsByAlbum)(album_id);
        if (songs.length === 0) {
            return (0, index_utils_1.successLauncher)(req, res, [], 200);
        }
        const returnInfo = songs.map((song) => {
            const songInfo = {
                id_song: song.id_song,
                name: song.name,
                lyrics: song.lyrics,
                song_photo_url: song.song_photo_url,
                song_url: song.song_url,
                genre: song.genre,
                owners: song.owners.split(' ')
            };
            return songInfo;
        });
        (0, index_utils_1.successLauncher)(req, res, returnInfo, 200);
    }
    catch (error) {
        next(error);
    }
});
exports.obtainSongsByAlbum = obtainSongsByAlbum;
const obtainSongsByGenre = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const genre = req.params.genre_name.toString();
        const songs = yield (0, index_utils_1.getSongsByGenre)(genre);
        if (songs.length === 0) {
            return (0, index_utils_1.successLauncher)(req, res, [], 200);
        }
        const returnInfo = songs.map((song) => {
            const songInfo = {
                id_song: song.id_song,
                name: song.name,
                lyrics: song.lyrics,
                song_photo_url: song.song_photo_url,
                song_url: song.song_url,
                genre: song.genre,
                owners: song.owners.split(' ')
            };
            return songInfo;
        });
        (0, index_utils_1.successLauncher)(req, res, returnInfo, 200);
    }
    catch (error) {
        next(error);
    }
});
exports.obtainSongsByGenre = obtainSongsByGenre;
const obtainSongsByArtist = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const username = req.params.artist_username.toString();
        const songs = yield (0, index_utils_1.getSongsByArtist)(username);
        if (songs.length === 0) {
            return (0, index_utils_1.successLauncher)(req, res, [], 200);
        }
        const returnInfo = songs.map((song) => {
            const songInfo = {
                id_song: song.id_song,
                name: song.name,
                lyrics: song.lyrics,
                song_photo_url: song.song_photo_url,
                song_url: song.song_url,
                genre: song.genre,
                owners: song.owners.split(' ')
            };
            return songInfo;
        });
        (0, index_utils_1.successLauncher)(req, res, returnInfo, 200);
    }
    catch (error) {
        next(error);
    }
});
exports.obtainSongsByArtist = obtainSongsByArtist;
