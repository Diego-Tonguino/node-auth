


import type { LoginUserDto } from '../dtos/auth/login-user.dto.js';
import type { RegisterUserDto } from '../dtos/auth/register-user.dto.js';
import { UserEntity } from '../entities/user.entity.js';

export abstract class AuthRepository {

    //todo:
    abstract login (loginUserDto: LoginUserDto): Promise<UserEntity>;

    abstract register (registerUserDto: RegisterUserDto): Promise<UserEntity>;

}