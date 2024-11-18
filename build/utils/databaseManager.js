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
exports.getArtists = exports.getGenres = exports.getSongsByArtist = exports.getSongsByGenre = exports.getSongsByAlbum = exports.getSongsByPlaylist = exports.getSavedAlbumsByUser = exports.getPlaylistByUser = exports.updateUser = exports.seekUser = exports.createUser = void 0;
const mysqlConnection_1 = __importDefault(require("../connections/mysqlConnection"));
const createUser = (sqlParameters) => __awaiter(void 0, void 0, void 0, function* () {
    return mysqlConnection_1.default.query(`call sonantia.CreateUser(?,?,?,?,?,?)`, [sqlParameters.username, sqlParameters.name, sqlParameters.email, sqlParameters.password_hash, sqlParameters.profile_photo_url, sqlParameters.profile_photo_public_id]);
});
exports.createUser = createUser;
const seekUser = (sqlParameters) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [result] = yield mysqlConnection_1.default.query(`select * from sonantia.view_users vu
            where vu.email = ?`, sqlParameters.email);
        const users = result;
        return users; //can be empty
    }
    catch (error) {
        console.log('Error while seeking the user: ', error);
        throw new Error('Something wrong happened, try again later...');
    }
});
exports.seekUser = seekUser;
const updateUser = (sqlParameters) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [result] = yield mysqlConnection_1.default.query('call sonantia.UpdateUser(?,?,?,?,?,?)', [sqlParameters.username, sqlParameters.new_password_hash, sqlParameters.new_interface_color, sqlParameters.new_profile_border_color, sqlParameters.new_photo_url, sqlParameters.new_photo_public_id]);
        if (Array.isArray(result) && result.length > 0) {
            return result[0];
        }
        else {
            throw new Error('No data returned from database.');
        }
    }
    catch (error) {
        console.log('Error while updating user on the database: ', error);
        throw new Error('Something wrong happened, try again later...');
    }
});
exports.updateUser = updateUser;
const getPlaylistByUser = (sqlParameters) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [result] = yield mysqlConnection_1.default.query(`
            select * from sonantia.view_usersXmusiccollections vumc 
            where vumc.username=? and vumc.Relation=?
            `, [sqlParameters.username, 'Created Playlist']);
        return result;
    }
    catch (error) {
        console.log('Error while obtaining user\'s playlists: ', error);
        throw new Error('We couldn\'t obtain user\'s playlists');
    }
});
exports.getPlaylistByUser = getPlaylistByUser;
const getSavedAlbumsByUser = (sqlParameters) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [result] = yield mysqlConnection_1.default.query(`
            select * from sonantia.view_usersXmusiccollections vumc 
            where vumc.username=? and vumc.Relation=?
            `, [sqlParameters.username, 'Saved Album']);
        return result;
    }
    catch (error) {
        console.log('Error while obtaining user\'s saved albums: ', error);
        throw new Error('We couldn\'t obtain user\'s saved albums');
    }
});
exports.getSavedAlbumsByUser = getSavedAlbumsByUser;
const getSongsByPlaylist = (playlist_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [result] = yield mysqlConnection_1.default.query(`
            select * from sonantia.view_songsXplaylist vsp
            where vsp.id_playlist=?
            `, [playlist_id]);
        return result;
    }
    catch (error) {
        console.log('Error while obtaining the songs: ', error);
        throw new Error('We couldn\'t obtain the songs');
    }
});
exports.getSongsByPlaylist = getSongsByPlaylist;
const getSongsByAlbum = (album_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [result] = yield mysqlConnection_1.default.query(`
            select * from sonantia.view_songsXalbums vsa where vsa.id_album=?
            `, [album_id]);
        return result;
    }
    catch (error) {
        console.log('Error while obtaining the songs: ', error);
        throw new Error('We couldn\'t obtain the songs');
    }
});
exports.getSongsByAlbum = getSongsByAlbum;
const getSongsByGenre = (genre) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [result] = yield mysqlConnection_1.default.query(`
            select * from sonantia.view_songs vs where vs.genre=?
            `, [genre]);
        return result;
    }
    catch (error) {
        console.log('Error while obtaining the songs: ', error);
        throw new Error('We couldn\'t obtain the songs');
    }
});
exports.getSongsByGenre = getSongsByGenre;
const getSongsByArtist = (artistUsername) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [result] = yield mysqlConnection_1.default.query(`
            select * from sonantia.view_songs vs where vs.owners REGEXP CONCAT(?,?,?)
            `, ['(^| )', artistUsername, '( |$)']);
        return result;
    }
    catch (error) {
        console.log('Error while obtaining the songs: ', error);
        throw new Error('We couldn\'t obtain the songs');
    }
});
exports.getSongsByArtist = getSongsByArtist;
const getGenres = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [result] = yield mysqlConnection_1.default.query(`
            select * from sonantia.genres g order by g.id_genre
            `);
        return result;
    }
    catch (error) {
        console.log('Error while obtaining the genres: ', error);
        throw new Error('We couldn\'t obtain the genres');
    }
});
exports.getGenres = getGenres;
const getArtists = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [result] = yield mysqlConnection_1.default.query(`
            select * from sonantia.view_users u
            where exists (select * from sonantia.users_roles ur where ur.id_user=u.id_user and ur.id_role=?)
            `, [2]);
        return result;
    }
    catch (error) {
        console.log('Error while obtaining the artists: ', error);
        throw new Error('We couldn\'t obtain the artists');
    }
});
exports.getArtists = getArtists;
