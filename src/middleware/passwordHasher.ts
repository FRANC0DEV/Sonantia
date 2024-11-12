import bcrypt from 'bcrypt';
const saltRounds = 10;

export const hashPassword = async (password:string):Promise<string>=>{
    const hashed_password = await bcrypt.hash(password,saltRounds);
    return hashed_password;
}

export const comparePassword = async (password:string, hash:string):Promise<boolean>=>{
    const isAMatch = await bcrypt.compare(password,hash);
    return isAMatch;
}