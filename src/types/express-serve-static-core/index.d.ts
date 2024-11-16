import {userPayload} from "../interfaces/userInterfaces";
/**
 * tell typescript to grab the Request type from express
 * and add the user property using declaration merging
 */
export {}

declare global{
    namespace Express{
        interface Request{
            user?:userPayload,
        }
    }
}
//note: you'll have to go deep in express files, especifically 'express-ser-static-core' index.d.ts, in order to understand the hierarchy of extension
//then this file must be INCLUDED in tsconfig.json

/*not only that, you must CREATE THE SAME FOLDER STRUCTURE THAT TAKES YOU TO this index.d.ts, this can be achieved easily by enabling:
    "typeRoots": ["src/types"],  
in your tsconfig.json 
*/