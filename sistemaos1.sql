-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Feb 08, 2023 at 06:38 AM
-- Server version: 5.7.36
-- PHP Version: 7.4.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sistemaos1`
--

-- --------------------------------------------------------

--
-- Table structure for table `autorizacaos`
--

DROP TABLE IF EXISTS `autorizacaos`;
CREATE TABLE IF NOT EXISTS `autorizacaos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `autorizacaos`
--

INSERT INTO `autorizacaos` (`id`, `nome`, `createdAt`, `updatedAt`) VALUES
(1, 'Não Autorizado', '2023-02-08 06:23:35', '2023-02-08 06:23:35'),
(2, 'Pendente de Autorização', '2023-02-08 06:23:35', '2023-02-08 06:23:35'),
(3, 'Autorizado', '2023-02-08 06:24:12', '2023-02-08 06:24:12');

-- --------------------------------------------------------

--
-- Table structure for table `clientes`
--

DROP TABLE IF EXISTS `clientes`;
CREATE TABLE IF NOT EXISTS `clientes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) DEFAULT NULL,
  `endereco` varchar(255) DEFAULT NULL,
  `cpf` varchar(255) DEFAULT NULL,
  `telefone` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `observacao` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `ordemservicos`
--

DROP TABLE IF EXISTS `ordemservicos`;
CREATE TABLE IF NOT EXISTS `ordemservicos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `aparelho` varchar(255) DEFAULT NULL,
  `defeito` varchar(255) DEFAULT NULL,
  `servico` varchar(255) DEFAULT NULL,
  `estado` varchar(255) DEFAULT NULL,
  `valor` double DEFAULT NULL,
  `statusId` int(11) NOT NULL DEFAULT '1',
  `autorizado` int(11) NOT NULL DEFAULT '1',
  `idCliente` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `statusId` (`statusId`),
  KEY `autorizado` (`autorizado`),
  KEY `idCliente` (`idCliente`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `statuses`
--

DROP TABLE IF EXISTS `statuses`;
CREATE TABLE IF NOT EXISTS `statuses` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `statuses`
--

INSERT INTO `statuses` (`id`, `nome`, `createdAt`, `updatedAt`) VALUES
(1, 'Não Iniciado', '2023-02-08 06:24:32', '2023-02-08 06:24:32'),
(2, 'Em Execução', '2023-02-08 06:24:32', '2023-02-08 06:24:32'),
(3, 'Finalizado', '2023-02-08 06:24:54', '2023-02-08 06:24:54');

--
-- Constraints for dumped tables
--

--
-- Constraints for table `ordemservicos`
--
ALTER TABLE `ordemservicos`
  ADD CONSTRAINT `ordemservicos_ibfk_1` FOREIGN KEY (`statusId`) REFERENCES `statuses` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `ordemservicos_ibfk_2` FOREIGN KEY (`autorizado`) REFERENCES `autorizacaos` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `ordemservicos_ibfk_3` FOREIGN KEY (`idCliente`) REFERENCES `clientes` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
