import { z } from 'zod';

export const createUserBodySchema = z.object(
    {
        username:z.string().regex(
            /^(?=.*[a-zA-Z])[a-zA-Z\d_\-]{8,30}$/,
            {message:'Username must have 8-30 characters including 1 letter at least, might include (\'_\' or \'-\') and numbers'}
        ),
        name:z.string().regex(
            /^[a-zA-Z]{2,30}$/,
            {message:'Name must have between 2 and 30 characters in the following range: a-z'}
        ),
        email:z.string().email(
            {message:'Invalid field, send a proper email'}
        ),
        password:z.string().regex(
            /^[a-zA-Z\d]{8,20}$/,
            { message: "Password must be between 8 and 20 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character." }
        ),
    }
);

export const loginUserSchema = z.object(
    {
        email:z.string().email(
            {message:'Invalid field, send a proper email'}
        ),
        password:z.string().min(1,{message:'You must send a password'})
    }
)