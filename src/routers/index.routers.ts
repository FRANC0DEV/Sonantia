import userRouter from "./users";
import artistRouter from "./artist";
import songRouter from "./songs";
import listenerRouter from "./listeners";
export {userRouter,artistRouter,songRouter, listenerRouter};

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