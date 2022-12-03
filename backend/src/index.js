import app from './app';

import mysql, { Connection } from "promise-mysql";
import config from "./config";
import mysqldump from "mysqldump";

async function main(){

//    mysqldump({
//     connection:{
//         host: config.host,
//         database: config.database,
//         user: config.user,
//         password: config.password
//     },
//     dumpToFile: 'C:/backups/dump.sql',
//     });

    await app.listen(app.get("port"));
    console.log(`Server on port ${app.get("port")}`);
};

main(); 