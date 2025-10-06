import { CustomError, UserEntity } from "../../domain/index.js";


export class UserMapper {

    static userEntityFromObjects(object: { [key: string]: any} ){
        
        const {id, _id, name, email, password, roles} = object; 

        if ( !_id || !id) {
            throw CustomError.basRequest('Missing id');
        }

        if ( !name ) {
            throw CustomError.basRequest('Missing name');
        }

        if ( !email ) {
            throw CustomError.basRequest('Missing email');
        }

        if ( !password ) {
            throw CustomError.basRequest('Missing password');
        }

        if ( !roles ) {
            throw CustomError.basRequest('Missing roles');
        }


        return new UserEntity(
            _id || id,
            name,
            email,
            password,
            roles
        );
    }
}