import bcrypt from 'bcrypt';
const saltRounds = 10;

export const hashPassword = async (password:string):Promise<string>=>{
    try {
        const hash = await bcrypt.hash(password,saltRounds);
        return hash;
    } catch (error) {
        console.log('Error while hashing the password: ', error)
        throw new Error('Something wrong happened, try again later...')
    }
}

export const comparePassword = async (password:string, hash:string):Promise<boolean>=>{
    try {
        const isMatch = await bcrypt.compare(password,hash);
        return isMatch;
    } catch (error) {
        console.log('Error while comparing the password: ', error)
        throw new Error('Something wrong happened, try again later...')
    }
}