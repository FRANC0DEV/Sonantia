import userRouter from "./users";
import artistRouter from "./artist";
import musicRouter from "./music";

export {userRouter,artistRouter,musicRouter};

//creating swagger security component
/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */