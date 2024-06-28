-- phpMyAdmin SQL Dump
-- version 5.1.1deb5ubuntu1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jun 28, 2024 at 03:28 PM
-- Server version: 8.0.37-0ubuntu0.22.04.3
-- PHP Version: 8.1.2-1ubuntu2.18

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `registro_personal_medico`
--

-- --------------------------------------------------------

--
-- Table structure for table `personal_medico`
--

CREATE TABLE `personal_medico` (
  `id` int NOT NULL,
  `nombre` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `apellido` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `cargo` varchar(50) COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `personal_medico`
--

INSERT INTO `personal_medico` (`id`, `nombre`, `apellido`, `cargo`) VALUES
(1, 'Coeli', 'Corzo', 'Nutricionista'),
(2, 'Sharet', 'Vargas', 'Fisioterapeuta'),
(3, 'Jimmy', 'Tejedor', 'Farmacéutico'),
(4, 'Johan', 'Rodriguez', 'Paramédico'),
(6, 'Miguel', 'Salomon', 'Médico General'),
(7, 'Gustavo', 'Gómez', 'Psicólogo');

-- --------------------------------------------------------

--
-- Table structure for table `registro_ingresos_salidas`
--

CREATE TABLE `registro_ingresos_salidas` (
  `id` int NOT NULL,
  `id_empleado` int NOT NULL,
  `fecha_hora_ingreso` datetime NOT NULL,
  `fecha_hora_salida` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `registro_ingresos_salidas`
--

INSERT INTO `registro_ingresos_salidas` (`id`, `id_empleado`, `fecha_hora_ingreso`, `fecha_hora_salida`) VALUES
(1, 1, '2024-06-28 08:00:00', '2024-06-28 17:00:00'),
(2, 3, '2024-06-13 09:00:00', '2024-06-28 20:00:00'),
(3, 2, '2024-07-01 07:00:00', '2024-06-28 18:00:00'),
(4, 4, '2024-07-01 08:00:00', '2024-06-28 19:00:00'),
(5, 1, '2024-07-02 08:00:00', '2024-06-28 22:00:00'),
(8, 1, '2024-06-28 18:44:00', '2024-06-28 01:44:00'),
(9, 4, '2024-06-28 07:49:00', '2024-06-28 01:53:00'),
(15, 7, '2024-06-28 14:30:00', '2024-06-28 23:30:00');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `personal_medico`
--
ALTER TABLE `personal_medico`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `registro_ingresos_salidas`
--
ALTER TABLE `registro_ingresos_salidas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_empleado` (`id_empleado`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `personal_medico`
--
ALTER TABLE `personal_medico`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `registro_ingresos_salidas`
--
ALTER TABLE `registro_ingresos_salidas`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `registro_ingresos_salidas`
--
ALTER TABLE `registro_ingresos_salidas`
  ADD CONSTRAINT `registro_ingresos_salidas_ibfk_1` FOREIGN KEY (`id_empleado`) REFERENCES `personal_medico` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
