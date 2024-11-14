import multer, {MulterError} from "multer"
import path from "path";

const imgStorage = multer.diskStorage(
    {
        destination:path.resolve(__dirname,'../../temp/img'),/*we are in proyect/src/middleware/middleware.ts*/
        filename: (_req, _file, callback) => {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random()*1E9);
            callback(null, uniqueSuffix)
        },
    }
);

export const imgUploader = multer(
    {
        storage:imgStorage,
        fileFilter: (_req,file,callback)=>{
            const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
            if (allowedTypes.includes(file.mimetype)) {
                callback(null,true);
            } else {
                callback(new MulterError('LIMIT_UNEXPECTED_FILE','Unexpected file, (jpg,jpeg,png) files only accepted'))
            }
        }
    }
)

const audioStorage = multer.diskStorage(
    {
        destination:path.resolve(__dirname,'../../temp/audio'),
        filename: (_req, _file, callback) => {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random()*1E9);
            callback(null, uniqueSuffix)
        },
    }
)

export const audioUploader = multer(
    {
        storage:audioStorage,
        fileFilter: (_req, file, callback)=>{
            const allowedTypes = ['audio/mp3'];
            if (allowedTypes.includes(file.mimetype)){
                callback(null,true);
            } else{
                callback(new MulterError('LIMIT_UNEXPECTED_FILE','Unexpected file, mp3 files only accepted'));
            }
        },
    }
);