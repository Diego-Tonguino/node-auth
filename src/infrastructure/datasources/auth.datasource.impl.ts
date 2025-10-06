import { UserModel } from '../../data/mongodb/index.js';
import { AuthDataSource, CustomError, LoginUserDto, RegisterUserDto, UserEntity } from '../../domain/index.js';
import { BcryptAdapter } from '../../config/bcrypt.js';
import { UserMapper } from '../mappers/user.mapper.js';

type HasFunction = (password: string) => string;
type compareFunction = (password: string, hashed: string) => boolean;


export class AuthDatasourceImpl  implements AuthDataSource {

    constructor(

        private readonly hasPassword:HasFunction = BcryptAdapter.hash,
        private readonly comparePassword:compareFunction = BcryptAdapter.compare

    ) {}
    async login(loginUserDto: LoginUserDto): Promise<UserEntity> {
        const {email, password} = loginUserDto;
        try {
            const user = await UserModel.findOne({ email });
            if (!user) throw CustomError.basRequest('User does not exist - email');

            const isMatch = this.comparePassword(password, user.password);
            if (!isMatch) throw CustomError.basRequest('password is not valid');

            return UserMapper.userEntityFromObjects(user);

        }catch (error) {

            console.log(error);
            throw CustomError.internalServer('internal server error');

        }
    
    }


   async register(registerUserDto: RegisterUserDto): Promise<UserEntity> {

    const { name, email, password } = registerUserDto;
    try {


    //1. Verificar si el correo existe
    const exists = await UserModel.findOne({ email });
    if ( exists ) throw CustomError.basRequest('User already exists'); 
    
 
    //2. Hashear la contraseña

       const user = await UserModel.create({
        name: name,
        email: email,
        password: this.hasPassword (password),
    });

    
    await user.save();


    //3. Mapear la respuesta a nuestra entidad
    return UserMapper.userEntityFromObjects(user);

    } catch (error) {


        if (error instanceof CustomError) {
            throw error;
        }
        throw CustomError.internalServer('internal server error');
        }
    }
}