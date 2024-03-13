CREATE DATABASE rodbar_delivery;

CREATE TABLE `usuarios` (
   `id` INT NOT NULL AUTO_INCREMENT,
   `nombre` VARCHAR(50) NOT NULL,
   `usuario` VARCHAR(50) NOT NULL,
   `email` VARCHAR(100) NOT NULL,
   `password` VARCHAR(100) NOT NULL,
   `imagen` VARCHAR(100) NOT NULL,
   `rolId` INT NOT NULL,
   `createdAd` DATETIME,
   `updatedAd` DATETIME,
   PRIMARY KEY (`id`)
);

CREATE TABLE `productos` (
   `id` INT NOT NULL AUTO_INCREMENT,
   `nombre` VARCHAR(100) NOT NULL,
   `ingredientes` VARCHAR(255) NOT NULL,
   `categoriaId` INT NOT NULL,
   `precio` DECIMAL(12,2) NOT NULL,
   `imagen` VARCHAR(100) NOT NULL,
   `createdAd` DATETIME,
   `updatedAd` DATETIME,
   PRIMARY KEY (`id`)
);

CREATE TABLE `categorias` (
   `id` INT NOT NULL AUTO_INCREMENT,
   `nombre` VARCHAR(50) NOT NULL,
   `createdAd` DATETIME,
   `updatedAd` DATETIME,
   PRIMARY KEY (`id`)
);

CREATE TABLE `usuariosProductos` (
   `id` INT NOT NULL AUTO_INCREMENT,
   `usuarioId` INT NOT NULL,
   `productoId` INT NOT NULL,
   `createdAd` DATETIME,
   `updatedAd` DATETIME,
   PRIMARY KEY (`id`)
);

CREATE TABLE `roles` (
   `id` INT NOT NULL AUTO_INCREMENT,
   `nombre` VARCHAR(50) NOT NULL,
   `createdAd` DATETIME,
   `updatedAd` DATETIME,
   PRIMARY KEY (`id`)
);


ALTER TABLE `usuarios` ADD CONSTRAINT `FK_5e1bebd0-386b-4db7-beef-5d4d5ba39de0` FOREIGN KEY (`rolId`) REFERENCES `roles`(`id`)  ;

ALTER TABLE `productos` ADD CONSTRAINT `FK_3152142b-82a4-4696-ac96-6f1f4d005817` FOREIGN KEY (`categoriaId`) REFERENCES `categorias`(`id`)  ;

ALTER TABLE `UsuariosProductos` ADD CONSTRAINT `FK_79a7c54a-8758-4e2d-9117-1fae98f4451d` FOREIGN KEY (`usuarioId`) REFERENCES `usuarios`(`id`)  ;

ALTER TABLE `UsuariosProductos` ADD CONSTRAINT `FK_8904bccb-e1d6-4f21-8a74-52c89c0862f4` FOREIGN KEY (`productoId`) REFERENCES `productos`(`id`)  ;
