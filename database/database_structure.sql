-- MariaDB dump 10.17  Distrib 10.4.12-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: economic
-- ------------------------------------------------------
-- Server version	10.4.12-MariaDB-1:10.4.12+maria~bionic

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `category_stock`
--

DROP TABLE IF EXISTS `category_stock`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `category_stock` (
  `category_code` varchar(10) NOT NULL,
  `stock_code` varchar(10) NOT NULL,
  PRIMARY KEY (`category_code`,`stock_code`),
  KEY `FK3vvkfeti5v6taq3ffxh4byvr` (`stock_code`),
  CONSTRAINT `FK3vvkfeti5v6taq3ffxh4byvr` FOREIGN KEY (`stock_code`) REFERENCES `stock` (`stock_code`),
  CONSTRAINT `FKi0eae2rwn61emcb8pf33rek5f` FOREIGN KEY (`category_code`) REFERENCES `stock_category` (`category_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `country`
--

DROP TABLE IF EXISTS `country`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `country` (
  `country_code` varchar(3) NOT NULL,
  `country_name` varchar(50) NOT NULL,
  PRIMARY KEY (`country_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `country_economic_data`
--

DROP TABLE IF EXISTS `country_economic_data`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `country_economic_data` (
  `country_code` varchar(3) NOT NULL,
  `data_code` varchar(10) NOT NULL,
  PRIMARY KEY (`country_code`,`data_code`),
  KEY `FKdxsmqd6lern579xtd1qetkahx` (`data_code`),
  CONSTRAINT `FKdxsmqd6lern579xtd1qetkahx` FOREIGN KEY (`data_code`) REFERENCES `economic_data` (`data_code`),
  CONSTRAINT `FKqarr0w53uvh1hhd7wucfswc6` FOREIGN KEY (`country_code`) REFERENCES `country` (`country_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `economic_data`
--

DROP TABLE IF EXISTS `economic_data`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `economic_data` (
  `data_code` varchar(10) NOT NULL,
  `data_name` varchar(45) NOT NULL,
  `frequency` int(1) DEFAULT NULL COMMENT '0 - Monthly\\n1 - Quarterly\\n2 - Semiannual\\n3 - Annual',
  PRIMARY KEY (`data_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `futures`
--

DROP TABLE IF EXISTS `futures`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `futures` (
  `futures_code` varchar(10) NOT NULL,
  `futures_name` varchar(45) NOT NULL,
  `index_code` varchar(10) DEFAULT NULL COMMENT '追蹤標的',
  PRIMARY KEY (`futures_code`),
  KEY `FK13jehj46fw2iv8btj2jia6v30` (`index_code`),
  CONSTRAINT `FK13jehj46fw2iv8btj2jia6v30` FOREIGN KEY (`index_code`) REFERENCES `stock_index` (`index_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `futures_contract`
--

DROP TABLE IF EXISTS `futures_contract`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `futures_contract` (
  `futures_code` varchar(10) NOT NULL,
  `contract_date` varchar(10) NOT NULL,
  PRIMARY KEY (`futures_code`,`contract_date`),
  CONSTRAINT `FKsogkar8unxvtw6utbf9mmfocr` FOREIGN KEY (`futures_code`) REFERENCES `futures` (`futures_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `hibernate_sequence`
--

DROP TABLE IF EXISTS `hibernate_sequence`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `hibernate_sequence` (
  `next_not_cached_value` bigint(21) NOT NULL,
  `minimum_value` bigint(21) NOT NULL,
  `maximum_value` bigint(21) NOT NULL,
  `start_value` bigint(21) NOT NULL COMMENT 'start value when sequences is created or value if RESTART is used',
  `increment` bigint(21) NOT NULL COMMENT 'increment value',
  `cache_size` bigint(21) unsigned NOT NULL,
  `cycle_option` tinyint(1) unsigned NOT NULL COMMENT '0 if no cycles are allowed, 1 if the sequence should begin a new cycle when maximum_value is passed',
  `cycle_count` bigint(21) NOT NULL COMMENT 'How many cycles have been done'
) ENGINE=InnoDB SEQUENCE=1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `investor`
--

DROP TABLE IF EXISTS `investor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `investor` (
  `investor_code` varchar(3) NOT NULL,
  `investor_name` varchar(20) NOT NULL,
  PRIMARY KEY (`investor_code`),
  UNIQUE KEY `investor_code_UNIQUE` (`investor_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `oauth_token`
--

DROP TABLE IF EXISTS `oauth_token`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `oauth_token` (
  `user_name` varchar(100) NOT NULL,
  `provider_code` int(1) NOT NULL COMMENT '0: Facebook\\n1: Google',
  `access_token` varchar(255) DEFAULT NULL,
  `token_type` varchar(20) DEFAULT NULL,
  `expires_in` int(11) DEFAULT NULL,
  PRIMARY KEY (`user_name`,`provider_code`),
  CONSTRAINT `FK502p53nnh355lum8x8frj8mf3` FOREIGN KEY (`user_name`) REFERENCES `user` (`user_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `portfolio_product`
--

DROP TABLE IF EXISTS `portfolio_product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `portfolio_product` (
  `portfolio_id` int(11) NOT NULL,
  `product_type` int(11) NOT NULL,
  `product_code` varchar(10) NOT NULL,
  `sort` int(11) DEFAULT NULL,
  PRIMARY KEY (`portfolio_id`,`product_type`,`product_code`),
  CONSTRAINT `FK9sglpq1jhxleuq2fmwajfbv8w` FOREIGN KEY (`portfolio_id`) REFERENCES `user_portfolio` (`portfolio_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `stock`
--

DROP TABLE IF EXISTS `stock`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `stock` (
  `stock_code` varchar(10) NOT NULL,
  `stock_name` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`stock_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `stock_category`
--

DROP TABLE IF EXISTS `stock_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `stock_category` (
  `category_code` varchar(10) NOT NULL,
  `category_name` varchar(15) DEFAULT NULL,
  PRIMARY KEY (`category_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `stock_index`
--

DROP TABLE IF EXISTS `stock_index`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `stock_index` (
  `index_code` varchar(10) NOT NULL,
  `index_name` varchar(45) NOT NULL,
  PRIMARY KEY (`index_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `stock_proportion`
--

DROP TABLE IF EXISTS `stock_proportion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `stock_proportion` (
  `rank` int(5) NOT NULL,
  `stock_code` varchar(10) NOT NULL,
  `proportion` float DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  PRIMARY KEY (`rank`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `user_name` varchar(100) NOT NULL,
  `password` varchar(100) DEFAULT NULL,
  `nick_name` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`user_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user_portfolio`
--

DROP TABLE IF EXISTS `user_portfolio`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_portfolio` (
  `portfolio_id` int(11) NOT NULL AUTO_INCREMENT,
  `portfolio_name` varchar(100) NOT NULL,
  `user_name` varchar(100) NOT NULL,
  PRIMARY KEY (`portfolio_id`),
  KEY `FKh77c9fl9f2ug4ymrbwmvydc72` (`user_name`),
  CONSTRAINT `FKh77c9fl9f2ug4ymrbwmvydc72` FOREIGN KEY (`user_name`) REFERENCES `user` (`user_name`)
) ENGINE=InnoDB AUTO_INCREMENT=1002 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Final view structure for view `stock_category_proportion_view`
--

DROP TABLE IF EXISTS `stock_category_proportion_view`;
DROP VIEW IF EXISTS `stock_category_proportion_view`;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_general_ci */;
CREATE VIEW `stock_category_proportion_view` AS
    SELECT 
        `sc`.`category_code` AS `category_code`,
        `sc`.`category_name` AS `category_name`,
        ROUND(SUM(`sp`.`proportion`), 4) AS `proportion`
    FROM
        ((`stock_category` `sc`
        JOIN `category_stock` `cs`)
        JOIN `stock_proportion` `sp`)
    WHERE
        `sc`.`category_code` = `cs`.`category_code`
            AND `cs`.`stock_code` = `sp`.`stock_code`
    GROUP BY `sc`.`category_code` , `sc`.`category_name`;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `stock_proportion_view`
--

DROP TABLE IF EXISTS `stock_proportion_view`;
DROP VIEW IF EXISTS `stock_proportion_view`;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_general_ci */;
CREATE VIEW `stock_proportion_view` AS
    SELECT 
        `cs`.`category_code` AS `category_code`,
        `s`.`stock_code` AS `stock_code`,
        `s`.`stock_name` AS `stock_name`,
        ROUND(`sp`.`proportion`, 4) AS `proportion`
    FROM
        ((`stock` `s`
        JOIN `category_stock` `cs`)
        JOIN `stock_proportion` `sp`)
    WHERE
        `s`.`stock_code` = `cs`.`stock_code`
            AND `s`.`stock_code` = `sp`.`stock_code`;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-01-06  2:08:21
