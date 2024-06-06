CREATE DATABASE IF NOT EXISTS `vhd_store`;
USE `vhd_store`;

GRANT SELECT, INSERT, UPDATE, DELETE ON `vhd\_store`.* TO `backend-server`@`%`;

-- DROP TABLE IF EXISTS `OrderLine`;
-- DROP TABLE IF EXISTS `Order`;
-- DROP TABLE IF EXISTS `Product`;
-- DROP TABLE IF EXISTS `User`;

CREATE TABLE `User` (
 `id` int NOT NULL AUTO_INCREMENT,
 `firstName` varchar(100) DEFAULT NULL,
 `lastName` varchar(100) DEFAULT NULL,
 `username` varchar(50) NOT NULL,
 `password` varchar(60) NOT NULL,
 `company` varchar(100) DEFAULT NULL,
 `userType` varchar(50) DEFAULT NULL,
 `userRole` varchar(50) DEFAULT NULL,

 PRIMARY KEY (`id`),
 UNIQUE KEY `ix_user_username` (`username`)
);

CREATE TABLE `Order` (
 `id` int NOT NULL AUTO_INCREMENT,
 `customerId` int NOT NULL,
 `address` varchar(200) DEFAULT NULL,
 `status` varchar(50) DEFAULT NULL,

 PRIMARY KEY (`id`),
 KEY `customerId` (`customerId`),
 CONSTRAINT `fk_order_customerId_user_id` FOREIGN KEY (`customerId`) REFERENCES `User` (`id`)
);

CREATE TABLE `Product` (
 `id` int NOT NULL AUTO_INCREMENT,
 `name` varchar(100) NOT NULL,
 `description` varchar(2000) DEFAULT NULL,
 `imageUrl` varchar(5000) DEFAULT NULL,
 `unitPrice` decimal(20,4) NOT NULL,
 `quantityAvailable` int NOT NULL,

 PRIMARY KEY (`id`)
);

CREATE TABLE `OrderLine` (
 `id` int NOT NULL AUTO_INCREMENT,
 `orderId` int NOT NULL,
 `productId` int NOT NULL,
 `quantity` int NOT NULL,
 `unitPrice` decimal(20,4) NOT NULL,

 PRIMARY KEY (`id`),
 KEY `orderId` (`orderId`),
 KEY `productId` (`productId`),
 CONSTRAINT `fk_orderLine_orderId_order_id` FOREIGN KEY (`orderId`) REFERENCES `Order` (`id`),
 CONSTRAINT `fk_product_productId_product_id` FOREIGN KEY (`productId`) REFERENCES `Product` (`id`)
);
