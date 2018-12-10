CREATE DATABASE  IF NOT EXISTS `booking_cars` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci */;
USE `booking_cars`;
-- MySQL dump 10.13  Distrib 5.7.24, for macos10.14 (x86_64)
--
-- Host: 127.0.0.1    Database: booking_cars
-- ------------------------------------------------------
-- Server version	5.7.24

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `REQUESTS`
--

DROP TABLE IF EXISTS `REQUESTS`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `REQUESTS` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `GuestName` varchar(200) CHARACTER SET utf8 DEFAULT NULL,
  `GuestTelephone` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `NameLocation` varchar(200) CHARACTER SET utf8 DEFAULT NULL,
  `Latitude` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Longtitude` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Note` varchar(200) CHARACTER SET utf8 DEFAULT NULL,
  `Status` int(11) DEFAULT '3',
  `HandlingStaff` int(11) DEFAULT NULL,
  `created_at` int(11) DEFAULT '0',
  `FinishLocationName` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `FinishLatitude` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `FinishLongtitude` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `FK_RQ_STS_idx` (`Status`),
  KEY `FK_RQ_URS_idx` (`HandlingStaff`),
  CONSTRAINT `FK_RQ_STS` FOREIGN KEY (`Status`) REFERENCES `STATUS` (`ID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_RQ_URS` FOREIGN KEY (`HandlingStaff`) REFERENCES `USERS` (`ID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=83 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `REQUESTS`
--

LOCK TABLES `REQUESTS` WRITE;
/*!40000 ALTER TABLE `REQUESTS` DISABLE KEYS */;
INSERT INTO `REQUESTS` VALUES (1,'Luan','0122 827 321','Cửa Hàng Đtdđ Tuấn Anh','10.763274726653961','106.6824559682617',NULL,5,2,1543680344,'Chợ bàu sen P4, Q5 TPHCM',NULL,NULL),(2,'Luan','0123 328 923','Cửa hàng dụng cụ y khoa','10.7599171','106.68225830000006','',6,1,1543680344,'Chợ bàu sen P4, Q5 TPHCM','10.8637312','106.77949349999994'),(61,'Luan 1DT','0123 843 123','Cửa hàng dụng cụ y khoa 10','10.7830797','106.69530989999998','',6,1,1543684811,'Chợ bàu sen P4, Q5 TPHCM','10.7733306','106.65942080000002'),(62,'Luan 1DT','0123 843 123','Cửa hàng dụng cụ y khoa 11','10.7733306','106.65942080000002','',6,1,1543684816,'Chợ bàu sen P4, Q5 TPHCM','10.7623978','106.68275199999994'),(63,'Luan 1DT','0123 843 123','Cửa hàng dụng cụ y khoa 12','10.7623978','106.68275199999994','',6,1,1543684908,'Chợ bàu sen P4, Q5 TPHCM','10.7523551','106.67570679999994'),(64,'Luan 1DT','0123 843 123','Cửa hàng dụng cụ y khoa 13','10.753524','106.67424699999992','',6,1,1543684933,'Chợ bàu sen P4, Q5 TPHCM','10.7688147','106.68506400000001'),(65,'Luan 1DT','0123 843 123','Cửa hàng dụng cụ y khoa 14',NULL,NULL,'',3,NULL,1543685741,'Chợ bàu sen P4, Q5 TPHCM',NULL,NULL),(66,'Luan 1DT','0123 843 123','Cửa hàng dụng cụ y khoa 14',NULL,NULL,'',3,NULL,1543685749,'Chợ bàu sen P4, Q5 TPHCM',NULL,NULL),(67,'Luan 1DT','0123 843 123','Cửa hàng dụng cụ y khoa 14',NULL,NULL,'',3,NULL,1543685754,'Chợ bàu sen P4, Q5 TPHCM',NULL,NULL),(68,'Luan 1DT','0123 843 123','Cửa hàng dụng cụ y khoa 15',NULL,NULL,'',3,NULL,1543685764,'Chợ bàu sen P4, Q5 TPHCM',NULL,NULL),(69,'Luan 1DT','0123 843 123','Cửa hàng dụng cụ y khoa 15',NULL,NULL,'',3,NULL,1543685778,'Chợ bàu sen P4, Q5 TPHCM',NULL,NULL),(70,'Luan 1DT','0123 843 123','Cửa hàng dụng cụ y khoa 15',NULL,NULL,'',3,NULL,1543685782,'Chợ bàu sen P4, Q5 TPHCM',NULL,NULL),(71,'Luan 1DT','0123 843 123','Cửa hàng dụng cụ y khoa 15',NULL,NULL,'',3,NULL,1543685856,'Chợ bàu sen P4, Q5 TPHCM',NULL,NULL),(72,'Luan 1DT','0123 843 123','Cửa hàng dụng cụ y khoa 15',NULL,NULL,'',3,NULL,1543685857,'Chợ bàu sen P4, Q5 TPHCM',NULL,NULL),(73,'Luan 1DT','0123 843 123','Cửa hàng dụng cụ y khoa 15',NULL,NULL,'',3,NULL,1543685858,'Chợ bàu sen P4, Q5 TPHCM',NULL,NULL),(74,'Luan 1DT','0123 843 123','Cửa hàng dụng cụ y khoa 16',NULL,NULL,'',3,NULL,1543685888,'Chợ bàu sen P4, Q5 TPHCM',NULL,NULL),(75,'Luan 1DT','0123 843 123','Cửa hàng dụng cụ y khoa 16',NULL,NULL,'',3,NULL,1543732060,'Chợ bàu sen P4, Q5 TPHCM',NULL,NULL),(76,'Luan 1DT','0123 843 123','Cửa hàng dụng cụ y khoa 16',NULL,NULL,'',3,NULL,1543732086,'Chợ bàu sen P4, Q5 TPHCM',NULL,NULL),(77,'Luan 1DT','0123 843 123','Cửa hàng dụng cụ y khoa 16',NULL,NULL,'',3,NULL,1543732114,'Chợ bàu sen P4, Q5 TPHCM',NULL,NULL),(78,'Luan 1DT','0123 843 123','Cửa hàng dụng cụ y khoa 16',NULL,NULL,'',3,NULL,1543732132,'Chợ bàu sen P4, Q5 TPHCM',NULL,NULL),(79,'Luan 1DT','0123 843 123','Cửa hàng dụng cụ y khoa 16',NULL,NULL,'',3,NULL,1543732152,'Chợ bàu sen P4, Q5 TPHCM',NULL,NULL),(80,'Luan 1DT','0123 843 123','Cửa hàng dụng cụ y khoa 16',NULL,NULL,'',3,NULL,1543732209,'Chợ bàu sen P4, Q5 TPHCM',NULL,NULL),(81,'Luan 1DT','0123 843 123','Cửa hàng dụng cụ y khoa 20',NULL,NULL,'',3,NULL,1543732545,'Chợ bàu sen P4, Q5 TPHCM',NULL,NULL),(82,'Luan 1DT','0123 843 123','Cửa hàng dụng cụ y khoa 20',NULL,NULL,'',3,NULL,1543732596,'Chợ bàu sen P4, Q5 TPHCM',NULL,NULL);
/*!40000 ALTER TABLE `REQUESTS` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ROLES`
--

DROP TABLE IF EXISTS `ROLES`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ROLES` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(200) CHARACTER SET utf8 DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ROLES`
--

LOCK TABLES `ROLES` WRITE;
/*!40000 ALTER TABLE `ROLES` DISABLE KEYS */;
INSERT INTO `ROLES` VALUES (1,'Request Receiver'),(2,'Location Identifier'),(3,'Request Manager'),(4,'Driver');
/*!40000 ALTER TABLE `ROLES` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `STATUS`
--

DROP TABLE IF EXISTS `STATUS`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `STATUS` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(200) CHARACTER SET utf8 DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `STATUS`
--

LOCK TABLES `STATUS` WRITE;
/*!40000 ALTER TABLE `STATUS` DISABLE KEYS */;
INSERT INTO `STATUS` VALUES (1,'Đang hoạt động'),(2,'Ngừng hoạt động'),(3,'Đang chờ'),(4,'Đã nhận'),(5,'Đang xử lý yêu cầu'),(6,'Đã xử lý yêu cầu'),(7,'Đang bận');
/*!40000 ALTER TABLE `STATUS` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `USERS`
--

DROP TABLE IF EXISTS `USERS`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `USERS` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Username` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Password` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `RefreshToken` varchar(2000) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ID_Roles` int(11) NOT NULL,
  `Status` int(11) NOT NULL DEFAULT '2',
  PRIMARY KEY (`ID`),
  KEY `FK_USR_RLS_idx` (`ID_Roles`),
  KEY `FK_USR_STS_idx` (`Status`),
  CONSTRAINT `FK_USR_RLS` FOREIGN KEY (`ID_Roles`) REFERENCES `ROLES` (`ID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_USR_STS` FOREIGN KEY (`Status`) REFERENCES `STATUS` (`ID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `USERS`
--

LOCK TABLES `USERS` WRITE;
/*!40000 ALTER TABLE `USERS` DISABLE KEYS */;
INSERT INTO `USERS` VALUES (1,'minhluan','6040247f302e4eb494bdfbbccd885a7f','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklEIjoxLCJVc2VybmFtZSI6Im1pbmhsdWFuIiwiUGFzc3dvcmQiOiI2MDQwMjQ3ZjMwMmU0ZWI0OTRiZGZiYmNjZDg4NWE3ZiIsIlJlZnJlc2hUb2tlbiI6ImV5SmhiR2NpT2lKSVV6STFOaUlzSW5SNWNDSTZJa3BYVkNKOS5leUoxYzJWeUlqcDdJa2xFSWpveExDSlZjMlZ5Ym1GdFpTSTZJbTFwYm1oc2RXRnVJaXdpVUdGemMzZHZjbVFpT2lJMk1EUXdNalEzWmpNd01tVTBaV0kwT1RSaVpHWmlZbU5qWkRnNE5XRTNaaUlzSWxKbFpuSmxjMmhVYjJ0bGJpSTZJalE0TjJZM1lqSXlaalk0TXpFeVpESmpNV0ppWXprellqRmhaV0UwTkRWaUlpd2lTVVJmVW05c1pYTWlPako5TENKcFlYUWlPakUxTkRReE9UQTNNalVzSW1WNGNDSTZNVFUwTkRJM056RXlOWDAucjBoNkR6NWRTTXRpZVlnd0I0V0p3TlNMTDE0VmlWNEFXQlo4LXNiM3F5TSIsIklEX1JvbGVzIjoyfSwiaWF0IjoxNTQ0MjQ5OTQ2LCJleHAiOjE1NDQzMzYzNDZ9.z7Sm24L3mOls2KkNOgJK7g8a5SW1VbUdS3yexReq2Os',2,2),(2,'luan123','6040247f302e4eb494bdfbbccd885a7f','487f7b22f68312d2c1bbc93b1aea445b',2,2);
/*!40000 ALTER TABLE `USERS` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `DRIVERS`
--

DROP TABLE IF EXISTS `DRIVERS`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `DRIVERS` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Username` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Password` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Latitude` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Longtitude` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `RefreshToken` varchar(2000) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ID_Roles` int(11) NOT NULL DEFAULT '4',
  `Status` int(11) NOT NULL DEFAULT '2',
  PRIMARY KEY (`ID`),
  KEY `FK_DVS_RLS_idx` (`ID_Roles`),
  KEY `FK_DVS_STS_idx` (`Status`),
  CONSTRAINT `FK_DVS_RLS` FOREIGN KEY (`ID_Roles`) REFERENCES `ROLES` (`ID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_DVS_STS` FOREIGN KEY (`Status`) REFERENCES `STATUS` (`ID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `DRIVERS`
--

LOCK TABLES `DRIVERS` WRITE;
/*!40000 ALTER TABLE `DRIVERS` DISABLE KEYS */;
INSERT INTO `DRIVERS` VALUES (1,'chhung','e10adc3949ba59abbe56e057f20f883e','','','',4,2);
/*!40000 ALTER TABLE `DRIVERS` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-12-08 15:32:09
