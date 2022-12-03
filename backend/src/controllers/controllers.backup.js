import mysql, { Connection } from "promise-mysql";
import config from "../config";
import mysqldump from "mysqldump";
import * as path from 'path';
export async function backups(req, res) {
  const { urlLocal } = req.body;
  // console.log(urlLocal);
  try {
    let date = new Date();
    let output = date.toISOString().split("T")[0];
    //let backup = "C:/backups/" + output + " BackupActivosFijos.sql";
    let backup = path.join(__dirname, "../backups", `${output}BackupActivosFijos.sql` );
    const result = await mysqldump({
      connection: {
        host: config.host,
        database: config.database,
        user: config.user,
        password: config.password,
      },
      dumpToFile: backup,
    });
    var options = {
        root: path.join(__dirname, "../backups")
    };
    if(result)
        res.status(200).sendFile(`${output}BackupActivosFijos.sql`,options);
    else
        res.status(500).json({message:"Algo salio mal"})
  } catch (error) {
    res.status(500).send(error.message);
  }
}
