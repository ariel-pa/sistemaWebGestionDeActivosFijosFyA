/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: activos
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `activos` (
  `idActivo` int(11) NOT NULL AUTO_INCREMENT,
  `idTipo` int(11) NOT NULL,
  `Imagen` varchar(200) NOT NULL,
  `Factura` varchar(270) NOT NULL,
  `Garantia` varchar(255) DEFAULT '-',
  `Procedencia` varchar(50) NOT NULL,
  `Descripcion` text DEFAULT NULL,
  `FechaRegistro` datetime NOT NULL DEFAULT current_timestamp(),
  `ValorRegistro` decimal(11, 2) DEFAULT NULL,
  `ValorActual` decimal(11, 2) DEFAULT 0.00,
  `VidaUtilActual` int(11) DEFAULT 0,
  `Observaciones` text DEFAULT '-',
  `UfvInicial` decimal(11, 6) DEFAULT 0.000000,
  `Estado` varchar(50) DEFAULT 'Activo',
  `Anio` int(11) DEFAULT 0,
  `Mes` int(11) DEFAULT 0,
  `idCondicion` int(11) DEFAULT NULL,
  `idRubro` int(11) DEFAULT NULL,
  `idProveedor` int(11) DEFAULT NULL,
  PRIMARY KEY (`idActivo`),
  KEY `idCondicion` (`idCondicion`),
  KEY `idRubro` (`idRubro`),
  KEY `idProveedor` (`idProveedor`),
  CONSTRAINT `idCondicion` FOREIGN KEY (`idCondicion`) REFERENCES `condiciones` (`idCondicion`),
  CONSTRAINT `idProveedor` FOREIGN KEY (`idProveedor`) REFERENCES `proveedores` (`idProveedor`),
  CONSTRAINT `idRubro` FOREIGN KEY (`idRubro`) REFERENCES `rubros` (`idRubro`)
) ENGINE = InnoDB AUTO_INCREMENT = 27 DEFAULT CHARSET = utf8mb4;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: altaactivos
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `altaactivos` (
  `idAlta` int(11) NOT NULL AUTO_INCREMENT,
  `Codificacion` varchar(150) DEFAULT NULL,
  `FechaHora` datetime NOT NULL DEFAULT current_timestamp(),
  `Qr` text DEFAULT NULL,
  `idActiv` int(11) NOT NULL,
  `idEmpleado` int(11) DEFAULT NULL,
  `idProyecto` int(11) DEFAULT NULL,
  `idAmbiente` int(11) DEFAULT NULL,
  PRIMARY KEY (`idAlta`),
  KEY `idActiv` (`idActiv`),
  KEY `idProyecto` (`idProyecto`),
  KEY `idEmpleado` (`idEmpleado`),
  KEY `idAmbiente` (`idAmbiente`),
  CONSTRAINT `idActiv` FOREIGN KEY (`idActiv`) REFERENCES `activos` (`idActivo`),
  CONSTRAINT `idAmbiente` FOREIGN KEY (`idAmbiente`) REFERENCES `ambientes` (`idAmbiente`),
  CONSTRAINT `idEmpleado` FOREIGN KEY (`idEmpleado`) REFERENCES `empleados` (`idEmpleado`),
  CONSTRAINT `idProyecto` FOREIGN KEY (`idProyecto`) REFERENCES `proyectos` (`idProyecto`)
) ENGINE = InnoDB AUTO_INCREMENT = 37 DEFAULT CHARSET = utf8mb4;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: ambientes
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `ambientes` (
  `idAmbiente` int(11) NOT NULL AUTO_INCREMENT,
  `NombreAmb` varchar(150) NOT NULL,
  `DescripcionAmb` text DEFAULT NULL,
  `idEdificio` int(11) NOT NULL,
  PRIMARY KEY (`idAmbiente`),
  KEY `idEdificio` (`idEdificio`),
  CONSTRAINT `idEdificio` FOREIGN KEY (`idEdificio`) REFERENCES `edificios` (`idEdificio`)
) ENGINE = InnoDB AUTO_INCREMENT = 11 DEFAULT CHARSET = utf8mb4;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: bajas
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `bajas` (
  `idBaja` int(11) NOT NULL AUTO_INCREMENT,
  `FechaBaja` datetime NOT NULL DEFAULT current_timestamp(),
  `Motivo` varchar(400) DEFAULT NULL,
  `idActi` int(11) NOT NULL,
  PRIMARY KEY (`idBaja`),
  KEY `idActi` (`idActi`),
  CONSTRAINT `idActi` FOREIGN KEY (`idActi`) REFERENCES `activos` (`idActivo`)
) ENGINE = InnoDB AUTO_INCREMENT = 4 DEFAULT CHARSET = utf8mb4;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: condiciones
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `condiciones` (
  `idCondicion` int(11) NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`idCondicion`)
) ENGINE = InnoDB AUTO_INCREMENT = 7 DEFAULT CHARSET = utf8mb4;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: depreciaciones
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `depreciaciones` (
  `idDepreciacion` int(11) NOT NULL AUTO_INCREMENT,
  `UfvActual` decimal(11, 6) DEFAULT NULL,
  `UfvInicial` decimal(11, 6) DEFAULT NULL,
  `Fecha` datetime NOT NULL DEFAULT current_timestamp(),
  `ValorContabilizado` decimal(11, 2) DEFAULT NULL,
  `FactorActual` decimal(11, 6) DEFAULT NULL,
  `ValorActualizado` decimal(11, 2) DEFAULT NULL,
  `IncrementoActual` decimal(11, 2) DEFAULT NULL,
  `DepreciacionAcuAnt` decimal(11, 2) DEFAULT NULL,
  `IncrementoDepAcu` decimal(11, 2) DEFAULT NULL,
  `DepreciacionPeriodo` decimal(11, 2) DEFAULT NULL,
  `DepreciacionAcuAct` decimal(11, 2) DEFAULT NULL,
  `ValorNeto` decimal(11, 2) DEFAULT NULL,
  `PorcentajeDep` decimal(11, 2) DEFAULT NULL,
  `VidaUtilActual` int(11) DEFAULT NULL,
  `VidaUtilMes` int(11) DEFAULT NULL,
  `idActivo` int(11) NOT NULL,
  PRIMARY KEY (`idDepreciacion`),
  KEY `idActivo` (`idActivo`),
  CONSTRAINT `idActivo` FOREIGN KEY (`idActivo`) REFERENCES `activos` (`idActivo`)
) ENGINE = InnoDB AUTO_INCREMENT = 25 DEFAULT CHARSET = utf8mb4;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: devoluciones
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `devoluciones` (
  `idDevolucion` int(11) NOT NULL AUTO_INCREMENT,
  `CodActivo` int(11) DEFAULT NULL,
  `CodEmpleado` int(11) DEFAULT NULL,
  `idCondici` int(11) DEFAULT NULL,
  `Motivo` varchar(200) DEFAULT NULL,
  `FechaDevolucion` datetime NOT NULL DEFAULT current_timestamp(),
  `Proyecto` text DEFAULT NULL,
  `Observaciones` text DEFAULT NULL,
  PRIMARY KEY (`idDevolucion`),
  KEY `idCondici` (`idCondici`),
  CONSTRAINT `idCondici` FOREIGN KEY (`idCondici`) REFERENCES `condiciones` (`idCondicion`)
) ENGINE = InnoDB AUTO_INCREMENT = 21 DEFAULT CHARSET = utf8mb4;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: edificios
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `edificios` (
  `idEdificio` int(11) NOT NULL AUTO_INCREMENT,
  `NombreEdi` varchar(300) DEFAULT NULL,
  `Servicio` text DEFAULT NULL,
  `Direccion` varchar(100) DEFAULT NULL,
  `idUbicacion` int(11) NOT NULL,
  PRIMARY KEY (`idEdificio`),
  KEY `idUbicacion` (`idUbicacion`),
  CONSTRAINT `idUbicacion` FOREIGN KEY (`idUbicacion`) REFERENCES `ubicaciones` (`idUbicacion`)
) ENGINE = InnoDB AUTO_INCREMENT = 9 DEFAULT CHARSET = utf8mb4;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: empleados
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `empleados` (
  `idEmpleado` int(11) NOT NULL AUTO_INCREMENT,
  `Nombres` varchar(50) NOT NULL,
  `Apellidos` varchar(100) NOT NULL,
  `Cargo` varchar(100) NOT NULL,
  `Telefono` varchar(15) NOT NULL,
  `Direccion` varchar(200) DEFAULT NULL,
  `idAmbient` int(11) NOT NULL,
  PRIMARY KEY (`idEmpleado`),
  KEY `idAmbient` (`idAmbient`),
  CONSTRAINT `idAmbient` FOREIGN KEY (`idAmbient`) REFERENCES `ambientes` (`idAmbiente`)
) ENGINE = InnoDB AUTO_INCREMENT = 7 DEFAULT CHARSET = utf8mb4;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: historialactivofijo
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `historialactivofijo` (
  `idHistorial` int(11) NOT NULL AUTO_INCREMENT,
  `FechaHistorial` datetime NOT NULL DEFAULT current_timestamp(),
  `CodActivo` int(11) DEFAULT NULL,
  `CodEmpleado` int(11) DEFAULT NULL,
  `CodProyecto` int(11) DEFAULT NULL,
  `CodAmbiente` int(11) DEFAULT NULL,
  PRIMARY KEY (`idHistorial`)
) ENGINE = InnoDB AUTO_INCREMENT = 23 DEFAULT CHARSET = utf8mb4;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: mantenimiento
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `mantenimiento` (
  `idMant` int(11) NOT NULL AUTO_INCREMENT,
  `FechaMant` date NOT NULL,
  `Informe` varchar(400) DEFAULT NULL,
  `Costo` decimal(11, 2) DEFAULT NULL,
  `Estado` varchar(50) DEFAULT NULL,
  `idAct` int(11) NOT NULL,
  PRIMARY KEY (`idMant`),
  KEY `idAct` (`idAct`),
  CONSTRAINT `idAct` FOREIGN KEY (`idAct`) REFERENCES `activos` (`idActivo`)
) ENGINE = InnoDB AUTO_INCREMENT = 12 DEFAULT CHARSET = utf8mb4;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: programas
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `programas` (
  `idPrograma` int(11) NOT NULL AUTO_INCREMENT,
  `NombreProg` varchar(150) NOT NULL,
  PRIMARY KEY (`idPrograma`)
) ENGINE = InnoDB AUTO_INCREMENT = 9 DEFAULT CHARSET = utf8mb4;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: proveedores
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `proveedores` (
  `idProveedor` int(11) NOT NULL AUTO_INCREMENT,
  `NombreProv` varchar(70) DEFAULT NULL,
  `DireccionProv` varchar(200) DEFAULT NULL,
  `TelefonoProv` varchar(15) DEFAULT NULL,
  PRIMARY KEY (`idProveedor`)
) ENGINE = InnoDB AUTO_INCREMENT = 6 DEFAULT CHARSET = utf8mb4;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: proyectos
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `proyectos` (
  `idProyecto` int(11) NOT NULL AUTO_INCREMENT,
  `NombrePro` text DEFAULT NULL,
  `FechaInicio` date DEFAULT NULL,
  `FechaFin` date DEFAULT NULL,
  `idPrograma` int(11) DEFAULT NULL,
  PRIMARY KEY (`idProyecto`),
  KEY `idPrograma` (`idPrograma`),
  CONSTRAINT `idPrograma` FOREIGN KEY (`idPrograma`) REFERENCES `programas` (`idPrograma`)
) ENGINE = InnoDB AUTO_INCREMENT = 15 DEFAULT CHARSET = utf8mb4;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: revalorizaciones
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `revalorizaciones` (
  `idRevalorizacion` int(11) NOT NULL AUTO_INCREMENT,
  `CodActivo` int(11) NOT NULL,
  `FechaRev` datetime NOT NULL DEFAULT current_timestamp(),
  `ValorNuevo` decimal(11, 2) DEFAULT NULL,
  `VidaUtilRev` int(11) DEFAULT NULL,
  `DescripcionRev` text DEFAULT NULL,
  PRIMARY KEY (`idRevalorizacion`),
  KEY `CodActivo` (`CodActivo`),
  CONSTRAINT `CodActivo` FOREIGN KEY (`CodActivo`) REFERENCES `activos` (`idActivo`)
) ENGINE = InnoDB AUTO_INCREMENT = 13 DEFAULT CHARSET = utf8mb4;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: rubros
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `rubros` (
  `idRubro` int(11) NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(50) DEFAULT NULL,
  `VidaUtil` int(11) DEFAULT NULL,
  `Depreciable` tinyint(1) DEFAULT NULL,
  `CoeficienteD` float DEFAULT NULL,
  `Actualiza` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`idRubro`)
) ENGINE = InnoDB AUTO_INCREMENT = 13 DEFAULT CHARSET = utf8mb4;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: tiposactivos
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `tiposactivos` (
  `idTipo` int(11) NOT NULL AUTO_INCREMENT,
  `NombreActivo` varchar(80) DEFAULT NULL,
  `DescripcionMant` text DEFAULT NULL,
  PRIMARY KEY (`idTipo`)
) ENGINE = InnoDB AUTO_INCREMENT = 15 DEFAULT CHARSET = utf8mb4;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: ubicaciones
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `ubicaciones` (
  `idUbicacion` int(11) NOT NULL AUTO_INCREMENT,
  `NombreLugar` varchar(150) NOT NULL,
  PRIMARY KEY (`idUbicacion`)
) ENGINE = InnoDB AUTO_INCREMENT = 10 DEFAULT CHARSET = utf8mb4;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: usuarios
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `usuarios` (
  `idUsuario` int(11) NOT NULL AUTO_INCREMENT,
  `idEmplead` int(11) DEFAULT NULL,
  `Email` varchar(100) DEFAULT NULL,
  `Password` varchar(70) DEFAULT NULL,
  `Rol` varchar(50) DEFAULT NULL,
  `Estado` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`idUsuario`),
  KEY `idEmplead` (`idEmplead`),
  CONSTRAINT `idEmplead` FOREIGN KEY (`idEmplead`) REFERENCES `empleados` (`idEmpleado`)
) ENGINE = InnoDB AUTO_INCREMENT = 3 DEFAULT CHARSET = utf8mb4;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: valordepreciacion
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `valordepreciacion` (
  `idValorDep` int(11) NOT NULL AUTO_INCREMENT,
  `Valor` int(11) DEFAULT NULL,
  `FechaValorDep` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`idValorDep`)
) ENGINE = InnoDB AUTO_INCREMENT = 5 DEFAULT CHARSET = utf8mb4;

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: activos
# ------------------------------------------------------------

INSERT INTO
  `activos` (
    `idActivo`,
    `idTipo`,
    `Imagen`,
    `Factura`,
    `Garantia`,
    `Procedencia`,
    `Descripcion`,
    `FechaRegistro`,
    `ValorRegistro`,
    `ValorActual`,
    `VidaUtilActual`,
    `Observaciones`,
    `UfvInicial`,
    `Estado`,
    `Anio`,
    `Mes`,
    `idCondicion`,
    `idRubro`,
    `idProveedor`
  )
VALUES
  (
    2,
    3,
    'gwddhKXfeZsftPUaaBBL6CKU.jpg',
    '',
    '-',
    'Compra',
    'Monitor LG Modelo: 004+PFAWPN serie NO:004+PX35088',
    '2022-01-01 00:00:00',
    16312.50,
    1.00,
    0,
    '-',
    1.288835,
    'En uso',
    0,
    0,
    1,
    4,
    1
  );
INSERT INTO
  `activos` (
    `idActivo`,
    `idTipo`,
    `Imagen`,
    `Factura`,
    `Garantia`,
    `Procedencia`,
    `Descripcion`,
    `FechaRegistro`,
    `ValorRegistro`,
    `ValorActual`,
    `VidaUtilActual`,
    `Observaciones`,
    `UfvInicial`,
    `Estado`,
    `Anio`,
    `Mes`,
    `idCondicion`,
    `idRubro`,
    `idProveedor`
  )
VALUES
  (
    3,
    3,
    'ERWr_P8-ZyD2jWotAsib86ig.jpg',
    '',
    '-',
    'Dinación',
    'CPU: POWER DELUX',
    '2022-04-01 00:00:00',
    30276.00,
    28960.85,
    0,
    '-',
    1.085930,
    'En uso',
    3,
    8,
    1,
    4,
    1
  );
INSERT INTO
  `activos` (
    `idActivo`,
    `idTipo`,
    `Imagen`,
    `Factura`,
    `Garantia`,
    `Procedencia`,
    `Descripcion`,
    `FechaRegistro`,
    `ValorRegistro`,
    `ValorActual`,
    `VidaUtilActual`,
    `Observaciones`,
    `UfvInicial`,
    `Estado`,
    `Anio`,
    `Mes`,
    `idCondicion`,
    `idRubro`,
    `idProveedor`
  )
VALUES
  (
    4,
    3,
    'mnVFA52yMIF0BPyRfK_eowgN.jpg',
    '',
    '-',
    'Donación',
    'MONITOR LG MODELO: 17056FB/27',
    '2022-06-28 00:22:15',
    0.00,
    0.00,
    0,
    '-',
    0.000000,
    'En uso',
    0,
    0,
    1,
    4,
    1
  );
INSERT INTO
  `activos` (
    `idActivo`,
    `idTipo`,
    `Imagen`,
    `Factura`,
    `Garantia`,
    `Procedencia`,
    `Descripcion`,
    `FechaRegistro`,
    `ValorRegistro`,
    `ValorActual`,
    `VidaUtilActual`,
    `Observaciones`,
    `UfvInicial`,
    `Estado`,
    `Anio`,
    `Mes`,
    `idCondicion`,
    `idRubro`,
    `idProveedor`
  )
VALUES
  (
    5,
    7,
    'm4fmMQh5wKAx-pa6Rh9vRdcU.jpg',
    '',
    NULL,
    'Donación',
    'Impresora laser HP JETP1102W',
    '2022-06-28 00:23:20',
    0.00,
    0.00,
    0,
    '-',
    0.000000,
    'En uso',
    0,
    0,
    1,
    4,
    1
  );
INSERT INTO
  `activos` (
    `idActivo`,
    `idTipo`,
    `Imagen`,
    `Factura`,
    `Garantia`,
    `Procedencia`,
    `Descripcion`,
    `FechaRegistro`,
    `ValorRegistro`,
    `ValorActual`,
    `VidaUtilActual`,
    `Observaciones`,
    `UfvInicial`,
    `Estado`,
    `Anio`,
    `Mes`,
    `idCondicion`,
    `idRubro`,
    `idProveedor`
  )
VALUES
  (
    6,
    1,
    '7MXs-11VarM1uo7EabFLBK9j.jpg',
    '',
    '-',
    'Donación',
    'Estante de madera de 6 diviciones',
    '2022-06-28 00:24:38',
    0.00,
    0.00,
    0,
    '-\r\n',
    0.000000,
    'En uso',
    0,
    0,
    1,
    2,
    1
  );
INSERT INTO
  `activos` (
    `idActivo`,
    `idTipo`,
    `Imagen`,
    `Factura`,
    `Garantia`,
    `Procedencia`,
    `Descripcion`,
    `FechaRegistro`,
    `ValorRegistro`,
    `ValorActual`,
    `VidaUtilActual`,
    `Observaciones`,
    `UfvInicial`,
    `Estado`,
    `Anio`,
    `Mes`,
    `idCondicion`,
    `idRubro`,
    `idProveedor`
  )
VALUES
  (
    8,
    7,
    'PeX1_4TBrZx7ReCohAbVjlou.jpg',
    '',
    NULL,
    'Compra',
    'Impresora HP Laser JET p1102w',
    '2022-07-05 14:07:18',
    2350.00,
    1884.45,
    0,
    '-',
    1.144430,
    'Activo',
    2,
    11,
    1,
    4,
    3
  );
INSERT INTO
  `activos` (
    `idActivo`,
    `idTipo`,
    `Imagen`,
    `Factura`,
    `Garantia`,
    `Procedencia`,
    `Descripcion`,
    `FechaRegistro`,
    `ValorRegistro`,
    `ValorActual`,
    `VidaUtilActual`,
    `Observaciones`,
    `UfvInicial`,
    `Estado`,
    `Anio`,
    `Mes`,
    `idCondicion`,
    `idRubro`,
    `idProveedor`
  )
VALUES
  (
    9,
    1,
    'U4vfPiZ6gbyMyTmhbSAivJ-N.jpg',
    '',
    '-',
    'Compra',
    'Estantes metálicos con cuatro divisiones color plomo',
    '2022-07-16 12:17:06',
    1.00,
    0.00,
    0,
    '-',
    0.000000,
    'En uso',
    0,
    0,
    2,
    2,
    1
  );
INSERT INTO
  `activos` (
    `idActivo`,
    `idTipo`,
    `Imagen`,
    `Factura`,
    `Garantia`,
    `Procedencia`,
    `Descripcion`,
    `FechaRegistro`,
    `ValorRegistro`,
    `ValorActual`,
    `VidaUtilActual`,
    `Observaciones`,
    `UfvInicial`,
    `Estado`,
    `Anio`,
    `Mes`,
    `idCondicion`,
    `idRubro`,
    `idProveedor`
  )
VALUES
  (
    10,
    1,
    '_ZEsVQhKSqJgLoUFqMY380be.jpg',
    '',
    NULL,
    'Compra',
    'Estantes metálicos con dos divisiones de color rojo',
    '2022-07-16 12:19:40',
    1.00,
    0.00,
    0,
    '-',
    0.000000,
    'En uso',
    0,
    0,
    1,
    2,
    1
  );
INSERT INTO
  `activos` (
    `idActivo`,
    `idTipo`,
    `Imagen`,
    `Factura`,
    `Garantia`,
    `Procedencia`,
    `Descripcion`,
    `FechaRegistro`,
    `ValorRegistro`,
    `ValorActual`,
    `VidaUtilActual`,
    `Observaciones`,
    `UfvInicial`,
    `Estado`,
    `Anio`,
    `Mes`,
    `idCondicion`,
    `idRubro`,
    `idProveedor`
  )
VALUES
  (
    11,
    12,
    'iSY-CX_oH6ZQ0IaQzuWGGpFC.jpg',
    '',
    '-',
    'Compra',
    'Gabetero metálico con 4 cajones de color plomo',
    '2022-07-16 12:23:49',
    1.00,
    0.00,
    0,
    '-',
    0.000000,
    'Activo',
    0,
    0,
    1,
    2,
    1
  );
INSERT INTO
  `activos` (
    `idActivo`,
    `idTipo`,
    `Imagen`,
    `Factura`,
    `Garantia`,
    `Procedencia`,
    `Descripcion`,
    `FechaRegistro`,
    `ValorRegistro`,
    `ValorActual`,
    `VidaUtilActual`,
    `Observaciones`,
    `UfvInicial`,
    `Estado`,
    `Anio`,
    `Mes`,
    `idCondicion`,
    `idRubro`,
    `idProveedor`
  )
VALUES
  (
    12,
    13,
    'GcIFR4AE9b11jK9ZnoVPg2I_.jpg',
    '',
    '-',
    'Compra',
    'Aparato telefónico Panasonic model KXT7080 Nº 2AAQBO17735',
    '2022-07-16 12:26:26',
    1.00,
    0.00,
    0,
    '-',
    0.000000,
    'En uso',
    0,
    0,
    1,
    2,
    1
  );
INSERT INTO
  `activos` (
    `idActivo`,
    `idTipo`,
    `Imagen`,
    `Factura`,
    `Garantia`,
    `Procedencia`,
    `Descripcion`,
    `FechaRegistro`,
    `ValorRegistro`,
    `ValorActual`,
    `VidaUtilActual`,
    `Observaciones`,
    `UfvInicial`,
    `Estado`,
    `Anio`,
    `Mes`,
    `idCondicion`,
    `idRubro`,
    `idProveedor`
  )
VALUES
  (
    13,
    3,
    'GqvyPCcJ8Ha8fSSgzcroOULQ.jpg',
    '',
    NULL,
    'Compra',
    'Monitor LG model: 004+PFAWPN serie NO:004+PX35088',
    '2022-07-16 12:31:11',
    1.00,
    0.00,
    0,
    '-',
    0.000000,
    'Activo',
    0,
    0,
    1,
    4,
    1
  );
INSERT INTO
  `activos` (
    `idActivo`,
    `idTipo`,
    `Imagen`,
    `Factura`,
    `Garantia`,
    `Procedencia`,
    `Descripcion`,
    `FechaRegistro`,
    `ValorRegistro`,
    `ValorActual`,
    `VidaUtilActual`,
    `Observaciones`,
    `UfvInicial`,
    `Estado`,
    `Anio`,
    `Mes`,
    `idCondicion`,
    `idRubro`,
    `idProveedor`
  )
VALUES
  (
    14,
    3,
    'T7zvu3PezS3ly5iZLrsIiMF8.jpg',
    '',
    '-',
    'Compra',
    'Teclado dell RT7050127',
    '2022-07-16 12:32:33',
    1.00,
    0.00,
    0,
    '-',
    0.000000,
    'En uso',
    0,
    0,
    1,
    4,
    1
  );
INSERT INTO
  `activos` (
    `idActivo`,
    `idTipo`,
    `Imagen`,
    `Factura`,
    `Garantia`,
    `Procedencia`,
    `Descripcion`,
    `FechaRegistro`,
    `ValorRegistro`,
    `ValorActual`,
    `VidaUtilActual`,
    `Observaciones`,
    `UfvInicial`,
    `Estado`,
    `Anio`,
    `Mes`,
    `idCondicion`,
    `idRubro`,
    `idProveedor`
  )
VALUES
  (
    15,
    4,
    'eOkyEK4exuoogpY3kxJ0SbSi.jpg',
    'o2mEnr9lwOYIrqHlJGVof76p.png',
    NULL,
    'Compra',
    'Silla de madera con tapiz verde',
    '2022-07-16 12:34:04',
    1.00,
    0.00,
    0,
    '',
    0.000000,
    'Activo',
    0,
    0,
    2,
    2,
    1
  );
INSERT INTO
  `activos` (
    `idActivo`,
    `idTipo`,
    `Imagen`,
    `Factura`,
    `Garantia`,
    `Procedencia`,
    `Descripcion`,
    `FechaRegistro`,
    `ValorRegistro`,
    `ValorActual`,
    `VidaUtilActual`,
    `Observaciones`,
    `UfvInicial`,
    `Estado`,
    `Anio`,
    `Mes`,
    `idCondicion`,
    `idRubro`,
    `idProveedor`
  )
VALUES
  (
    20,
    5,
    'Oj6yKo0xdglBN0E2haFMi28k.jpg',
    'TXPI4MfzCrmJB-ByOodAHp6H.png',
    '-',
    'Dinación',
    'Mesa rectangular de madera',
    '2022-07-30 20:15:06',
    1.00,
    0.00,
    0,
    '',
    1.040640,
    'En uso',
    0,
    0,
    2,
    2,
    1
  );
INSERT INTO
  `activos` (
    `idActivo`,
    `idTipo`,
    `Imagen`,
    `Factura`,
    `Garantia`,
    `Procedencia`,
    `Descripcion`,
    `FechaRegistro`,
    `ValorRegistro`,
    `ValorActual`,
    `VidaUtilActual`,
    `Observaciones`,
    `UfvInicial`,
    `Estado`,
    `Anio`,
    `Mes`,
    `idCondicion`,
    `idRubro`,
    `idProveedor`
  )
VALUES
  (
    21,
    4,
    '_f_jZi7HJ1kU_sejLmIT8PJ7.jpg',
    'dy3oE6L94D-DyZeQILIE8sNx.png',
    '-',
    'Compra',
    'Silla giratoria ',
    '2022-07-30 20:17:53',
    450.00,
    0.00,
    0,
    '',
    0.000000,
    'En uso',
    0,
    0,
    1,
    2,
    2
  );
INSERT INTO
  `activos` (
    `idActivo`,
    `idTipo`,
    `Imagen`,
    `Factura`,
    `Garantia`,
    `Procedencia`,
    `Descripcion`,
    `FechaRegistro`,
    `ValorRegistro`,
    `ValorActual`,
    `VidaUtilActual`,
    `Observaciones`,
    `UfvInicial`,
    `Estado`,
    `Anio`,
    `Mes`,
    `idCondicion`,
    `idRubro`,
    `idProveedor`
  )
VALUES
  (
    22,
    3,
    'H_qvFiT4d6T44ATW0R3C98HB.jpg',
    'q4FYEe3PqDiS830ghtJuQUKe.png',
    '-',
    'Compra',
    'CPU  DELUX color negro',
    '2022-07-30 20:20:02',
    3470.00,
    0.00,
    0,
    '',
    1.040640,
    'En uso',
    0,
    0,
    1,
    4,
    3
  );
INSERT INTO
  `activos` (
    `idActivo`,
    `idTipo`,
    `Imagen`,
    `Factura`,
    `Garantia`,
    `Procedencia`,
    `Descripcion`,
    `FechaRegistro`,
    `ValorRegistro`,
    `ValorActual`,
    `VidaUtilActual`,
    `Observaciones`,
    `UfvInicial`,
    `Estado`,
    `Anio`,
    `Mes`,
    `idCondicion`,
    `idRubro`,
    `idProveedor`
  )
VALUES
  (
    23,
    3,
    'dSCDlQWk-vJmArFTfMqBC5Bl.png',
    'txpYYZD6V1mkIY2rt8HocdBu.png',
    '-',
    'Compra',
    'Parlantes Omega color negro y plomo',
    '2022-07-30 20:23:11',
    70.00,
    0.00,
    0,
    '',
    0.000000,
    'Activo',
    0,
    0,
    1,
    4,
    3
  );
INSERT INTO
  `activos` (
    `idActivo`,
    `idTipo`,
    `Imagen`,
    `Factura`,
    `Garantia`,
    `Procedencia`,
    `Descripcion`,
    `FechaRegistro`,
    `ValorRegistro`,
    `ValorActual`,
    `VidaUtilActual`,
    `Observaciones`,
    `UfvInicial`,
    `Estado`,
    `Anio`,
    `Mes`,
    `idCondicion`,
    `idRubro`,
    `idProveedor`
  )
VALUES
  (
    24,
    7,
    'r3rglIgiqEpLyu4ScHyd_d-_.png',
    '6Fu_U5MyfwQjp1VRtSV2yPQV.png',
    '-',
    'Compra',
    'Impresora HP LASER JET p1102w\r\n',
    '2022-07-30 20:25:27',
    3065.00,
    0.00,
    0,
    '',
    1.040640,
    'En mantenimiento',
    0,
    0,
    1,
    4,
    3
  );
INSERT INTO
  `activos` (
    `idActivo`,
    `idTipo`,
    `Imagen`,
    `Factura`,
    `Garantia`,
    `Procedencia`,
    `Descripcion`,
    `FechaRegistro`,
    `ValorRegistro`,
    `ValorActual`,
    `VidaUtilActual`,
    `Observaciones`,
    `UfvInicial`,
    `Estado`,
    `Anio`,
    `Mes`,
    `idCondicion`,
    `idRubro`,
    `idProveedor`
  )
VALUES
  (
    25,
    14,
    'PgZCil5PY7rJGCKF0mN1z8jD.jpg',
    'rCTtVb1hmduWmsLguDfU5xHC.png',
    '-',
    'Compra',
    'Estabilizador de energía OMEGA 1000VA',
    '2022-07-30 20:28:41',
    60.00,
    0.00,
    0,
    '',
    0.000000,
    'Activo',
    0,
    0,
    1,
    4,
    4
  );
INSERT INTO
  `activos` (
    `idActivo`,
    `idTipo`,
    `Imagen`,
    `Factura`,
    `Garantia`,
    `Procedencia`,
    `Descripcion`,
    `FechaRegistro`,
    `ValorRegistro`,
    `ValorActual`,
    `VidaUtilActual`,
    `Observaciones`,
    `UfvInicial`,
    `Estado`,
    `Anio`,
    `Mes`,
    `idCondicion`,
    `idRubro`,
    `idProveedor`
  )
VALUES
  (
    26,
    3,
    'xKi9QgTyJF-gfhmfjyjn2BWF.jpg',
    'fiMY0NYGjv0P4poPaTiGPQQq.png',
    '-',
    'Compra',
    'Monitor LG model:E1942CA',
    '2022-07-30 20:32:47',
    2350.00,
    0.00,
    0,
    '',
    1.040640,
    'En uso',
    0,
    0,
    1,
    4,
    2
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: altaactivos
# ------------------------------------------------------------

INSERT INTO
  `altaactivos` (
    `idAlta`,
    `Codificacion`,
    `FechaHora`,
    `Qr`,
    `idActiv`,
    `idEmpleado`,
    `idProyecto`,
    `idAmbiente`
  )
VALUES
  (
    23,
    'FYA_CH-01-014-01-02',
    '2022-07-30 21:10:05',
    'data:image/png;base64,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',
    2,
    1,
    14,
    2
  );
INSERT INTO
  `altaactivos` (
    `idAlta`,
    `Codificacion`,
    `FechaHora`,
    `Qr`,
    `idActiv`,
    `idEmpleado`,
    `idProyecto`,
    `idAmbiente`
  )
VALUES
  (
    24,
    'FYA_CH-01-014-01-03',
    '2022-07-30 21:10:16',
    'data:image/png;base64,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',
    3,
    1,
    14,
    2
  );
INSERT INTO
  `altaactivos` (
    `idAlta`,
    `Codificacion`,
    `FechaHora`,
    `Qr`,
    `idActiv`,
    `idEmpleado`,
    `idProyecto`,
    `idAmbiente`
  )
VALUES
  (
    25,
    'FYA_CH-01-014-01-04',
    '2022-07-30 21:10:22',
    'data:image/png;base64,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',
    4,
    1,
    14,
    2
  );
INSERT INTO
  `altaactivos` (
    `idAlta`,
    `Codificacion`,
    `FechaHora`,
    `Qr`,
    `idActiv`,
    `idEmpleado`,
    `idProyecto`,
    `idAmbiente`
  )
VALUES
  (
    26,
    'FYA_CH-01-014-01-05',
    '2022-07-30 21:10:29',
    'data:image/png;base64,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',
    5,
    1,
    14,
    2
  );
INSERT INTO
  `altaactivos` (
    `idAlta`,
    `Codificacion`,
    `FechaHora`,
    `Qr`,
    `idActiv`,
    `idEmpleado`,
    `idProyecto`,
    `idAmbiente`
  )
VALUES
  (
    27,
    'FYA_CH-01-014-01-06',
    '2022-07-30 21:10:36',
    'data:image/png;base64,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',
    6,
    1,
    14,
    2
  );
INSERT INTO
  `altaactivos` (
    `idAlta`,
    `Codificacion`,
    `FechaHora`,
    `Qr`,
    `idActiv`,
    `idEmpleado`,
    `idProyecto`,
    `idAmbiente`
  )
VALUES
  (
    28,
    'FYA_CH-01-014-01-012',
    '2022-07-30 21:10:45',
    'data:image/png;base64,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',
    12,
    1,
    14,
    2
  );
INSERT INTO
  `altaactivos` (
    `idAlta`,
    `Codificacion`,
    `FechaHora`,
    `Qr`,
    `idActiv`,
    `idEmpleado`,
    `idProyecto`,
    `idAmbiente`
  )
VALUES
  (
    29,
    'FYA_CH-01-014-01-09',
    '2022-07-30 21:11:01',
    'data:image/png;base64,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',
    9,
    1,
    14,
    2
  );
INSERT INTO
  `altaactivos` (
    `idAlta`,
    `Codificacion`,
    `FechaHora`,
    `Qr`,
    `idActiv`,
    `idEmpleado`,
    `idProyecto`,
    `idAmbiente`
  )
VALUES
  (
    30,
    'FYA_CH-01-014-01-014',
    '2022-07-30 21:11:10',
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASQAAAEkCAYAAACG+UzsAAAAAklEQVR4AewaftIAABSqSURBVO3BQW7kWhLAQFLw/a/M8TJXDxBU5dYfZIT9Yq21XuBirbVe4mKttV7iYq21XuJirbVe4mKttV7iYq21XuJirbVe4mKttV7iYq21XuJirbVe4mKttV7iYq21XuJirbVe4mKttV7iYq21XuKHh1T+UsWJyhMVk8odFScqn1RxojJVnKjcUTGpTBWTyknFJ6mcVEwqU8WkclLxTSpTxYnKX6p44mKttV7iYq21XuJirbVe4ocPq/gklScqTlROKiaVT6qYVE4qJpU7VO6ouKPipGJSmVSmikllqphUTipOKk4qJpVJZaqYVKaKOyomlanipOKTVD7pYq21XuJirbVe4mKttV7ihy9TuaPiDpWp4o6KSeWTVKaKk4pJZVI5qZhUnlCZKk5UpopJZap4QmWqmFS+qWJSmVROVKaKSWWq+CSVOyq+6WKttV7iYq21XuJirbVe4of/cyp3VEwqU8WJylRxojJVPKFyUjGp3KFyUjGpnKhMFZPKVHGicqIyVdyh8kTFicqJylTx/+RirbVe4mKttV7iYq21XuKH/zMqU8Wk8oTKScWk8kTFicpUcaIyVZyo3KFyR8WkMlV8UsWkclLxRMWJyknFicpU8V92sdZaL3Gx1lovcbHWWi/xw5dV/KWKOyomlZOKSWVSmSomlTtUTiruqDhROam4Q2WqmFSmiknljopPUrmjYlKZKu5QmSqmiicq3uRirbVe4mKttV7iYq21XuKHD1N5E5WpYlKZKiaVOyomlaliUrmjYlKZKiaVqWJSmSomlROVqeKbKiaVE5Wp4qRiUpkqJpVPqphUTlSmihOVN7tYa62XuFhrrZe4WGutl7Bf/IepfFLFpHJScaJyUjGpTBWTylQxqUwVd6icVNyhMlU8ofJExaRyUjGpTBWTylQxqUwVd6hMFf9PLtZa6yUu1lrrJS7WWusl7BcPqEwVk8onVdyhMlWcqDxRMalMFScqn1TxhMqbVZyonFRMKicVk8odFU+oTBUnKp9U8U0Xa631EhdrrfUSF2ut9RI//LGKJ1Smim+quEPlDpWp4g6VqWJSmSqeqJhUpoo7VE4qTlSeUDmpmFSmiidUpopJZap4ouIJlZOKJy7WWuslLtZa6yUu1lrrJX74MJU7VJ5QOamYVKaKT6o4UZkqJpWpYlKZKk4qJpWpYlI5UTlRuaPiRGWqOKn4JJUnVKaKE5WpYlKZKiaVqWJSmSpOVKaKb7pYa62XuFhrrZe4WGutl/jhwyomlTsqTlROKk4qTiomlaniRGWquKPipGJS+UsVk8pU8YTKVDGp3KHyRMWkcqJyojJVnKhMFU9U3FHxly7WWuslLtZa6yUu1lrrJX74soqTiknlpGJSOVGZKu6omFSmihOVqWJSOamYVE4qJpU7Kk5UpopJZaqYVJ6oOFGZKiaVqeJE5URlqvhLKlPFpPJJFZPKVPHExVprvcTFWmu9xMVaa73EDx+mMlWcqEwVT6hMFScqU8WkckfFHRV3VEwqk8onqUwVk8pUcUfFpHKiMlWcqEwVk8onqUwVk8oTKlPFScWkMlVMKlPFX7pYa62XuFhrrZe4WGutl/jhj6lMFScqU8VUcaJyUnFSMalMKlPFHSpTxYnKHRWTyonKVDGpTBWTyknFpDJVTCpTxaQyVZyoTBWTyknFpDJVTCpPVDyhMlVMKlPFHRWfdLHWWi9xsdZaL3Gx1lov8cOHVUwqJyonFZPKScVUMak8UTGpTConFVPFpHJScaLyRMUnVZxU3KFyonJSMamcVJxUfFLFpHJSMalMFf8lF2ut9RIXa631EhdrrfUSPzxUMamcVEwqU8WkMlVMKpPKJ6lMFXdUTConFZPKN6mcVNxRMak8UfGEyqQyVUwqd6icVNyhcofKVDGpTBVvdrHWWi9xsdZaL3Gx1lov8cNDKk9UnFRMKk9UnKhMFU+oTBWTyh0qJxWTylRxonJSMalMFVPFHSonKt9U8U0qU8UTFScVk8qJyhMVT1ystdZLXKy11ktcrLXWS/zwx1SeqDhRmSpOVO5QOak4UTlR+S+pmFROKiaVE5WpYlKZKj5J5Y6KSWWqmFSmihOVSeWOikllqviXLtZa6yUu1lrrJS7WWuslfnio4g6Vk4o7VE5U7qi4o2JSmSpOKk5UpopJ5Q6VO1SmiknlpOKk4ptUpooTlaniROWkYlK5Q2WqOFGZKk4qJpWpYlKZKj7pYq21XuJirbVe4mKttV7ih4dUnqiYVE4qpopJ5Y6Kb1L5popJZaqYVKaKSWWqmFSmijtU7qg4qTipmFSmihOVk4pJZaqYKu6oOFG5Q+Wk4qTimy7WWuslLtZa6yUu1lrrJX74soo7Kr6p4psqJpWp4l+qmFROVKaKN1M5qTip+JdU7qh4ouJE5Y6KJy7WWuslLtZa6yUu1lrrJX54qOJE5Y6KSWWqmFSeUJkqnlA5UZkqTiomlZOKSWWqmCpOVCaVqWJSOamYVKaKSeWkYqp4QuWkYlKZKiaVk4qp4kTlRGWq+KaKT7pYa62XuFhrrZe4WGutl7BfPKByUjGpTBWTylRxojJVTCpTxR0qU8WkclIxqZxUTConFScqd1RMKlPFHSpTxaQyVZyo3FFxovJExaQyVZyo3FFxh8pUcaIyVUwqJxVPXKy11ktcrLXWS1ystdZL2C/+kMpUMamcVNyhclLxhModFZPKHRWTyknFpHJHxaRyUjGp3FHxSSonFZPKScWkMlVMKicVJypTxaQyVUwqd1TcoTJVPHGx1lovcbHWWi9xsdZaL/HDh6l8UsUdKicVk8pUcaJyUnFHxaRyonJSMalMFScqd1ScVNyhMlXcofJExRMqU8WJyh0qU8VJxaQyVdyhMlV80sVaa73ExVprvcTFWmu9xA8PqUwVd6icqEwVk8pJxaQyVUwqU8VJxaTyRMWkMlVMKicVJyp3VEwqd1ScVEwqd1ScqHxTxaQyVZxUPKFyUjGpTBX/0sVaa73ExVprvcTFWmu9hP3ii1SmiknlpGJSmSomlTsqTlTuqDhR+aSKO1SmiknlpOIOlaliUjmpOFGZKiaVqeKbVJ6oOFGZKk5UpooTlaniL12stdZLXKy11ktcrLXWS9gv/pDKVDGpPFFxojJVTCpTxYnKVDGpnFRMKk9UfJLKScWkMlVMKk9UnKhMFZPKVHGHyknFpDJVnKicVEwqd1RMKlPFicpU8UkXa631EhdrrfUSF2ut9RL2ixdRmSomlTsq7lCZKiaVqWJSmSpOVE4qJpWpYlK5o+JEZaqYVE4qTlROKk5U7qh4M5WTim9SmSpOVKaKJy7WWuslLtZa6yUu1lrrJX74MpWpYlI5UfkklaliqphUTlTuUJkqJpVJZaqYVO6oeELlDpWp4qRiUpkqpopvUvlLFScq/88u1lrrJS7WWuslLtZa6yXsFw+ofFLFHSp3VJyonFScqNxRcaIyVUwqT1RMKicVd6hMFZPKExWTylTxhMpUMak8UTGpTBUnKlPFHSpTxYnKVPFJF2ut9RIXa631EhdrrfUSPzxUcaIyVUwqJypTxUnFpHKiMlVMKpPKScWJyonKVDGpTBV3qEwqU8WkcqIyVZyoTBUnKlPFpDJVnKg8oTJVnKhMFZPKVHGicofKVHGi8i9drLXWS1ystdZLXKy11kvYLz5IZaqYVE4q7lB5ouJE5Y6KSWWqmFSmikllqjhROam4Q2WquENlqjhR+aSKE5WpYlKZKk5UPqniRGWquENlqrhDZap44mKttV7iYq21XuJirbVewn7xgMpUMam8ScWkMlVMKlPFHSpTxaQyVUwqJxXfpPJNFU+oTBWTyhMVk8pU8YTKVDGpvFnFJ12stdZLXKy11ktcrLXWS/zwchVPqEwqd1TcofJJFScqJxWTyknFVHGickfFHSp3qEwVd6g8ofKEyh0VJyonFZPKVPGXLtZa6yUu1lrrJS7WWuslfvgwlTsqTlROKj5JZao4UTmpmFSmijtUpoo7KiaVT6o4Ubmj4gmVqeKTVKaKSWWqOFE5qZhU7qi4Q+Wk4pMu1lrrJS7WWuslLtZa6yV++LCKO1ROKiaVf0nlpGJSmSruUDlROamYVKaKO1SmikllqvgklaliUjlROak4qbij4psqJpUTlScqJpWp4omLtdZ6iYu11nqJi7XWegn7xQepnFScqHxSxYnKVHGiclJxh8onVUwqJxWTylRxojJV3KEyVUwqU8UTKicVJypTxaTyRMUdKlPFiconVXzSxVprvcTFWmu9xMVaa73EDx9W8UkVk8pUcYfKVHGiMlVMKneoTBUnKn+pYlKZKqaKSeWkYqq4Q+Wk4qRiUplUpoqp4i+p3KEyVTxR8Zcu1lrrJS7WWuslLtZa6yXsFx+k8k0Vk8odFZPKVPGEyknFicpU8Ukq31QxqTxRcYfKHRWTyjdVnKhMFScqU8WkclIxqdxR8UkXa631EhdrrfUSF2ut9RI/PKQyVdyhMlV8k8pUMamcVJxU3KEyVUwq31Rxh8pUMal8k8pU8U0Vn6RyUjGpTBVTxRMqJxWTyqQyVTxxsdZaL3Gx1lovcbHWWi/xw5epnFScqNxRcYfKJ6ncUXFScYfKScWJylRxR8WkckfFpDJVnFScqHyTyknFicpUMalMFScVd6hMKlPFN12stdZLXKy11ktcrLXWS9gvHlB5omJSmSo+SeWk4k1UTipOVL6pYlKZKk5UpopJ5Y6KT1KZKk5UpooTlaniDpUnKt7kYq21XuJirbVe4mKttV7ihw+rmFSeUHmi4pNUPqnijopJ5ZMqTlTuULlDZap4QuWk4qRiUnlCZaqYVO6omFSmikllUpkqTlSmik+6WGutl7hYa62XuFhrrZf44eUqJpWTiknlCZU7KiaVqeJEZaqYVE4qTlSmijsq7qg4UfkklZOKJypOVE4qTiomlROVqeKkYlKZVO5QmSqeuFhrrZe4WGutl7hYa62XsF/8IZUnKj5JZao4UZkqJpWTihOVk4pJZao4UbmjYlKZKp5Q+aaKO1SeqJhUpoonVKaKSWWqmFROKiaVqeKbLtZa6yUu1lrrJS7WWuslfvgwlaliqnhCZao4UZkq7lCZKu6omFSmipOKSeWJikllqphUpoo7VE4q7lD5lypOVKaKSeWkYlI5UZkqTiomlUnlROWk4omLtdZ6iYu11nqJi7XWegn7xQepTBUnKlPFpDJVPKFyUnGHylRxonJScaIyVdyh8l9WcaJyR8UdKicV/yUqU8WJylTxSRdrrfUSF2ut9RIXa631Ej/8YxUnFScqJxUnFScqU8WJyptVPKEyVTyhclLxSRUnKlPFHSpTxR0qn1QxqdyhMlVMKlPFExdrrfUSF2ut9RIXa631Ej88pDJVTCpTxR0qU8VJxRMqU8WkclIxqUwVd6h8ksodFZ+kcofKHRWfpDJVTCpTxaRyR8WJylRxR8WJylRxUvFJF2ut9RIXa631EhdrrfUSP/xjKlPFVDGpnKhMFd9UMamcqEwVk8pUMalMKlPFHRUnKlPFpDJVTCpTxYnKScWkMqlMFScqU8WkMqlMFZPKHRWTylRxonJHxRMqJxVPXKy11ktcrLXWS1ystdZL2C8+SGWqeEJlqphUpooTlW+qmFSmir+k8k0Vk8pUMamcVEwqU8WJylTxhModFZ+kMlVMKndU3KEyVUwqU8UTF2ut9RIXa631EhdrrfUS9osvUrmj4kTljoo7VKaKSWWquENlqjhRmSomlTsq7lA5qbhDZar4JJU7KiaVqWJSmSomlaliUpkqJpWTihOVqWJSuaNiUjmpeOJirbVe4mKttV7iYq21XuKHf6xiUjmpmFTuUJkq7qi4Q2WqmFQ+qWJSOVE5qbhDZaqYKiaVqWJSmSpOKj5J5UTlROWOiicqTiruUJkqvulirbVe4mKttV7iYq21XsJ+8YDKVHGiMlX8JZWpYlI5qThRuaNiUvlLFScqU8WJylQxqUwVk8pUMamcVEwqU8UTKlPFicodFScqT1RMKicVJypTxRMXa631EhdrrfUSF2ut9RL2iw9SOamYVKaKSWWqmFTuqDhRmSomlaliUpkqTlSmikllqvgklb9UMalMFU+o3FExqUwVJyonFZPKVDGpnFRMKp9UMamcVHzSxVprvcTFWmu9xMVaa72E/eI/TOWk4gmVOyomlScqJpWTikllqjhROam4Q+WkYlKZKiaVJyomlaniCZWpYlKZKiaVJyruUDmpmFROKp64WGutl7hYa62XuFhrrZf44SGVv1QxVUwqT6hMFZPKVDGpTBWTyh0qU8WJylTxTSpTxRMVk8pU8U0qJxWTylQxqTxRMancoTJVnFScVHzTxVprvcTFWmu9xMVaa73EDx9W8UkqJypTxYnKVDFVTCpTxRMVk8pUcaJyUjGp3FExqZxU3FFxonKickfFHRV/SWWqmFSmiknlpOKbVKaKJy7WWuslLtZa6yUu1lrrJX74MpU7Kp5QmSqmihOVJyomlaniDpWTiknljoo7VD5J5Y6KE5U7KiaVb6o4UZkq7lD5JJWTik+6WGutl7hYa62XuFhrrZf44f+cylRxR8WJyknFN6ncUTGpnFScqJxUTCp3VDyhclIxVTyhMlWcqJyo3FHxX3ax1lovcbHWWi9xsdZaL/HD/7mKE5UTlaliqphUJpWpYqr4Syp3qJxUnKhMFZPKVPFExR0qd1ScVJyoTBV3qEwVk8oTFf/SxVprvcTFWmu9xMVaa73ED19W8U0Vk8oTFZPKicpUMamcqDxRMalMFScqU8UdKlPFVDGp/CWVk4pJZaqYVE4qTiruUJkqJpWp4g6VSWWqmFS+6WKttV7iYq21XuJirbVewn7xgMpfqphU7qiYVE4qJpWpYlI5qZhUTiruUHmziknlpGJSmSomlZOKT1I5qZhUpopJ5ZsqJpWp4l+6WGutl7hYa62XuFhrrZewX6y11gtcrLXWS1ystdZLXKy11ktcrLXWS1ystdZLXKy11ktcrLXWS1ystdZLXKy11ktcrLXWS1ystdZLXKy11ktcrLXWS1ystdZLXKy11kv8D6uTHKb9kaSRAAAAAElFTkSuQmCC',
    14,
    1,
    14,
    2
  );
INSERT INTO
  `altaactivos` (
    `idAlta`,
    `Codificacion`,
    `FechaHora`,
    `Qr`,
    `idActiv`,
    `idEmpleado`,
    `idProyecto`,
    `idAmbiente`
  )
VALUES
  (
    31,
    'FYA_CH-01-014-01-021',
    '2022-07-30 21:11:19',
    'data:image/png;base64,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',
    21,
    1,
    14,
    2
  );
INSERT INTO
  `altaactivos` (
    `idAlta`,
    `Codificacion`,
    `FechaHora`,
    `Qr`,
    `idActiv`,
    `idEmpleado`,
    `idProyecto`,
    `idAmbiente`
  )
VALUES
  (
    32,
    'FYA_CH-01-010-06-010',
    '2022-07-30 21:18:37',
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASQAAAEkCAYAAACG+UzsAAAAAklEQVR4AewaftIAABTNSURBVO3BQW7kWhLAQFLw/a/M8TJXDxBU5dYfZIT9Yq21XuBirbVe4mKttV7iYq21XuJirbVe4mKttV7iYq21XuJirbVe4mKttV7iYq21XuJirbVe4mKttV7iYq21XuJirbVe4mKttV7iYq21XuKHh1T+UsWJyidVTConFXeonFRMKlPFicpUcaJyR8WJylRxovJJFScqU8WkMlV8kspUcaIyVZyo/KWKJy7WWuslLtZa6yUu1lrrJX74sIpPUrmjYlJ5QmWqOFG5o2JS+aSKE5WTijtUpopJZaqYKu5QmSomlTtUpopJZaqYVE4qnqiYVKaKk4pPUvmki7XWeomLtdZ6iYu11nqJH75M5Y6KO1SmiqliUpkqJpU7VKaKSWWquENlqjhRmSqeUDmp+EsqT1RMKlPFScWk8k0qU8UnqdxR8U0Xa631EhdrrfUSF2ut9RI//J9RuUNlqphUJpWpYlKZKj5J5aTiROWJipOKSeVEZaqYVKaKE5UTlaniX6qYVE5Upor/JxdrrfUSF2ut9RIXa631Ej/8n6k4UTlRmSomlZOKSWWquKPiDpWpYqq4Q2VSeaLiRGWq+KSKSeWkYlKZKiaVqWJSmSpOKk5Upor/sou11nqJi7XWeomLtdZ6iR++rOJfUpkqPknlDpUnVKaKqeIOlTsq7lCZVKaKqWJSuaPiROUOlTsqJpUnVKaKqeKJije5WGutl7hYa62XuFhrrZf44cNU/ktUpopJZaqYVKaKSWWqmFSmikllqphUpopJZao4qZhUTlSmipOKSWWqOKmYVE5UpopJZaqYVKaKSWWqOKmYVKaKSeVEZao4UXmzi7XWeomLtdZ6iYu11noJ+8V/mModFZPKScUdKlPFJ6lMFZPKVHGickfFHSpTxRMqT1RMKicVd6hMFZPKVHGHylTx/+RirbVe4mKttV7iYq21XsJ+8YDKVDGpfFLFicpUcYfKN1WcqHxSxYnKVDGpvEnFHSonFZPKN1VMKlPFJ6l8UsU3Xay11ktcrLXWS1ystdZL/PBlFZPKVHGHylQxVUwqU8UTFScqd6icVJyoTBWTyknFExVPqJxUTCpTxaRyUnFHxaRyUnGiMlWcqJxUnFScqEwVd6hMFU9crLXWS1ystdZLXKy11kvYL75IZaqYVKaKSWWqmFSeqPhLKlPFHSpTxRMqd1ScqJxUTCpTxaRyUvFNKlPFHSpTxYnKVDGp/EsV33Sx1lovcbHWWi9xsdZaL/HDl1VMKlPFScWkMlVMKicVb6ZyUjGp3FHxSSpTxR0Vk8pUMancoTJVnKhMFXeonKicVEwqT1R8k8pU8cTFWmu9xMVaa73ExVprvcQPD6mcVNyhcofKScUdKndUTCpTxVQxqUwVJyonFZPKpHJScaIyVUwqU8Wk8k0qU8WkclIxqdxRcaIyVdxRMalMFZPKVDGpTBWTyknFJ12stdZLXKy11ktcrLXWS9gvHlB5omJSmSomlaliUpkqTlROKiaVqWJSOan4JJU7Ku5QmSomlaniDpWTiknliYoTlZOKE5WpYlL5pIo7VL6p4omLtdZ6iYu11nqJi7XWeokfPqxiUjlRmSomlTsqJpWTiknlDpWp4g6VqeJE5Y6KE5Wp4kRlqphUnqiYVKaKSWWqOFH5popJZaqYVE4qJpVJZaqYVD6p4psu1lrrJS7WWuslLtZa6yXsFw+oTBUnKndUTCqfVHGiMlVMKlPFJ6lMFScqU8WkMlVMKicVk8pJxaTyTRWTylQxqZxUTCpTxaQyVUwqJxWTyhMVk8pUMalMFZPKVPFJF2ut9RIXa631EhdrrfUS9osHVKaKSWWqmFSmikllqrhD5Y6KJ1SmikllqphUTipOVKaKSeWk4kRlqjhR+aSKE5WpYlKZKiaVb6o4UTmpmFSmiknljoo7VKaKJy7WWuslLtZa6yUu1lrrJewXX6QyVXyTylRxovJExaQyVdyh8kTFpDJVnKicVEwqU8UTKlPFicoTFZPKVDGp3FHxhMpU8ZdU7qh44mKttV7iYq21XuJirbVewn7xgMpUMal8UsWkclJxh8pUcaIyVZyoTBWTyh0Vf0llqphUTipOVO6ouENlqphUTiomlTsqnlD5pIpJZar4SxdrrfUSF2ut9RIXa631Ej98mMpUMamcVJyoTBWTyqQyVUwqU8UTKlPFicpUMamcqJxUTCpPVNxRcUfFpDJVTCpTxaQyVdxRcUfFicpJxaQyVZyoTBWfpDJVfNLFWmu9xMVaa73ExVprvYT94oNU7qiYVE4qJpVPqnhC5aTiDpWTikllqphUpoo7VKaKSeWJikllqjhRmSomlaniDpWp4pNUpopJ5Y6KSeWk4l+6WGutl7hYa62XuFhrrZewX/yHqHxTxSepTBWTylQxqZxUnKhMFZPKVHGiclJxonJHxX+JylTxhMpJxTep3FHxxMVaa73ExVprvcTFWmu9xA8PqUwVk8odFZPKScWkckfFEyp3qEwVJxXfVDGpPKFyUjGpTBUnKlPFN6lMFZPKHSpTxUnFpHKiMlV8U8UnXay11ktcrLXWS1ystdZL/PBhKlPFpHKiMlXcUTGpnKhMFZPKVHFHxRMqU8UTKm+mMlWcqEwVk8pUMamcVEwqU8UdFZPKVDGpfJPKScWkMqlMFU9crLXWS1ystdZLXKy11kv88FDFJ1VMKlPFX6qYVO5QOamYVJ5QmSomlTsqJpWp4g6Vk4qTihOVqWJSmSpOVKaKSeWJijsqJpWp4o6KOyomlU+6WGutl7hYa62XuFhrrZewX3yRylQxqUwVJypTxaRyR8UTKlPFicoTFZPKVPGEylQxqZxUPKEyVdyhckfFEypTxaQyVUwqT1TcoTJV3KEyVXzSxVprvcTFWmu9xMVaa73EDw+pTBUnKlPFicpUMalMFZPKiconqUwVU8WkclIxqUwVk8pJxaRyR8UdKlPFScWkckfFicqJyknFN1WcqNyhMlVMKlPFv3Sx1lovcbHWWi9xsdZaL2G/+IdUpooTlaniDpWp4kRlqvgklZOKE5WpYlI5qThRmSo+SeWOiknljooTlZOKJ1TuqJhUpopPUpkq/tLFWmu9xMVaa73ExVprvcQPf0xlqphU7lCZKiaVqeJE5ZNUpoqTikllqpgqJpWpYlJ5QmWqmFSmiknlkypOVCaVqeIOlZOKSWWquENlqphUpoo7VKaKE5Wp4pMu1lrrJS7WWuslLtZa6yV++DKVqeKOiknlRGWquKPiROWOikllqphU7lCZKiaVqWJSOak4UZkqTiomlZOKE5U7Kk4qnlCZKu5QuaPiiYpJZar4SxdrrfUSF2ut9RIXa631EvaLP6TylyruUJkq7lCZKk5UpopJ5YmKSeVfqphUpopJZar4JpWpYlI5qZhU7qg4UflLFZPKVPFJF2ut9RIXa631EhdrrfUSPzykckfFpDJV3KEyVUwqJxWfVDGpTBXfVHFSMalMFZPKVHGHyqRyR8UTKicVd1RMKp+kclIxqUwVd6hMFScV33Sx1lovcbHWWi9xsdZaL/HDQxXfpDJVPFExqZyoTBWTyknFScUdFZPKpDJVTConKneoTBUnFZPKpDJVTCpTxaRyUnFS8U0VT6jcoTJVnKjcUfFJF2ut9RIXa631EhdrrfUS9osPUpkqJpWTijtU3qxiUnmi4g6VqeJE5aTiDpU7Kj5J5aRiUpkqTlSmihOVJyomlaniDpWTiknlpOKJi7XWeomLtdZ6iYu11noJ+8UDKlPFico3VZyonFScqJxUTCpTxaQyVdyhckfFpDJVTCqfVDGpnFRMKlPFpHJS8Ukqn1RxovKXKv7SxVprvcTFWmu9xMVaa72E/eKDVKaKE5WTiidUpopJZar4JJUnKp5QOak4UZkqJpU7KiaVqWJSeaLiROWk4g6Vv1RxonJS8YTKVPHExVprvcTFWmu9xMVaa72E/eLFVE4qJpVvqvgklaliUpkqJpVPqrhDZao4Ubmj4gmVk4pJZaqYVE4qJpWTiknlpGJSmSqeUDmp+KaLtdZ6iYu11nqJi7XWegn7xQMqJxWTyknFicpUcYfKVDGpTBWTylRxonJHxYnKVPGXVKaKT1KZKk5UPqnim1SeqDhRmSomlTsqTlSmiicu1lrrJS7WWuslLtZa6yXsFw+oTBV3qEwVk8onVXyTyhMVk8odFZPKVHGiMlWcqEwVn6RyUnGHyknFEyp3VDyhMlWcqJxU/EsXa631EhdrrfUSF2ut9RL2iw9SuaNiUpkqJpWp4g6VqWJSOak4UXmTiknlpGJSmSpOVE4q7lC5o+IOlZOKO1ROKiaVqWJS+Zcq/tLFWmu9xMVaa73ExVprvYT94oNUpooTlTsqTlROKiaVk4p/SWWqOFGZKiaVv1RxonJSMalMFZPKScWJyjdVnKhMFScqJxWTylRxojJVfNPFWmu9xMVaa73ExVprvYT94oNUpopvUnmiYlKZKp5QmSomlU+qmFSmiidUpoo7VKaKSWWqmFT+UsWJylTxSSpTxYnKVDGpnFTcoTJVPHGx1lovcbHWWi9xsdZaL/HDl6mcVEwqd1ScqEwVk8pfUpkqTlSmijsqJpU7Ku5QmSqmikllqphUpopJZap4QuVEZaqYVE4qTlSmikllqpgqTio+qeKTLtZa6yUu1lrrJS7WWusl7BdfpDJVnKhMFZPKScWJyknFpDJVnKicVJyo3FExqUwVk8onVdyhMlWcqNxR8UkqU8WJylQxqZxUnKh8UsWkMlX8pYu11nqJi7XWeomLtdZ6iR++rGJSOamYVP6liknlpOJEZaqYKu5QmSpOKiaVqeIJlTtUTiqeUDmpOKmYVD6pYlI5qThReaJiUpkqvulirbVe4mKttV7iYq21XuKHh1SmiidUpopJZaqYVKaKf0llqjhReUJlqjipuEPljopJZaqYVO5QuaPiTVSmikllUjmpOFGZVKaKqWJSOal44mKttV7iYq21XuJirbVewn7xgMpUcYfKExVPqEwVk8pJxTepTBWTylRxonJHxYnKVHGHyh0Vk8pJxR0qT1RMKicVf0llqphUpoq/dLHWWi9xsdZaL3Gx1lovYb/4IpWp4kRlqjhRmSruULmj4kTljoo7VJ6omFQ+qWJSmSomlaniROWOihOVk4o7VKaKSeWkYlK5o2JSmSomlZOKSeWk4omLtdZ6iYu11nqJi7XWeokfPkxlqjhRmSomlaliqvikikllUpkqTiomlROVqWKqOFE5UbmjYlI5UXlC5aTiCZWpYlI5UXmi4omKSeWk4qTiROWk4pMu1lrrJS7WWuslLtZa6yV+eLmKSeWkYlKZKk5U7lA5UTlRmSo+qeKbKj6p4gmVk4qTipOKSeUOlSdUpopJZaqYVE4qTiomlaniiYu11nqJi7XWeomLtdZ6iR8eUpkqJpWp4g6VqWJSOamYVO6omFSmihOVqWJSOVGZKk4qTlTuqPiXVO6oOFGZKu5QmSpOVE4qJpWTikllqjipmFQmlanipOKTLtZa6yUu1lrrJS7WWuslfvjHKk4qJpWpYlKZKqaKSeWTVE5UTlSmikllqniiYlKZVJ5QmSqmipOKE5U7KiaVk4onKiaVk4pJZVI5UfkmlZOKJy7WWuslLtZa6yUu1lrrJewXD6icVDyhMlVMKlPFico3VUwqJxV3qJxUTCp3VEwqT1RMKndU3KFyUnGHyh0Vk8pUcYfKVDGp3FFxh8pUMalMFU9crLXWS1ystdZLXKy11kv88GUqd1RMFZPKicpUMVVMKicVk8pUcVLxhMpUMalMKicVd1RMKlPFExWTyjepTBWTylQxqUwVk8pUMalMFZPKJ1VMKndUTCrfdLHWWi9xsdZaL3Gx1lov8cNDFScqJxWTyknFicodFZPKHSpTxaQyVZyoPFExqZyonFTcoTJVTBWTylQxqUwVJxWfpHKiMlVMKn+p4omKSWWq+KaLtdZ6iYu11nqJi7XWegn7xQMqU8WJylTxL6n8pYpJ5Y6KE5U7Kk5UpopJ5aRiUpkqJpVPqnhC5aTiDpU7KiaVJyomlZOKE5Wp4omLtdZ6iYu11nqJi7XWeokfHqqYVE4qJpWpYlKZKk5UPqniDpWpYlI5qZhUTlSmijtUpooTlTtUpopJ5Y6KE5UTlanijopJ5aTipGJSmVSmiknlDpWTiknlpOKTLtZa6yUu1lrrJS7WWusl7Bf/YSonFU+o3FExqTxR8YTKVHGiclJxh8pJxaQyVUwqT1RMKlPFEypTxaQyVUwqT1TcoXJSMamcVDxxsdZaL3Gx1lovcbHWWi/xw0Mqf6liqphUTlSmikllqphUTlROKk5UJpWTin9JZar4JJWp4i+pTBWTylQxqdxRcaJyh8pUcVJxUvFNF2ut9RIXa631EhdrrfUSP3xYxSepnKjcUXFScVLxSSp3VEwqU8VUMamcVEwqJxV3VDyhclLxhMpUcYfKHSonFVPFpHJS8U0qU8UTF2ut9RIXa631EhdrrfUSP3yZyh0VT1ScqEwVd6icVJyo3FFxh8pUMVWcqJyofJLKVDGpTBUnKicVU8WJyidVnKg8ofJJKicVn3Sx1lovcbHWWi9xsdZaL/HD/xmVqeJEZaqYVKaKO1SmiknliYpJZVI5qZgq7lCZKk5U7qj4JJWp4qTiDpWp4kTlRGWqOKm4Q+VNLtZa6yUu1lrrJS7WWuslfvg/UzGpTBUnKicqJxVTxRMqU8VJxTepTBV3VEwqk8pJxUnFHSp3VJxUTConFZPKVDGpTBWTyn/ZxVprvcTFWmu9xMVaa72E/eIBlanik1SmijtUTipOVO6omFTuqDhRuaNiUpkqnlCZKu5QeaJiUpkqnlA5qbhD5aTiDpWp4gmVOyo+6WKttV7iYq21XuJirbVe4ocPU/lLKlPFEypTxR0qT6hMFVPFHSp3qNxRcaJyUnGiMlVMKlPFicoTFZPKScVUcaJyUjFVTConFScV/9LFWmu9xMVaa73ExVprvYT9Yq21XuBirbVe4mKttV7iYq21XuJirbVe4mKttV7iYq21XuJirbVe4mKttV7iYq21XuJirbVe4mKttV7iYq21XuJirbVe4mKttV7iYq21XuJ/tDFaZbwBVREAAAAASUVORK5CYII=',
    10,
    6,
    10,
    5
  );
INSERT INTO
  `altaactivos` (
    `idAlta`,
    `Codificacion`,
    `FechaHora`,
    `Qr`,
    `idActiv`,
    `idEmpleado`,
    `idProyecto`,
    `idAmbiente`
  )
VALUES
  (
    33,
    'FYA_CH-01-010-06-024',
    '2022-07-30 21:18:51',
    'data:image/png;base64,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',
    24,
    6,
    10,
    5
  );
INSERT INTO
  `altaactivos` (
    `idAlta`,
    `Codificacion`,
    `FechaHora`,
    `Qr`,
    `idActiv`,
    `idEmpleado`,
    `idProyecto`,
    `idAmbiente`
  )
VALUES
  (
    34,
    'FYA_CH-01-010-06-020',
    '2022-07-30 21:19:15',
    'data:image/png;base64,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',
    20,
    6,
    10,
    5
  );
INSERT INTO
  `altaactivos` (
    `idAlta`,
    `Codificacion`,
    `FechaHora`,
    `Qr`,
    `idActiv`,
    `idEmpleado`,
    `idProyecto`,
    `idAmbiente`
  )
VALUES
  (
    35,
    'FYA_CH-01-010-06-026',
    '2022-07-30 21:19:44',
    'data:image/png;base64,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',
    26,
    6,
    10,
    5
  );
INSERT INTO
  `altaactivos` (
    `idAlta`,
    `Codificacion`,
    `FechaHora`,
    `Qr`,
    `idActiv`,
    `idEmpleado`,
    `idProyecto`,
    `idAmbiente`
  )
VALUES
  (
    36,
    'FYA_CH-01-010-06-022',
    '2022-07-30 21:19:57',
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARQAAAEUCAYAAADqcMl5AAAAAklEQVR4AewaftIAABIaSURBVO3BQY4gx7LgQDJR978yp5e++QEkMqolvXEz+4O11rrgYa21LnlYa61LHtZa65KHtda65GGttS55WGutSx7WWuuSh7XWuuRhrbUueVhrrUse1lrrkoe11rrkYa21LnlYa61LHtZa65IfPlL5myreUJkqJpWp4guVk4oTlaliUjmpeENlqphUTiq+UDmpmFSmiknlpGJSmSpOVE4qTlROKiaVv6nii4e11rrkYa21LnlYa61Lfris4iaVN1SmiknlC5U3KiaVqeJvUjlRmSpuUpkqJpUvKk5UpopJ5aRiUplUpoqbKm5SuelhrbUueVhrrUse1lrrkh9+mcobFW+oTBU3qbxRcVLxRcWk8kbFpHKiclJxojJVnFRMKicqU8WkMlVMKlPFpHJScaLym1TeqPhND2utdcnDWmtd8rDWWpf88D9G5Y2KNypOVN6omComlaliqnhD5aTiC5UTlTcq3lCZKk4q3lD5omJS+V/ysNZalzystdYlD2utdckP/5+puEllqjhReaNiUjmpmFSmikllUvmiYlKZKk5UblKZKiaVqWKqeEPlRGWq+F/ysNZalzystdYlD2utdckPv6zib6r4myomlZOKN1SmikllUpkqJpWTijdUJpWp4kRlqphUvqg4qZhUTiomlaliUpkqbqr4N3lYa61LHtZa65KHtda65IfLVP5NVKaKSWWqeENlqphUTlSmii8qJpWpYlI5UZkqTiomlanii4pJZaqYVKaKSWWqmFR+k8pUcaLyb/aw1lqXPKy11iUPa611yQ8fVfyXVUwqJyonKlPFpDJVfFExqUwVk8obFW+oTBUnFZPKVDGp/CaVNyomlTcqTir+Sx7WWuuSh7XWuuRhrbUusT/4QGWqmFRuqjhRmSomlaniN6lMFZPKGxUnKlPFicpNFZPKFxWTylTxN6ncVHGiclPFb3pYa61LHtZa65KHtda6xP7gIpWp4iaV31RxojJVvKHyRsWJylQxqUwVk8pUMalMFZPKVHGi8kbFGyonFZPKScWk8kbFicoXFZPKVPE3Pay11iUPa611ycNaa11if/CLVKaKSeU3VUwqb1RMKicVN6lMFW+oTBWTylQxqZxUTCq/qeILld9UMamcVHyh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',
    22,
    6,
    10,
    5
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: ambientes
# ------------------------------------------------------------

INSERT INTO
  `ambientes` (
    `idAmbiente`,
    `NombreAmb`,
    `DescripcionAmb`,
    `idEdificio`
  )
VALUES
  (
    1,
    'Almacen ',
    'Ambiente de almacenamineto de equipos y materiales',
    1
  );
INSERT INTO
  `ambientes` (
    `idAmbiente`,
    `NombreAmb`,
    `DescripcionAmb`,
    `idEdificio`
  )
VALUES
  (
    2,
    'Contabilidad y Administración ',
    'Área de contabilidad y admintración',
    1
  );
INSERT INTO
  `ambientes` (
    `idAmbiente`,
    `NombreAmb`,
    `DescripcionAmb`,
    `idEdificio`
  )
VALUES
  (
    5,
    'Área Regular Tecnicos ',
    'Área  de trabajo de  los tecnicos',
    1
  );
INSERT INTO
  `ambientes` (
    `idAmbiente`,
    `NombreAmb`,
    `DescripcionAmb`,
    `idEdificio`
  )
VALUES
  (6, 'Dirección ', 'Dirección de la institución', 1);
INSERT INTO
  `ambientes` (
    `idAmbiente`,
    `NombreAmb`,
    `DescripcionAmb`,
    `idEdificio`
  )
VALUES
  (7, 'Capilla', 'Sector de la capilla ', 1);
INSERT INTO
  `ambientes` (
    `idAmbiente`,
    `NombreAmb`,
    `DescripcionAmb`,
    `idEdificio`
  )
VALUES
  (8, 'Salón Auditorio ', 'Salon auditorio', 1);
INSERT INTO
  `ambientes` (
    `idAmbiente`,
    `NombreAmb`,
    `DescripcionAmb`,
    `idEdificio`
  )
VALUES
  (
    9,
    'Electricidad ',
    'Ambiente de electricidad UE Sagrada Familia',
    4
  );
INSERT INTO
  `ambientes` (
    `idAmbiente`,
    `NombreAmb`,
    `DescripcionAmb`,
    `idEdificio`
  )
VALUES
  (10, 'Gastronomia', 'Ambiente de gastronomia', 4);

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: bajas
# ------------------------------------------------------------


# ------------------------------------------------------------
# DATA DUMP FOR TABLE: condiciones
# ------------------------------------------------------------

INSERT INTO
  `condiciones` (`idCondicion`, `Nombre`)
VALUES
  (1, 'Nuevo');
INSERT INTO
  `condiciones` (`idCondicion`, `Nombre`)
VALUES
  (2, 'Bueno');
INSERT INTO
  `condiciones` (`idCondicion`, `Nombre`)
VALUES
  (3, 'Regular');
INSERT INTO
  `condiciones` (`idCondicion`, `Nombre`)
VALUES
  (4, 'Malo');
INSERT INTO
  `condiciones` (`idCondicion`, `Nombre`)
VALUES
  (5, 'Obsoleto y/o Pesimo');
INSERT INTO
  `condiciones` (`idCondicion`, `Nombre`)
VALUES
  (6, 'Perdido');

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: depreciaciones
# ------------------------------------------------------------

INSERT INTO
  `depreciaciones` (
    `idDepreciacion`,
    `UfvActual`,
    `UfvInicial`,
    `Fecha`,
    `ValorContabilizado`,
    `FactorActual`,
    `ValorActualizado`,
    `IncrementoActual`,
    `DepreciacionAcuAnt`,
    `IncrementoDepAcu`,
    `DepreciacionPeriodo`,
    `DepreciacionAcuAct`,
    `ValorNeto`,
    `PorcentajeDep`,
    `VidaUtilActual`,
    `VidaUtilMes`,
    `idActivo`
  )
VALUES
  (
    18,
    1.085930,
    1.040640,
    '2022-07-30 21:26:30',
    16312.50,
    0.043521,
    17022.44,
    709.94,
    0.00,
    0.00,
    4255.61,
    4255.61,
    12766.83,
    0.25,
    3,
    0,
    2
  );
INSERT INTO
  `depreciaciones` (
    `idDepreciacion`,
    `UfvActual`,
    `UfvInicial`,
    `Fecha`,
    `ValorContabilizado`,
    `FactorActual`,
    `ValorActualizado`,
    `IncrementoActual`,
    `DepreciacionAcuAnt`,
    `IncrementoDepAcu`,
    `DepreciacionPeriodo`,
    `DepreciacionAcuAct`,
    `ValorNeto`,
    `PorcentajeDep`,
    `VidaUtilActual`,
    `VidaUtilMes`,
    `idActivo`
  )
VALUES
  (
    19,
    1.144430,
    1.085930,
    '2022-07-30 21:28:20',
    17022.44,
    0.053871,
    17939.45,
    917.01,
    4255.61,
    229.25,
    4484.86,
    8969.72,
    8969.73,
    0.25,
    2,
    0,
    2
  );
INSERT INTO
  `depreciaciones` (
    `idDepreciacion`,
    `UfvActual`,
    `UfvInicial`,
    `Fecha`,
    `ValorContabilizado`,
    `FactorActual`,
    `ValorActualizado`,
    `IncrementoActual`,
    `DepreciacionAcuAnt`,
    `IncrementoDepAcu`,
    `DepreciacionPeriodo`,
    `DepreciacionAcuAct`,
    `ValorNeto`,
    `PorcentajeDep`,
    `VidaUtilActual`,
    `VidaUtilMes`,
    `idActivo`
  )
VALUES
  (
    20,
    1.193260,
    1.144430,
    '2022-07-30 21:43:43',
    17939.45,
    0.042668,
    18704.88,
    765.43,
    8969.72,
    382.72,
    4676.22,
    14028.66,
    4676.22,
    0.25,
    1,
    0,
    2
  );
INSERT INTO
  `depreciaciones` (
    `idDepreciacion`,
    `UfvActual`,
    `UfvInicial`,
    `Fecha`,
    `ValorContabilizado`,
    `FactorActual`,
    `ValorActualizado`,
    `IncrementoActual`,
    `DepreciacionAcuAnt`,
    `IncrementoDepAcu`,
    `DepreciacionPeriodo`,
    `DepreciacionAcuAct`,
    `ValorNeto`,
    `PorcentajeDep`,
    `VidaUtilActual`,
    `VidaUtilMes`,
    `idActivo`
  )
VALUES
  (
    21,
    1.288835,
    1.193260,
    '2022-07-30 21:44:13',
    18704.88,
    0.080096,
    20203.06,
    1498.18,
    14028.66,
    1123.64,
    5050.77,
    20203.07,
    1.00,
    0.25,
    0,
    0,
    2
  );
INSERT INTO
  `depreciaciones` (
    `idDepreciacion`,
    `UfvActual`,
    `UfvInicial`,
    `Fecha`,
    `ValorContabilizado`,
    `FactorActual`,
    `ValorActualizado`,
    `IncrementoActual`,
    `DepreciacionAcuAnt`,
    `IncrementoDepAcu`,
    `DepreciacionPeriodo`,
    `DepreciacionAcuAct`,
    `ValorNeto`,
    `PorcentajeDep`,
    `VidaUtilActual`,
    `VidaUtilMes`,
    `idActivo`
  )
VALUES
  (
    22,
    1.085930,
    1.040640,
    '2022-07-30 21:44:48',
    30276.00,
    0.043521,
    31593.65,
    1317.65,
    0.00,
    0.00,
    2632.80,
    2632.80,
    28960.85,
    0.25,
    3,
    8,
    3
  );
INSERT INTO
  `depreciaciones` (
    `idDepreciacion`,
    `UfvActual`,
    `UfvInicial`,
    `Fecha`,
    `ValorContabilizado`,
    `FactorActual`,
    `ValorActualizado`,
    `IncrementoActual`,
    `DepreciacionAcuAnt`,
    `IncrementoDepAcu`,
    `DepreciacionPeriodo`,
    `DepreciacionAcuAct`,
    `ValorNeto`,
    `PorcentajeDep`,
    `VidaUtilActual`,
    `VidaUtilMes`,
    `idActivo`
  )
VALUES
  (
    23,
    1.085930,
    1.040640,
    '2022-07-30 21:45:14',
    2350.00,
    0.043521,
    2452.28,
    102.28,
    0.00,
    0.00,
    51.09,
    51.09,
    2401.19,
    0.25,
    3,
    11,
    8
  );
INSERT INTO
  `depreciaciones` (
    `idDepreciacion`,
    `UfvActual`,
    `UfvInicial`,
    `Fecha`,
    `ValorContabilizado`,
    `FactorActual`,
    `ValorActualizado`,
    `IncrementoActual`,
    `DepreciacionAcuAnt`,
    `IncrementoDepAcu`,
    `DepreciacionPeriodo`,
    `DepreciacionAcuAct`,
    `ValorNeto`,
    `PorcentajeDep`,
    `VidaUtilActual`,
    `VidaUtilMes`,
    `idActivo`
  )
VALUES
  (
    24,
    1.144430,
    1.085930,
    '2022-07-30 21:45:56',
    2452.28,
    0.053871,
    2584.39,
    132.11,
    51.09,
    2.75,
    646.10,
    699.94,
    1884.45,
    0.25,
    2,
    11,
    8
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: devoluciones
# ------------------------------------------------------------


# ------------------------------------------------------------
# DATA DUMP FOR TABLE: edificios
# ------------------------------------------------------------

INSERT INTO
  `edificios` (
    `idEdificio`,
    `NombreEdi`,
    `Servicio`,
    `Direccion`,
    `idUbicacion`
  )
VALUES
  (
    1,
    'Dirección D. Fe y Alegría Chuquisaca',
    'Dirección Departamental de Chuquisaca',
    'Hospital Universitario',
    1
  );
INSERT INTO
  `edificios` (
    `idEdificio`,
    `NombreEdi`,
    `Servicio`,
    `Direccion`,
    `idUbicacion`
  )
VALUES
  (
    2,
    'UE José Maria Velaz',
    'Colegio de enseñanza',
    'Zona Sagrada Familia',
    1
  );
INSERT INTO
  `edificios` (
    `idEdificio`,
    `NombreEdi`,
    `Servicio`,
    `Direccion`,
    `idUbicacion`
  )
VALUES
  (
    4,
    'UE Sagrada Familia',
    'Colegio de enseñanza ',
    'Zona Sagrada Familia',
    1
  );
INSERT INTO
  `edificios` (
    `idEdificio`,
    `NombreEdi`,
    `Servicio`,
    `Direccion`,
    `idUbicacion`
  )
VALUES
  (
    5,
    'IT Aurora Rossells',
    'Instituto técnico',
    'Azurduy #57',
    1
  );
INSERT INTO
  `edificios` (
    `idEdificio`,
    `NombreEdi`,
    `Servicio`,
    `Direccion`,
    `idUbicacion`
  )
VALUES
  (
    6,
    'UE San Xavier A',
    'Colegio de enseñanza',
    'Rene Barrientos',
    1
  );
INSERT INTO
  `edificios` (
    `idEdificio`,
    `NombreEdi`,
    `Servicio`,
    `Direccion`,
    `idUbicacion`
  )
VALUES
  (
    7,
    'UE San Xavier B',
    'Colegio de enseñanza',
    'Rene Barrientos',
    1
  );
INSERT INTO
  `edificios` (
    `idEdificio`,
    `NombreEdi`,
    `Servicio`,
    `Direccion`,
    `idUbicacion`
  )
VALUES
  (
    8,
    'C.E.A Francisco Cermeño',
    'Centro de educación técnica alternativa',
    ' Av monseñor santillan #12',
    1
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: empleados
# ------------------------------------------------------------

INSERT INTO
  `empleados` (
    `idEmpleado`,
    `Nombres`,
    `Apellidos`,
    `Cargo`,
    `Telefono`,
    `Direccion`,
    `idAmbient`
  )
VALUES
  (
    1,
    'Alvaro Froilan',
    'Condori Zamora',
    'Jefe de Administracion y Contabilidad',
    '67543212',
    'Junin Nª231',
    2
  );
INSERT INTO
  `empleados` (
    `idEmpleado`,
    `Nombres`,
    `Apellidos`,
    `Cargo`,
    `Telefono`,
    `Direccion`,
    `idAmbient`
  )
VALUES
  (
    2,
    'Salome',
    'Duran Loaysa',
    'Jefe de Almacenes',
    '67543213',
    'Loa N°4',
    1
  );
INSERT INTO
  `empleados` (
    `idEmpleado`,
    `Nombres`,
    `Apellidos`,
    `Cargo`,
    `Telefono`,
    `Direccion`,
    `idAmbient`
  )
VALUES
  (
    3,
    'Weimar',
    'Alata Carmona',
    'Jefe de Area de Valores Humano Cristiano',
    '78654234',
    'Calle Ravelo S/N',
    5
  );
INSERT INTO
  `empleados` (
    `idEmpleado`,
    `Nombres`,
    `Apellidos`,
    `Cargo`,
    `Telefono`,
    `Direccion`,
    `idAmbient`
  )
VALUES
  (
    4,
    'Dunia',
    'Aguirre',
    'Jefe de Yacha Wasi',
    '987654321',
    'Calle Bustillos N°23',
    5
  );
INSERT INTO
  `empleados` (
    `idEmpleado`,
    `Nombres`,
    `Apellidos`,
    `Cargo`,
    `Telefono`,
    `Direccion`,
    `idAmbient`
  )
VALUES
  (
    5,
    'Margaret',
    'López Grágeda',
    'Directora',
    '5643245',
    'Mercado Campesino N°123',
    6
  );
INSERT INTO
  `empleados` (
    `idEmpleado`,
    `Nombres`,
    `Apellidos`,
    `Cargo`,
    `Telefono`,
    `Direccion`,
    `idAmbient`
  )
VALUES
  (
    6,
    'Jesus R.',
    'Rejas Léon',
    'Jefe de educación especial',
    '79686875',
    'Mutun #34',
    5
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: historialactivofijo
# ------------------------------------------------------------

INSERT INTO
  `historialactivofijo` (
    `idHistorial`,
    `FechaHistorial`,
    `CodActivo`,
    `CodEmpleado`,
    `CodProyecto`,
    `CodAmbiente`
  )
VALUES
  (1, '2022-07-28 17:40:02', 2, 3, 1, 5);
INSERT INTO
  `historialactivofijo` (
    `idHistorial`,
    `FechaHistorial`,
    `CodActivo`,
    `CodEmpleado`,
    `CodProyecto`,
    `CodAmbiente`
  )
VALUES
  (2, '2022-07-12 18:13:28', 5, 1, 2, 2);
INSERT INTO
  `historialactivofijo` (
    `idHistorial`,
    `FechaHistorial`,
    `CodActivo`,
    `CodEmpleado`,
    `CodProyecto`,
    `CodAmbiente`
  )
VALUES
  (3, '2022-07-16 12:38:15', 14, 2, 5, 1);
INSERT INTO
  `historialactivofijo` (
    `idHistorial`,
    `FechaHistorial`,
    `CodActivo`,
    `CodEmpleado`,
    `CodProyecto`,
    `CodAmbiente`
  )
VALUES
  (4, '2022-07-16 12:38:23', 10, 2, 5, 1);
INSERT INTO
  `historialactivofijo` (
    `idHistorial`,
    `FechaHistorial`,
    `CodActivo`,
    `CodEmpleado`,
    `CodProyecto`,
    `CodAmbiente`
  )
VALUES
  (5, '2022-07-22 16:53:24', 8, 1, 2, 2);
INSERT INTO
  `historialactivofijo` (
    `idHistorial`,
    `FechaHistorial`,
    `CodActivo`,
    `CodEmpleado`,
    `CodProyecto`,
    `CodAmbiente`
  )
VALUES
  (6, '2022-07-22 19:15:06', 13, 3, 1, 5);
INSERT INTO
  `historialactivofijo` (
    `idHistorial`,
    `FechaHistorial`,
    `CodActivo`,
    `CodEmpleado`,
    `CodProyecto`,
    `CodAmbiente`
  )
VALUES
  (8, '2022-07-28 18:03:44', 5, 3, 1, 5);
INSERT INTO
  `historialactivofijo` (
    `idHistorial`,
    `FechaHistorial`,
    `CodActivo`,
    `CodEmpleado`,
    `CodProyecto`,
    `CodAmbiente`
  )
VALUES
  (9, '2022-07-30 21:10:05', 2, 1, 14, 2);
INSERT INTO
  `historialactivofijo` (
    `idHistorial`,
    `FechaHistorial`,
    `CodActivo`,
    `CodEmpleado`,
    `CodProyecto`,
    `CodAmbiente`
  )
VALUES
  (10, '2022-07-30 21:10:16', 3, 1, 14, 2);
INSERT INTO
  `historialactivofijo` (
    `idHistorial`,
    `FechaHistorial`,
    `CodActivo`,
    `CodEmpleado`,
    `CodProyecto`,
    `CodAmbiente`
  )
VALUES
  (11, '2022-07-30 21:10:22', 4, 1, 14, 2);
INSERT INTO
  `historialactivofijo` (
    `idHistorial`,
    `FechaHistorial`,
    `CodActivo`,
    `CodEmpleado`,
    `CodProyecto`,
    `CodAmbiente`
  )
VALUES
  (12, '2022-07-30 21:10:30', 5, 1, 14, 2);
INSERT INTO
  `historialactivofijo` (
    `idHistorial`,
    `FechaHistorial`,
    `CodActivo`,
    `CodEmpleado`,
    `CodProyecto`,
    `CodAmbiente`
  )
VALUES
  (13, '2022-07-30 21:10:36', 6, 1, 14, 2);
INSERT INTO
  `historialactivofijo` (
    `idHistorial`,
    `FechaHistorial`,
    `CodActivo`,
    `CodEmpleado`,
    `CodProyecto`,
    `CodAmbiente`
  )
VALUES
  (14, '2022-07-30 21:10:45', 12, 1, 14, 2);
INSERT INTO
  `historialactivofijo` (
    `idHistorial`,
    `FechaHistorial`,
    `CodActivo`,
    `CodEmpleado`,
    `CodProyecto`,
    `CodAmbiente`
  )
VALUES
  (15, '2022-07-30 21:11:01', 9, 1, 14, 2);
INSERT INTO
  `historialactivofijo` (
    `idHistorial`,
    `FechaHistorial`,
    `CodActivo`,
    `CodEmpleado`,
    `CodProyecto`,
    `CodAmbiente`
  )
VALUES
  (16, '2022-07-30 21:11:10', 14, 1, 14, 2);
INSERT INTO
  `historialactivofijo` (
    `idHistorial`,
    `FechaHistorial`,
    `CodActivo`,
    `CodEmpleado`,
    `CodProyecto`,
    `CodAmbiente`
  )
VALUES
  (17, '2022-07-30 21:11:19', 21, 1, 14, 2);
INSERT INTO
  `historialactivofijo` (
    `idHistorial`,
    `FechaHistorial`,
    `CodActivo`,
    `CodEmpleado`,
    `CodProyecto`,
    `CodAmbiente`
  )
VALUES
  (18, '2022-07-30 21:18:37', 10, 6, 10, 5);
INSERT INTO
  `historialactivofijo` (
    `idHistorial`,
    `FechaHistorial`,
    `CodActivo`,
    `CodEmpleado`,
    `CodProyecto`,
    `CodAmbiente`
  )
VALUES
  (19, '2022-07-30 21:18:51', 24, 6, 10, 5);
INSERT INTO
  `historialactivofijo` (
    `idHistorial`,
    `FechaHistorial`,
    `CodActivo`,
    `CodEmpleado`,
    `CodProyecto`,
    `CodAmbiente`
  )
VALUES
  (20, '2022-07-30 21:19:15', 20, 6, 10, 5);
INSERT INTO
  `historialactivofijo` (
    `idHistorial`,
    `FechaHistorial`,
    `CodActivo`,
    `CodEmpleado`,
    `CodProyecto`,
    `CodAmbiente`
  )
VALUES
  (21, '2022-07-30 21:19:44', 26, 6, 10, 5);
INSERT INTO
  `historialactivofijo` (
    `idHistorial`,
    `FechaHistorial`,
    `CodActivo`,
    `CodEmpleado`,
    `CodProyecto`,
    `CodAmbiente`
  )
VALUES
  (22, '2022-07-30 21:19:57', 22, 6, 10, 5);

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: mantenimiento
# ------------------------------------------------------------

INSERT INTO
  `mantenimiento` (
    `idMant`,
    `FechaMant`,
    `Informe`,
    `Costo`,
    `Estado`,
    `idAct`
  )
VALUES
  (
    11,
    '2022-09-09',
    'Falla de rodillo ',
    200.00,
    'En uso',
    24
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: programas
# ------------------------------------------------------------

INSERT INTO
  `programas` (`idPrograma`, `NombreProg`)
VALUES
  (1, 'Educacion Regular');
INSERT INTO
  `programas` (`idPrograma`, `NombreProg`)
VALUES
  (2, 'Educacion Especial');
INSERT INTO
  `programas` (`idPrograma`, `NombreProg`)
VALUES
  (3, 'Educacion en Valores');
INSERT INTO
  `programas` (`idPrograma`, `NombreProg`)
VALUES
  (4, 'Educacion Desescolarizada');
INSERT INTO
  `programas` (`idPrograma`, `NombreProg`)
VALUES
  (5, 'Educacion Tecnica');
INSERT INTO
  `programas` (`idPrograma`, `NombreProg`)
VALUES
  (6, 'Contabilidad y Administracion');
INSERT INTO
  `programas` (`idPrograma`, `NombreProg`)
VALUES
  (7, 'Recursos Humanos y Estadisticas');

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: proveedores
# ------------------------------------------------------------

INSERT INTO
  `proveedores` (
    `idProveedor`,
    `NombreProv`,
    `DireccionProv`,
    `TelefonoProv`
  )
VALUES
  (1, 'Sin proveedor', NULL, NULL);
INSERT INTO
  `proveedores` (
    `idProveedor`,
    `NombreProv`,
    `DireccionProv`,
    `TelefonoProv`
  )
VALUES
  (
    2,
    'Muebles Don Juan',
    'Hernando siles Nª345',
    '78654321'
  );
INSERT INTO
  `proveedores` (
    `idProveedor`,
    `NombreProv`,
    `DireccionProv`,
    `TelefonoProv`
  )
VALUES
  (3, 'ElectroFex', 'Jinin Nª876', '78654309');
INSERT INTO
  `proveedores` (
    `idProveedor`,
    `NombreProv`,
    `DireccionProv`,
    `TelefonoProv`
  )
VALUES
  (
    4,
    'ServiTex',
    'Marcelo Quiroga Santa Cruz Nª980',
    '6578543'
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: proyectos
# ------------------------------------------------------------

INSERT INTO
  `proyectos` (
    `idProyecto`,
    `NombrePro`,
    `FechaInicio`,
    `FechaFin`,
    `idPrograma`
  )
VALUES
  (
    6,
    'Comunidades educativas libres de violencia.',
    '2019-02-04',
    '2022-11-15',
    1
  );
INSERT INTO
  `proyectos` (
    `idProyecto`,
    `NombrePro`,
    `FechaInicio`,
    `FechaFin`,
    `idPrograma`
  )
VALUES
  (
    7,
    'Calidad Educativa con enfoque de género',
    '2018-03-12',
    '2023-04-03',
    3
  );
INSERT INTO
  `proyectos` (
    `idProyecto`,
    `NombrePro`,
    `FechaInicio`,
    `FechaFin`,
    `idPrograma`
  )
VALUES
  (
    8,
    'Réplica de procesos de mejora de la empleabilidad e inserción laboral',
    '2019-02-23',
    '2023-12-15',
    5
  );
INSERT INTO
  `proyectos` (
    `idProyecto`,
    `NombrePro`,
    `FechaInicio`,
    `FechaFin`,
    `idPrograma`
  )
VALUES
  (9, 'Tejiendo Futuros', '2022-05-03', '2022-11-12', 4);
INSERT INTO
  `proyectos` (
    `idProyecto`,
    `NombrePro`,
    `FechaInicio`,
    `FechaFin`,
    `idPrograma`
  )
VALUES
  (
    10,
    'Inclusión socioeducativa de personas con discapacidad',
    '2021-06-20',
    '2022-11-12',
    2
  );
INSERT INTO
  `proyectos` (
    `idProyecto`,
    `NombrePro`,
    `FechaInicio`,
    `FechaFin`,
    `idPrograma`
  )
VALUES
  (
    11,
    'Fortalecimiento de los procesos de gestión de Centros Educativos para la inclusión socioeducativa de estudiantes con discapacidad en la ciudad de Sucre',
    '2020-02-23',
    '2024-11-23',
    2
  );
INSERT INTO
  `proyectos` (
    `idProyecto`,
    `NombrePro`,
    `FechaInicio`,
    `FechaFin`,
    `idPrograma`
  )
VALUES
  (
    12,
    'Producción Agrícola Orgánica a campo abierto y bajo cubierta con estudiantes y familias campesinas de la Casa del Saber de Sarufaya de Fe y Alegría. Chuquisaca / Bolivia',
    '2021-04-20',
    '2022-11-23',
    4
  );
INSERT INTO
  `proyectos` (
    `idProyecto`,
    `NombrePro`,
    `FechaInicio`,
    `FechaFin`,
    `idPrograma`
  )
VALUES
  (
    13,
    '. Cultura de paz desde los valores del Evangelio.',
    '2022-02-03',
    '2023-11-23',
    3
  );
INSERT INTO
  `proyectos` (
    `idProyecto`,
    `NombrePro`,
    `FechaInicio`,
    `FechaFin`,
    `idPrograma`
  )
VALUES
  (
    14,
    'Formación para el Fortalecimiento Institucional.',
    '2022-01-01',
    '2023-01-01',
    6
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: revalorizaciones
# ------------------------------------------------------------


# ------------------------------------------------------------
# DATA DUMP FOR TABLE: rubros
# ------------------------------------------------------------

INSERT INTO
  `rubros` (
    `idRubro`,
    `Nombre`,
    `VidaUtil`,
    `Depreciable`,
    `CoeficienteD`,
    `Actualiza`
  )
VALUES
  (1, 'Edificios', 40, 1, 0.025, 1);
INSERT INTO
  `rubros` (
    `idRubro`,
    `Nombre`,
    `VidaUtil`,
    `Depreciable`,
    `CoeficienteD`,
    `Actualiza`
  )
VALUES
  (2, 'Mueblesy Enseres', 10, 1, 0.1, 1);
INSERT INTO
  `rubros` (
    `idRubro`,
    `Nombre`,
    `VidaUtil`,
    `Depreciable`,
    `CoeficienteD`,
    `Actualiza`
  )
VALUES
  (3, 'Vehiculos', 5, 1, 0.2, 1);
INSERT INTO
  `rubros` (
    `idRubro`,
    `Nombre`,
    `VidaUtil`,
    `Depreciable`,
    `CoeficienteD`,
    `Actualiza`
  )
VALUES
  (4, 'Equipos de Computacion', 4, 1, 0.25, 1);
INSERT INTO
  `rubros` (
    `idRubro`,
    `Nombre`,
    `VidaUtil`,
    `Depreciable`,
    `CoeficienteD`,
    `Actualiza`
  )
VALUES
  (5, 'Equipo y Maquinaria', 8, 1, 0.125, 1);

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: tiposactivos
# ------------------------------------------------------------

INSERT INTO
  `tiposactivos` (`idTipo`, `NombreActivo`, `DescripcionMant`)
VALUES
  (1, 'Estante', 'Cada 3 meses');
INSERT INTO
  `tiposactivos` (`idTipo`, `NombreActivo`, `DescripcionMant`)
VALUES
  (2, 'Escritorio', 'Cada 3 meses');
INSERT INTO
  `tiposactivos` (`idTipo`, `NombreActivo`, `DescripcionMant`)
VALUES
  (3, 'Computadora', 'Cada 3 meses');
INSERT INTO
  `tiposactivos` (`idTipo`, `NombreActivo`, `DescripcionMant`)
VALUES
  (4, 'Silla', 'Cada 3 meses');
INSERT INTO
  `tiposactivos` (`idTipo`, `NombreActivo`, `DescripcionMant`)
VALUES
  (5, 'Mesa', 'Cada 3 meses');
INSERT INTO
  `tiposactivos` (`idTipo`, `NombreActivo`, `DescripcionMant`)
VALUES
  (6, 'Vehiculo', 'Cada 3 meses');
INSERT INTO
  `tiposactivos` (`idTipo`, `NombreActivo`, `DescripcionMant`)
VALUES
  (7, 'Impresora', 'Cada 3 meses');
INSERT INTO
  `tiposactivos` (`idTipo`, `NombreActivo`, `DescripcionMant`)
VALUES
  (12, 'Gabetero', 'cada 1 año');
INSERT INTO
  `tiposactivos` (`idTipo`, `NombreActivo`, `DescripcionMant`)
VALUES
  (13, 'Telefono', 'cada 12 años');
INSERT INTO
  `tiposactivos` (`idTipo`, `NombreActivo`, `DescripcionMant`)
VALUES
  (14, 'Estabilizador', 'cada 1 año');

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: ubicaciones
# ------------------------------------------------------------

INSERT INTO
  `ubicaciones` (`idUbicacion`, `NombreLugar`)
VALUES
  (1, 'Sucre');
INSERT INTO
  `ubicaciones` (`idUbicacion`, `NombreLugar`)
VALUES
  (2, 'Tarabuco');
INSERT INTO
  `ubicaciones` (`idUbicacion`, `NombreLugar`)
VALUES
  (3, 'Tomina');
INSERT INTO
  `ubicaciones` (`idUbicacion`, `NombreLugar`)
VALUES
  (4, 'Presto');
INSERT INTO
  `ubicaciones` (`idUbicacion`, `NombreLugar`)
VALUES
  (5, 'Zudañes');
INSERT INTO
  `ubicaciones` (`idUbicacion`, `NombreLugar`)
VALUES
  (6, 'Mojocoya');
INSERT INTO
  `ubicaciones` (`idUbicacion`, `NombreLugar`)
VALUES
  (7, 'Padilla');

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: usuarios
# ------------------------------------------------------------

INSERT INTO
  `usuarios` (
    `idUsuario`,
    `idEmplead`,
    `Email`,
    `Password`,
    `Rol`,
    `Estado`
  )
VALUES
  (
    1,
    1,
    'alvaro@gmail.com',
    '$2a$10$U7NekTv0PYpWBpGC0FfLS.P6hJubVoa3tmR7bYRKWbHhXojOz5YPq',
    'ADMIN',
    'ACTIVO'
  );
INSERT INTO
  `usuarios` (
    `idUsuario`,
    `idEmplead`,
    `Email`,
    `Password`,
    `Rol`,
    `Estado`
  )
VALUES
  (
    2,
    2,
    'salome@gmail.com',
    '$2a$10$wRt2UmwJry/RSxEuzH378uI3.jKZzg.IWLxFNSswk6PRmGzLvI/xm',
    'R.ALAMACEN',
    'ACTIVO'
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: valordepreciacion
# ------------------------------------------------------------

INSERT INTO
  `valordepreciacion` (`idValorDep`, `Valor`, `FechaValorDep`)
VALUES
  (2, 300, '2022-07-28 21:51:36');
INSERT INTO
  `valordepreciacion` (`idValorDep`, `Valor`, `FechaValorDep`)
VALUES
  (3, 500, '2022-07-29 15:48:56');

/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
