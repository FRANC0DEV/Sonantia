import userRouter from "./users";
import artistRouter from "./artists";
import songRouter from "./songs";
import listenerRouter from "./listeners";
import genreRouter from "./genres";
export {userRouter,artistRouter,songRouter, listenerRouter, genreRouter};

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