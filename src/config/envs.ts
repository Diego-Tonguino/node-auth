import 'dotenv/config';
import envVar from 'env-var'; 

export const envs = {


    PORT: envVar.get('PORT').required().asPortNumber(),


    MONGO_URL: envVar.get('MONGO_URL').required().asString(),//mongo-user:123456@localhost:27017
    MONGO_DB_NAME: envVar.get('MONGO_DB_NAME').required().asString(),//mystore


   JWT_SEED: envVar.get('JWT_SEED').required().asString(),

}