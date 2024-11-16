import swaggerJSDoc, {Options} from "swagger-jsdoc";
import path from "path";

const options:Options = {
    definition:{
        openapi:'3.0.0',
        info:{
            title:'Sonantia Music API Documentation',
            version:'1.0.0',
        }
    },
    apis:[`${path.join(__dirname,'./routers/*')}`]//le quite el ts.
}

const swaggerSpec = swaggerJSDoc(options);
// console.log(swaggerSpec);

export default swaggerSpec;