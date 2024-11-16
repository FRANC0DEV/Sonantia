import { z } from 'zod';

export const createUserBodySchema = z.object(
    {
        username:z.string().regex(
            /^(?!\d+$)[\p{L}\p{N}_]{8,30}$/gu,
            {message:'Username must have 8-30 characters (could include \'_\'), must include at least one letter and one number, whitespace characters not admitted'}
        ),
        name:z.string().regex(
            /^[\p{L} ]{2,30}$/gu,
            {message:'Name must have 2-30 characters in the following range: a-z'}
        ),
        email:z.string().email(
            {message:'Invalid field, send a proper email'}
        ),
        password:z.string().regex(
            /^(?=.*\d)(?=.*[!@#$\-%^&*])[\p{L}\p{N}_\-!@#$%^&*]{8,20}$/gu,
            { message: "Password must have 8-20 characters, must contain at least one letter, one number, and one special character(!,@,#,$,%,^,& or *)" }
        ),
    }
);

export const loginUserBodySchema = z.object(
    {
        email:z.string().email(
            {message:'Invalid field, send a proper email'}
        ),
        password:z.string().min(1,{message:'You must send a password'})
    }
)

export const updateUserBodySchema = z.object(
    {
        profile_border_color: z.string().regex(
            /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/,
            {
                message:'The profile border color must be in HEX format'   
            }

        ).optional(),
        interface_color: z.string().regex(
            /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/,
            {
                message:'The interface color must be in HEX format'   
            }

        ).optional(),
        password:z.string().regex(
            /^(?=.*\d)(?=.*[!@#$\-%^&*])[\p{L}\p{N}_\-!@#$%^&*]{8,20}$/gu,
            { message: "Password must have 8-20 characters, must contain at least one letter, one number, and one special character(!,@,#,$,%,^,& or *)" }
        ).optional(),
    }
)