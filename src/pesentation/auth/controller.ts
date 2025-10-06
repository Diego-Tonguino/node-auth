import type { Request, Response } from "express";
import { AuthRepository, CustomError, LoginUser, LoginUserDto, RegisterUser, RegisterUserDto } from "../../domain/index.js";
import { error } from "console";
import { JwtAdapter } from "../../config/jwt.js";
import { UserModel } from "../../data/mongodb/index.js";


export class AuthController {

//DI
constructor(
    private readonly authRepository: AuthRepository,
) {}


private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
        return res.status(error.statusCode).json({ error: error.message });
    }

    console.log(error); //Winston
    return res.status(500).json({ error: 'Internal server error' });
}

registerUser = async (request: Request, response: Response) => {
    const [error, registerUserDto] = RegisterUserDto.create(request.body);
    if (error) return response.status(400).json({ error });

    new RegisterUser(this.authRepository)
    .execute(registerUserDto!)
    .then(data => response.json(data))
    .catch(error => this.handleError(error, response));
}

loginUser = async(request: Request, response: Response) => {
    const [error, loginUserDto] = LoginUserDto.create(request.body);
    if (error) return response.status(400).json({ error });

    new LoginUser(this.authRepository)
    .execute(loginUserDto!)
    .then(data => response.json(data))
    .catch(error => this.handleError(error, response));
}

getUsers = async(request: Request, response: Response) => {

    UserModel.find()
    .then(users => {
        response.json({
            //users,
        users: request.body.user
    })
        })
    .catch(error => response.status(500).json);

    }
}