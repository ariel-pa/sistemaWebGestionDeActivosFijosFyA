import { getConnection } from "../database/database";
import qrcode from "qrcode";
import PDF from "html-pdf";
var fs = require("fs");
var path = require("path"); //obtener imagen
export async function postAltaActivo(req, res) {
  try {
    const data = req.body;
    // console.log(data);
    //Consulta Procedimiento Almacenado
    const connection = await getConnection();
    if (data.CodProyecto != 1) {
      //validar si es con proyecto
      await connection.query(
        "CALL PA_AltaActivosFijos(?, ?, ?, ?)",
        [data.CodEmpleado, data.CodActivo, data.CodAmbiente, data.CodProyecto],
        async (err, altaactivo_save) => {
          if (altaactivo_save) {
            //Consultas para generar el QR
            const responsable = await connection.query(
              "SELECT em.Nombres,em.Apellidos,tip.NombreActivo, am.NombreAmb, ac.idActivo, ac.Descripcion,con.Nombre as Condicion, ed.NombreEdi, prog.NombreProg, pro.NombrePro as Proyecto from altaactivos al INNER JOIN empleados em ON em.idEmpleado=al.idEmpleado INNER JOIN ambientes am ON am.idAmbiente=al.idAmbiente INNER JOIN edificios ed ON ed.idEdificio= am.idEdificio INNER JOIN activos ac ON ac.idActivo=al.idActiv INNER JOIN tiposactivos tip ON tip.idTipo=ac.idTipo INNER JOIN proyectos pro ON pro.idProyecto=al.idProyecto INNER JOIN programas prog ON prog.idPrograma=pro.idPrograma INNER JOIN condiciones con ON con.idCondicion=ac.idCondicion WHERE al.idActiv= ? ",
              data.CodActivo
            );
            // console.log(responsable);
            const altaQR = {
              Institucion: "Fe Y Alegria Chuquisaca",
              Fecha: new Date().toLocaleDateString(),
              Edificio: responsable[0].NombreEdi,
              Ambiente: responsable[0].NombreAmb,
              Responsable:
                responsable[0].Nombres + " " + responsable[0].Apellidos,
              // Proyecto: responsable[0].Proyecto,
              // ActivoFijo: responsable[0].NombreActivo,
              ActivoFijo: responsable[0].Descripcion,
              Condicion: responsable[0].Condicion,
              CodigoActivoFijo: responsable[0].idActivo,
            };
            var stringifiedObj = Object.entries(altaQR)
              .map((x) => x.join(":"))
              .join("\n");
            const Qr = await qrcode.toDataURL(stringifiedObj);
            await connection.query(
              "UPDATE altaactivos SET QR = ? WHERE idActiv = ?",
              [Qr, data.CodActivo],
              (err, QR_save) => {
                if (QR_save) {
                  res.status(200).send({
                    message: "Alta de activo fijo exitosa",
                    altaactivo: altaactivo_save,
                  });
                } else {
                  res
                    .status(403)
                    .send({ error: "No se logro dar de alta el activo fijo" });
                }
              }
            );
          }
        }
      );
    } else {
      await connection.query(
        "CALL PA_AltaActivosFijos(?, ?, ?, ?)",
        [data.CodEmpleado, data.CodActivo, data.CodAmbiente, data.CodProyecto],
        async (err, altaactivo_save) => {
          if (altaactivo_save) {
            //Consultas para generar el QR
            const responsable = await connection.query(
              "SELECT em.Nombres,em.Apellidos,tip.NombreActivo, ac.idActivo, ac.Descripcion,con.Nombre as Condicion, ed.NombreEdi, prog.NombreProg, pro.NombrePro as Proyecto from altaactivos al INNER JOIN empleados em ON em.idEmpleado=al.idEmpleado INNER JOIN ambientes am ON am.idAmbiente=al.idAmbiente INNER JOIN edificios ed ON ed.idEdificio= am.idEdificio INNER JOIN activos ac ON ac.idActivo=al.idActiv INNER JOIN tiposactivos tip ON tip.idTipo=ac.idTipo INNER JOIN proyectos pro ON pro.idProyecto=al.idProyecto INNER JOIN programas prog ON prog.idPrograma=pro.idPrograma INNER JOIN condiciones con ON con.idCondicion=ac.idCondicion WHERE al.idActiv= ? ",
              data.CodActivo
            );
            const altaQR = {
              Institucion: "Fe Y Alegria Chuquisaca",
              Fecha: new Date().toLocaleDateString(),
              Edificio: responsable[0].NombreEdi,
              // Proyecto: responsable[0].Proyecto,
              Responsable:
                responsable[0].Nombres + " " + responsable[0].Apellidos,
              ActivoFijo: responsable[0].NombreActivo,
              Descripcion: responsable[0].Descripcion,
              Condicion: responsable[0].Condicion,
              Codigo_Activo: responsable[0].idActivo,
            };
            var stringifiedObj = Object.entries(altaQR)
              .map((x) => x.join(":"))
              .join("\n");
            const Qr = await qrcode.toDataURL(stringifiedObj);
            await connection.query(
              "UPDATE altaactivos SET QR = ? WHERE idActiv = ?",
              [Qr, data.CodActivo],
              (err, QR_save) => {
                if (QR_save) {
                  res.status(200).send({
                    message: "Alta de activo exitosa",
                    altaactivo: altaactivo_save,
                  });
                } else {
                  res
                    .status(403)
                    .send({ error: "No se logro dar de alta el activo" });
                }
              }
            );
          }
        }
      );
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
}
 
//pasar el id del empleado para ver el detalle de alta de activo
export async function getDetalleAltaActivoById(req, res) {
  try {
    const id = req.params.id;
    // console.log(id);
    const connection = await getConnection();
    await connection.query(
      "SELECT * FROM altaactivos al INNER JOIN activos ac ON ac.idActivo=al.idActiv INNER JOIN tiposactivos tip ON tip.idTipo = ac.idTipo INNER JOIN condiciones con ON con.idCondicion= ac.idCondicion WHERE al.idEmpleado = ?",
      id,
      (err, alta_detalle) => {
        if (alta_detalle[0]) {
          res.status(200).send({ detallealta: alta_detalle });
        } else {
          res
            .status(404)
            .send({ message: "No hay registro de alta del empleado" });
        }
      }
    );
    res.status(200).send({ altaactivo: resultado });
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function deleteAltaActivo(req, res) {
  try {
    const id = req.params.id;
    const connection = await getConnection();
    //selecionar activo
    const resultado = await connection.query(
      "SELECT idActiv FROM altaactivos WHERE idAlta = ?",
      id
    );

    //Cambiar estado
    const idActivo = resultado[0].idActiv;
    await connection.query(
      "UPDATE activos SET EstadoAlta = true WHERE idActivo= ?",
      idActivo
    );

    //eliminar
    await connection.query("DELETE FROM altaactivos WHERE idAlta= ?", id);
    res.status(200).send({ message: "Alta de activo eliminado exitosamente" });
  } catch (error) {
    res.status(500).send(error.message);
  }
}



export async function getAltaActivos(req, res) {
  try {
    const connection = await getConnection();
    await connection.query(
      "SELECT * FROM altaactivos al INNER JOIN empleados em ON al.idEmpleado=em.idEmpleado",
      (err, data_alta) => {
        if (data_alta) {
          res.status(200).send({ altaactivo: data_alta });
        } else {
          res.status(404).send({
            message: "No hay ningun registro de alta de acivos fijos",
          });
        }
      }
    );
  } catch (error) {
    res.status(500).send(error.message);
  }
}

//alta con empleados
export async function getEmpleadoAltaActivo(req, res) {
  try {
    const connection = await getConnection();
    // await connection.query("SELECT distinct em.idEmpleado, Nombres, Apellidos, Cargo, Telefono  FROM altaactivos al INNER JOIN empleados em  ON em.idEmpleado=al.idEmpleado", (err, data_empleados)=>{
    await connection.query(
      "SELECT  distinct(al.idAmbiente),em.idEmpleado, em.Nombres, em.Apellidos, em.Cargo, em.Telefono, am.NombreAmb, ed.NombreEdi FROM altaactivos al INNER JOIN empleados em  ON em.idEmpleado=al.idEmpleado INNER JOIN ambientes am ON am.idAmbiente=al.idAmbiente INNER JOIN edificios ed ON ed.idEdificio=am.idEdificio",
      (err, data_empleados) => {
        if (data_empleados) {
          res.status(200).send({ empleadosalta: data_empleados });
        } else {
          res.status(404).send({
            message: "No hay ningun registro de empleados alta de acivos fijos",
          });
        }
      }
    );
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function getActivosAlta(req, res){
    try{
      const nombre = req.params["nombre"];
      // console.log(nombre);
      const connection = await getConnection();
      if (nombre === undefined) {
        await connection.query("SELECT * FROM activos ac INNER JOIN altaactivos alt ON alt.idActiv = ac.idActivo INNER JOIN tiposactivos tip ON ac.idTipo=tip.idTipo INNER JOIN condiciones cond ON cond.idCondicion=ac.idCondicion INNER JOIN proyectos pro ON pro.idProyecto =alt.idProyecto INNER JOIN ambientes am ON am.idAmbiente = alt.idAmbiente INNER JOIN edificios ed ON ed.idEdificio = am.idEdificio INNER JOIN empleados em ON em.idEmpleado = alt.idEmpleado WHERE ( am.NombreAmb REGEXP LOWER('') OR pro.NombrePro REGEXP LOWER('')OR ac.Descripcion REGEXP LOWER('')) order by alt.idProyecto",(err, activo_list) => {
            if (activo_list.length) {
              res.status(200).send({ altas: activo_list });
            } else {
              res.status(403).send({
                message:
                  "No hay registros asignados",
              });
            }
          }
        );
      } else {
        await connection.query("SELECT * FROM activos ac INNER JOIN altaactivos alt ON alt.idActiv = ac.idActivo INNER JOIN tiposactivos tip ON ac.idTipo=tip.idTipo INNER JOIN condiciones cond ON cond.idCondicion=ac.idCondicion INNER JOIN proyectos pro ON pro.idProyecto =alt.idProyecto INNER JOIN ambientes am ON am.idAmbiente = alt.idAmbiente INNER JOIN edificios ed ON ed.idEdificio = am.idEdificio INNER JOIN empleados em ON em.idEmpleado = alt.idEmpleado WHERE ( am.NombreAmb REGEXP LOWER('"+nombre+"') OR pro.NombrePro REGEXP LOWER('"+nombre+"') OR ac.Descripcion REGEXP LOWER('"+nombre+"')) OR em.Nombres REGEXP LOWER('"+nombre+"') order by alt.idProyecto",
          (err, activo_list) => {
            if (activo_list.length) {
              res.status(200).send({ altas: activo_list });
            } else {
              res.status(403).send({
                message:
                  "No hay registros asignados",
              });
            }
          }
        );
      }
    }catch(error){
        res.status(500).send(error.message);
    }
};

export async function getActivosAltaCodigo(req, res) {
  try {
    const nombre = req.params["nombre"];
    // console.log(nombre);
    const connection = await getConnection();
    if (nombre === undefined) {
      await connection.query(
        "SELECT * FROM activos ac INNER JOIN tiposactivos tip ON ac.idTipo=tip.idTipo INNER JOIN proveedores pro ON pro.idProveedor=ac.idProveedor INNER JOIN condiciones cond ON cond.idCondicion=ac.idCondicion WHERE ac.Estado='Activo' AND (ac.idActivo REGEXP LOWER('') OR tip.NombreActivo REGEXP LOWER('')) order by ac.idActivo ",
        (err, activo_list) => {
          if (activo_list.length) {
            res.status(200).send({ activos: activo_list });
          } else {
            res.status(403).send({
              message:
                "No hay ningun registro con el codigo o nombre del tipo de activo fijo",
            });
          }
        }
      );
    } else {
      await connection.query(
        "SELECT * FROM activos ac INNER JOIN tiposactivos tip ON ac.idTipo=tip.idTipo INNER JOIN proveedores pro ON pro.idProveedor=ac.idProveedor INNER JOIN condiciones cond ON cond.idCondicion=ac.idCondicion WHERE ac.Estado='Activo' AND (ac.idActivo REGEXP LOWER('"+nombre+"') OR tip.NombreActivo REGEXP LOWER('" +
          nombre +
          "')) order by ac.idActivo",
        (err, activo_list) => {
          if (activo_list.length) {
            res.status(200).send({ activos: activo_list });
          } else {
            res.status(403).send({
              message:
                "No hay ningun registro con el codigo o nombre del tipo de activo fijo",
            });
          }
        }
      );
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function getDatosAltaActivoById(req, res) {
  try {
    const id = req.params.id; //id =idAmbiente
    const nombre = req.params["nombre"];
    console.log(req.params);
    const connection = await getConnection();
    if (nombre == undefined) {
      await connection.query(
        "SELECT  distinct(al.idAmbiente),em.idEmpleado, em.Nombres, em.Apellidos, em.Cargo, em.Telefono, am.NombreAmb FROM altaactivos al INNER JOIN empleados em  ON em.idEmpleado=al.idEmpleado INNER JOIN ambientes am ON am.idAmbiente=al.idAmbiente WHERE al.idAmbiente = ?	",
        id,
        async (err, data_alta) => {
          if (data_alta) {
            await connection.query(
              "SELECT * FROM altaactivos al INNER JOIN ambientes am ON am.idAmbiente=al.idAmbiente INNER JOIN edificios ed ON ed.idEdificio=am.idEdificio INNER JOIN activos ac ON ac.idActivo=al.idActiv INNER JOIN tiposactivos tip ON tip.idTipo = ac.idTipo INNER JOIN condiciones con ON con.idCondicion=ac.idCondicion INNER JOIN proyectos pro ON pro.idProyecto = al.idProyecto WHERE al.idAmbiente= ? AND (pro.NombrePro REGEXP LOWER('')) order by al.idActiv asc",
              id,
              (err, detalle_alta) => {
                if (detalle_alta) {
                  res.status(200).send({
                    empleado: data_alta,
                    altaactivos: detalle_alta,
                  });
                }
              }
            );
          }
        }
      );
    } else {
      await connection.query(
        "SELECT  distinct(al.idAmbiente),em.idEmpleado, em.Nombres, em.Apellidos, em.Cargo, em.Telefono, am.NombreAmb FROM altaactivos al INNER JOIN empleados em  ON em.idEmpleado=al.idEmpleado INNER JOIN ambientes am ON am.idAmbiente=al.idAmbiente WHERE al.idAmbiente = ?	",
        id,
        async (err, data_alta) => {
          if (data_alta) {
            await connection.query(
              "SELECT * FROM altaactivos al INNER JOIN ambientes am ON am.idAmbiente=al.idAmbiente INNER JOIN edificios ed ON ed.idEdificio=am.idEdificio INNER JOIN activos ac ON ac.idActivo=al.idActiv INNER JOIN tiposactivos tip ON tip.idTipo = ac.idTipo INNER JOIN condiciones con ON con.idCondicion=ac.idCondicion INNER JOIN proyectos pro ON pro.idProyecto = al.idProyecto WHERE al.idAmbiente= ? AND (pro.NombrePro REGEXP LOWER('" +
                nombre +
                "') OR tip.NombreActivo REGEXP LOWER('" +
                nombre +
                "')OR ac.idActivo REGEXP LOWER('" +
                nombre +
                "')) order by al.idActiv asc",
              id,
              (err, detalle_alta) => {
                if (detalle_alta) {
                  res.status(200).send({
                    empleado: data_alta,
                    altaactivos: detalle_alta,
                  });
                }
              }
            );
          }
        }
      );
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
}
export async function getPDFWithQr(req, res) {
  const options = {
    format: "Letter",
    width: "8cm",
    height: "21cm",
  };
  try {
    const id = req.params.id; //id =idAmbiente
    let img =
      "data:image/png;base64,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GYWFkrXTDjLglJOkeL11A6EQIECAVQIrnGBwKFprTel33NFSvN220pKfL+yPmS7RgKBpysyUnnvuYWspeuy4Q+RJgAABAqz8WOFcSdEglHXaDTfJotffUDGXKaE0bNmNZVC41tqy2t9ukcIxoyN3AwQIEGDVwAovGNhvvXbsOJn79LMy97EnJGP2rJgHu3cGrA0O+WjVb4feepP0UEuECefgHNgAAQKsalihBQNFd9tk1E+eIlXvviezH35Mmr/4woRDIrYD37OimkbIGTZMynffVQaeebrkRg7Z8eYRIECAAKsCVnyLIQpzHn9CZt5zn9R+861k6e/m8G1fwO5Zn9CcnSWFa68lvfbeS3odsK9aCoPCLwQIECDAKoiVTjCw1qH6iy9l7JHHSsusWXFDWXNUMOSut44MPu8cqdhj98jdAAECBFh1sfIJBkVrY6MsePFlmf3gI1L53ntSqPfqtZpe11JRRoY0lJRKz33USjhofynZeCPJzAvCUQMECBBgpRQMoGXxYqn+9HOpfP8DFQ7vS83X30pBS7O5lghtzdxxe5tgLt16Kwt9zcjC8RQgQIAAAVZaweDQUldn1sO8p56Wmu++l1BTo+T07CXDb7hGylQoBAgQIECA9ljpBYND0/wFZjnU/fSzDDzrdMnMx24IECBAgADRWGUEA2iuqpLWxYsld8CAyJ2lD5p3aYW7Ls20V2VEt+uq1s7e+gY0tmpilRIMywI05zfffCMfffSR7LrrrjJixIjIk6WDGTNmyMSJE6VHjx6y1lprRe4G6CpefvllWbhwoWy55ZYydOjQyN1VB++8847U1NTIb3/728idACsb6urqjFdlZmbK+uuvL7m5uZEnneyV1NDQYEwuFuI9X1XR2toqL774opxyyiny2WefRe4mBtqTdq1Sy8ZdlZWVslitnKampshb7fHTTz/Jo48+Km+++WbkToB04NZbb5XzzjtPvvrqq8idroO+ra+vNxrp7rj//vvlpptuivwKsLTgxnvjMjhCIBrwlqeeekqefvppExJe+AoGGBQDora2NnKnI3iORpEudEXIdCcBhdmdl5dnf7OzkztOqLm5Wb744gt54IEH5J577pF7771X7rrrLuu88ePHR95qj6ysLMvPK+2XFVZmxaCgoECKi4uT7sNYaGlpsTGDsoCg7+7Iz8+XwkICvQMsLaAkfPLJJzbOoYtlLRwcr3L8youYguHzzz9v02y8DAACHzt2rFWkM8GRCN577z054YQT5JFHHknaj/nKK6/I4YcfLq+++mrS38ZCOhldKmVCMNCuf/vb3+Tqq6+268orrzTh8P3330feag/ySVf9kwX5Pvvss3LqqafKtGnTIneXYP78+aYNgVTaFmvosssuk5122kn2228/ueKKK+SZZ54xGgRLUzClu00pM0L/448/lurq6shdf3jrtTTr2BnSRVdopSg6e+65p+y+++5y9tlnmzUyZcoUe7686hcPkydPlrvvvruD1eTKi6Y/a9Ys+3cqYKy//fbb8sc//lFuuOEG8zBAG121JuHb8FNc2fHQWf/GdCXhX4WQYf7eBHBp4JeiUdwATRUM/H/84x/mz0wWX3/9tTz++OP2tyugfhDB1KlT084MkgXtOXv2bPP5bbjhhrL11lvbtdFGG0mfPn0ib3UvoPHQhwiBaED4MIFU25bvSB86fP/99+Vf//qXCU3cZmhby7u/kgEDnr6dOXNmXM2QevEeY2xFqqMf8CrQh19++aV8+umn8p///McUnX//+99GM921fr/88os8+OCD5hb2gvKi7OB+gf+kCgTjc889ZwrfkCFD5Ntvv5Ubb7zReGJX8OGHH5ryFMvDkChiCgYagIJPmjQpcicMiJoOTofZw4TpaqutJv1TOD+5Z8+e0q9fP+nVq1fkTmpg8paGhGC7A3JycuTggw82wqP9mQS94447ZLvttou80b2AwBozZoyZo9HAmoDY0WJSAdoZk2IXXHCBnHXWWTYJ/NZbb8lDDz3ka6F0ZzCecEvRv4kww9dee83qujKgoqLCNONLLrnEFJ0ff/zRFAY8Bt0V+NwR5n7BIzDf6667zug7VdAG7777rhx55JE2vg877DD573//22XBgJsSOoM/dgUxXUlOE4/2XWNC4f9GC0Br6wr22GMPI37My2QB80RAHXTQQZE7qQHBQAfTKd0FWA6084oAXIFoVSNHjozcCYN7tC0Ev++++0buJg/aAeF/zjnnyH333SdbbLGF+b67qwsiXcAqwuJaGUBf4To59NBDza202WabGeNlfqy7YocddjC+cM0110TuLMHzzz9vdbr++usjd5IHFiGCB1663nrrWbADVgrutq4Al9Tf//53K39X0OkcA1or5q8D9zFR8JHyPJk5Br+BXFRU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";
    const connection = await getConnection();

    await connection.query(
      "SELECT  distinct(al.idAmbiente),em.idEmpleado, em.Nombres, em.Apellidos, em.Cargo, em.Telefono, am.NombreAmb FROM altaactivos al INNER JOIN empleados em  ON em.idEmpleado=al.idEmpleado INNER JOIN ambientes am ON am.idAmbiente=al.idAmbiente WHERE al.idAmbiente = ?	",
      id,
      async (err, data_alta) => {
        if (data_alta) {
          await connection.query(
            "  SELECT * FROM altaactivos al WHERE al.idAmbiente= ?",
            id,
            (err, detalle_alta) => {
              if (detalle_alta) {
                let html = ``;
                for (let i = 0; i < detalle_alta.length; i++) {
                  html += `<div> <img float:left src="${detalle_alta[i].Qr}" height="100" width="100" > <img float:right src="${img}" height="90" width="170"></div>`;
                }
                //console.log(htm
                PDF.create(html, options).toStream((err, stream) => {
                  if (err) return res.end(err.stack);
                  res.writeHead(200, {
                    "Content-Type": "application/pdf",
                    "Content-Disposition": `attachment;filename=${Date.now()}.pdf`,
                  });
                  stream.pipe(res);
                });

                // res.status(200).send({
                //     empleado: data_alta,
                //     altaactivos: detalle_alta,
                // });
              }
            }
          );
        }
      }
    );
  } catch (error) {
    res.status(500).send(error.message);
  }
}

// export async function getPDFAltas(req, res) {
//   const options = {
//     format: "Letter",
//     //width: "21cm",
//    // height: "cm",
//   };
//   const datos = [
//     {
//       Anio: 0,
//       Codificacion: "FYA_CH-01-02-01-05",
//       Descripcion: "Impresora laser HP JETP1102W",
//       DescripcionAmb: "Área de contabilidad y admintración",
//       DescripcionMant: "Cada 3 meses",
//       Direccion: "Hospital Universitario",
//       Estado: "En uso",
//     },
//     {
//       Anio: 0,
//       Codificacion: "FYA_CH-01-02-01-05",
//       Descripcion: "Impresora laser HP JETP1102W",
//       DescripcionAmb: "Área de contabilidad y admintración",
//       DescripcionMant: "Cada 3 meses",
//       Direccion: "Hospital Universitario",
//       Estado: "En uso",
//     },
//     {
//       Anio: 0,
//       Codificacion: "FYA_CH-01-02-01-05",
//       Descripcion: "Impresora laser HP JETP1102W",
//       DescripcionAmb: "Área de contabilidad y admintración",
//       DescripcionMant: "Cada 3 meses",
//       Direccion: "Hospital Universitario",
//       Estado: "En uso",
//     },
//     {
//       Anio: 0,
//       Codificacion: "FYA_CH-01-02-01-05",
//       Descripcion: "Impresora laser HP JETP1102W",
//       DescripcionAmb: "Área de contabilidad y admintración",
//       DescripcionMant: "Cada 3 meses",
//       Direccion: "Hospital Universitario",
//       Estado: "En uso",
//     },
//     {
//       Anio: 0,
//       Codificacion: "FYA_CH-01-02-01-05",
//       Descripcion: "Impresora laser HP JETP1102W",
//       DescripcionAmb: "Área de contabilidad y admintración",
//       DescripcionMant: "Cada 3 meses",
//       Direccion: "Hospital Universitario",
//       Estado: "En uso",
//     },
//     {
//       Anio: 0,
//       Codificacion: "FYA_CH-01-02-01-05",
//       Descripcion: "Impresora laser HP JETP1102W",
//       DescripcionAmb: "Área de contabilidad y admintración",
//       DescripcionMant: "Cada 3 meses",
//       Direccion: "Hospital Universitario",
//       Estado: "En uso",
//     },
//     {
//       Anio: 0,
//       Codificacion: "FYA_CH-01-02-01-05",
//       Descripcion: "Impresora laser HP JETP1102W",
//       DescripcionAmb: "Área de contabilidad y admintración",
//       DescripcionMant: "Cada 3 meses",
//       Direccion: "Hospital Universitario",
//       Estado: "En uso",
//     },
//     {
//       Anio: 0,
//       Codificacion: "FYA_CH-01-02-01-05",
//       Descripcion: "Impresora laser HP JETP1102W",
//       DescripcionAmb: "Área de contabilidad y admintración",
//       DescripcionMant: "Cada 3 meses",
//       Direccion: "Hospital Universitario",
//       Estado: "En uso",
//     },
//     {
//       Anio: 0,
//       Codificacion: "FYA_CH-01-02-01-05",
//       Descripcion: "Impresora laser HP JETP1102W",
//       DescripcionAmb: "Área de contabilidad y admintración",
//       DescripcionMant: "Cada 3 meses",
//       Direccion: "Hospital Universitario",
//       Estado: "En uso",
//     },
//     {
//       Anio: 0,
//       Codificacion: "FYA_CH-01-02-01-05",
//       Descripcion: "Impresora laser HP JETP1102W",
//       DescripcionAmb: "Área de contabilidad y admintración",
//       DescripcionMant: "Cada 3 meses",
//       Direccion: "Hospital Universitario",
//       Estado: "En uso",
//     },
//     {
//       Anio: 0,
//       Codificacion: "FYA_CH-01-02-01-05",
//       Descripcion: "Impresora laser HP JETP1102W",
//       DescripcionAmb: "Área de contabilidad y admintración",
//       DescripcionMant: "Cada 3 meses",
//       Direccion: "Hospital Universitario",
//       Estado: "En uso",
//     },
//     {
//       Anio: 0,
//       Codificacion: "FYA_CH-01-02-01-05",
//       Descripcion: "Impresora laser HP JETP1102W",
//       DescripcionAmb: "Área de contabilidad y admintración",
//       DescripcionMant: "Cada 3 meses",
//       Direccion: "Hospital Universitario",
//       Estado: "En uso",
//     },
//     {
//       Anio: 0,
//       Codificacion: "FYA_CH-01-02-01-05",
//       Descripcion: "Impresora laser HP JETP1102W",
//       DescripcionAmb: "Área de contabilidad y admintración",
//       DescripcionMant: "Cada 3 meses",
//       Direccion: "Hospital Universitario",
//       Estado: "En uso",
//     },
//     {
//       Anio: 0,
//       Codificacion: "FYA_CH-01-02-01-05",
//       Descripcion: "Impresora laser HP JETP1102W",
//       DescripcionAmb: "Área de contabilidad y admintración",
//       DescripcionMant: "Cada 3 meses",
//       Direccion: "Hospital Universitario",
//       Estado: "En uso",
//     },
//     {
//       Anio: 0,
//       Codificacion: "FYA_CH-01-02-01-05",
//       Descripcion: "Impresora laser HP JETP1102W",
//       DescripcionAmb: "Área de contabilidad y admintración",
//       DescripcionMant: "Cada 3 meses",
//       Direccion: "Hospital Universitario",
//       Estado: "En uso",
//     },
//     {
//       Anio: 0,
//       Codificacion: "FYA_CH-01-02-01-05",
//       Descripcion: "Impresora laser HP JETP1102W",
//       DescripcionAmb: "Área de contabilidad y admintración",
//       DescripcionMant: "Cada 3 meses",
//       Direccion: "Hospital Universitario",
//       Estado: "En uso",
//     },
//     {
//       Anio: 0,
//       Codificacion: "FYA_CH-01-02-01-05",
//       Descripcion: "Impresora laser HP JETP1102W",
//       DescripcionAmb: "Área de contabilidad y admintración",
//       DescripcionMant: "Cada 3 meses",
//       Direccion: "Hospital Universitario",
//       Estado: "En uso",
//     },
//     {
//       Anio: 0,
//       Codificacion: "FYA_CH-01-02-01-05",
//       Descripcion: "Impresora laser HP JETP1102W",
//       DescripcionAmb: "Área de contabilidad y admintración",
//       DescripcionMant: "Cada 3 meses",
//       Direccion: "Hospital Universitario",
//       Estado: "En uso",
//     },
//     {
//       Anio: 0,
//       Codificacion: "FYA_CH-01-02-01-05",
//       Descripcion: "Impresora laser HP JETP1102W",
//       DescripcionAmb: "Área de contabilidad y admintración",
//       DescripcionMant: "Cada 3 meses",
//       Direccion: "Hospital Universitario",
//       Estado: "En uso",
//     },
//     {
//       Anio: 0,
//       Codificacion: "FYA_CH-01-02-01-05",
//       Descripcion: "Impresora laser HP JETP1102W",
//       DescripcionAmb: "Área de contabilidad y admintración",
//       DescripcionMant: "Cada 3 meses",
//       Direccion: "Hospital Universitario",
//       Estado: "En uso",
//     },
//     {
//       Anio: 0,
//       Codificacion: "FYA_CH-01-02-01-05",
//       Descripcion: "Impresora laser HP JETP1102W",
//       DescripcionAmb: "Área de contabilidad y admintración",
//       DescripcionMant: "Cada 3 meses",
//       Direccion: "Hospital Universitario",
//       Estado: "En uso",
//     },
//     {
//       Anio: 0,
//       Codificacion: "FYA_CH-01-02-01-05",
//       Descripcion: "Impresora laser HP JETP1102W",
//       DescripcionAmb: "Área de contabilidad y admintración",
//       DescripcionMant: "Cada 3 meses",
//       Direccion: "Hospital Universitario",
//       Estado: "En uso",
//     },
//     {
//       Anio: 0,
//       Codificacion: "FYA_CH-01-02-01-05",
//       Descripcion: "Impresora laser HP JETP1102W",
//       DescripcionAmb: "Área de contabilidad y admintración",
//       DescripcionMant: "Cada 3 meses",
//       Direccion: "Hospital Universitario",
//       Estado: "En uso",
//     },
//   ];
//   try {
//     let html = `<table border="1">`;
//     for (let i = 0; i < datos.length; i++) {
//       html += `<tr>`;
//       for (let j = 0; j < Object.values(datos[i]).length; j++) {
//         html += `<td>${datos[i][j]}</td>`;
//       }
//       html += `</tr>`;
//     }
//     html += `</table>`;
//     PDF.create(html, options).toStream((err, stream) => {
//       if (err) return res.end(err.stack);
//       res.writeHead(200, {
//         "Content-Type": "application/pdf",
//         "Content-Disposition": `attachment;filename=${Date.now()}.pdf`,
//       });
//       stream.pipe(res);
//     });
//   } catch (error) {
//     res.status(500).send(error.message);
//   }
// }

export async function getActivosAltaFiltroFecha(req, res){
  try{
    const fecha = req.params["fecha"];
    // console.log(nombre);
    const connection = await getConnection();
    if (fecha === undefined) {
      await connection.query("SELECT * FROM activos ac INNER JOIN altaactivos alt ON alt.idActiv = ac.idActivo INNER JOIN tiposactivos tip ON ac.idTipo=tip.idTipo INNER JOIN condiciones cond ON cond.idCondicion=ac.idCondicion INNER JOIN proyectos pro ON pro.idProyecto =alt.idProyecto INNER JOIN ambientes am ON am.idAmbiente = alt.idAmbiente INNER JOIN edificios ed ON ed.idEdificio = am.idEdificio INNER JOIN empleados em ON em.idEmpleado = alt.idEmpleado WHERE ( am.NombreAmb REGEXP LOWER('') OR pro.NombrePro REGEXP LOWER('')OR ac.Descripcion REGEXP LOWER('')) order by alt.idProyecto",(err, activo_list) => {
          if (activo_list.length) {
            res.status(200).send({ altas: activo_list });
          } else {
            res.status(403).send({
              message:
                "No hay registros asignados",
            });
          }
        }
      );
    } else {
      await connection.query(`SELECT * FROM activos ac INNER JOIN altaactivos alt ON alt.idActiv = ac.idActivo INNER JOIN tiposactivos tip ON ac.idTipo=tip.idTipo INNER JOIN condiciones cond ON cond.idCondicion=ac.idCondicion INNER JOIN proyectos pro ON pro.idProyecto =alt.idProyecto INNER JOIN ambientes am ON am.idAmbiente = alt.idAmbiente INNER JOIN edificios ed ON ed.idEdificio = am.idEdificio INNER JOIN empleados em ON em.idEmpleado = alt.idEmpleado WHERE alt.FechaHora >= '${fecha}' order by alt.idProyecto`,
        (err, activo_list) => {
          if (activo_list.length) {
            res.status(200).send({ altas: activo_list });
          } else {
            res.status(403).send({
              message:
                "No hay registros asignados",
            });
          }
        }
      );
    }
  }catch(error){
      res.status(500).send(error.message);
  }
};