//console.log('Hello World');

import { envs } from "./config/envs.js";
import { MongoDatabase } from "./data/mongodb/mongo-database.js";
import { AppRoutes } from "./pesentation/routes.js";
import { Server } from "./pesentation/server.js";

(() => {
  main();
})()



async function main (){

  await MongoDatabase.connect({
    dbName: envs.MONGO_DB_NAME,
    mongoUrl: envs.MONGO_URL
  })


  new Server({
    port: envs.PORT,
    routes: AppRoutes.routes
  })
    .start();

}

