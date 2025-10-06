import { Router } from "express";
import { request } from "http";
import { AuthController } from "./controller.js";
import { AuthDatasourceImpl, AuthRepositoryImpl } from "../../infrastructure/index.js";
import { AuthMiddleware } from "../middlewares/auth.middleware.js";



export class AuthRoutes {

static get routes (): Router {

const router = Router();

const datasource = new AuthDatasourceImpl();

const authRepository = new AuthRepositoryImpl(datasource);

const controller = new AuthController(authRepository);


///Definir todas mis rutas principales
router.post('/login', controller.loginUser )
router.post('/register', controller.registerUser)

router.get('/', [AuthMiddleware.validateJWT] ,controller.getUsers)

//router.use('/api/users');
//router.use('/api/products');
//router.use('/api/clients');
//router.use('/api/orders');


    return router;

    }

}