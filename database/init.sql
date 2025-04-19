-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: db
-- Generation Time: אפריל 12, 2025 בזמן 02:11 PM
-- גרסת שרת: 9.2.0
-- PHP Version: 8.2.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `vacations`
--
CREATE DATABASE IF NOT EXISTS `vacations` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `vacations`;

-- --------------------------------------------------------

--
-- מבנה טבלה עבור טבלה `follows`
--

CREATE TABLE `follows` (
  `vacation_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `user_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- הוצאת מידע עבור טבלה `follows`
--

INSERT INTO `follows` (`vacation_id`, `user_id`, `created_at`, `updated_at`) VALUES
('3f1af0ce-75df-4387-a714-7a3d9233af53', '7fcdea02-8292-4a93-a0c5-813c28cff784', '2025-03-20 15:25:48', '2025-03-20 15:25:48'),
('82ba9d7d-a202-467e-89fa-f0a11d6bb2c7', '7fcdea02-8292-4a93-a0c5-813c28cff784', '2025-03-23 18:33:52', '2025-03-23 18:33:52');

-- --------------------------------------------------------

--
-- מבנה טבלה עבור טבלה `users`
--

CREATE TABLE `users` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `first_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'regularUser',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- הוצאת מידע עבור טבלה `users`
--

INSERT INTO `users` (`id`, `first_name`, `last_name`, `email`, `password`, `role`, `created_at`, `updated_at`) VALUES
('0a86a46c-5028-4049-84cc-fa9927210fb9', 'yuval', 'rayer', 'yuval@rayer.co.il', '54f8a40ba57f473a6ec91f3fcd1752b0d9b07e15fc405e0a4822c6aac25242e4', 'admin', '2025-03-17 11:10:13', '2025-03-17 11:10:13'),
('7fcdea02-8292-4a93-a0c5-813c28cff784', 'jorje', 'babbon', 'jorje@babbon.co.il', '29d91d56fab96bc5558eea9842d880482c02fa4d1f6abe33b98007aae38cb8e4', 'regularUser', '2025-03-13 20:24:48', '2025-03-13 20:24:48');

-- --------------------------------------------------------

--
-- מבנה טבלה עבור טבלה `vacations`
--

CREATE TABLE `vacations` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `destination` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `start_date` date NOT NULL,
  `finish_date` date NOT NULL,
  `price` decimal(10,0) NOT NULL,
  `file_u_r_l` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- הוצאת מידע עבור טבלה `vacations`
--

INSERT INTO `vacations` (`id`, `destination`, `description`, `start_date`, `finish_date`, `price`, `file_u_r_l`, `created_at`, `updated_at`) VALUES
('2368e9a6-9e29-454f-aaf6-ec5209d565ef', 'London', 'In the British island, a remarkable place to visit', '2025-04-01', '2025-04-03', 3242, 'il.co.johnbryce.yuvalrayer/london.jpg', '2025-03-29 12:50:40', '2025-03-29 12:50:40'),
('3f1af0ce-75df-4387-a714-7a3d9233af53', 'Polin', 'a beautiful place. full of Pollens', '2025-03-12', '2025-03-13', 2499, 'il.co.johnbryce.yuvalrayer/polland.jpg', '2025-03-11 17:57:34', '2025-03-24 10:38:43'),
('4786d808-08ad-489b-881f-479e15afd767', 'Tripoly', 'somewhere in the world.', '2025-03-24', '2025-03-28', 500, 'il.co.johnbryce.yuvalrayer/tripoli.jpg', '2025-03-22 13:24:21', '2025-03-29 10:47:35'),
('47bb2a49-27d3-417a-b5ad-803c32b1f98e', 'China', 'Come and enjoy the Great Wall of China!', '2025-04-05', '2025-04-24', 5780, 'il.co.johnbryce.yuvalrayer/china.jpg', '2025-03-29 12:21:53', '2025-03-29 12:21:53'),
('555e4a96-2a18-47f1-b45a-790cdbf2c877', 'Napal', 'a very populated country, snowy with tall mountains', '2025-04-01', '2025-04-04', 3244, 'il.co.johnbryce.yuvalrayer/napal.jpg', '2025-03-29 12:58:25', '2025-03-29 12:58:25'),
('64745caf-453e-4f4c-9e1b-b9f840ec1800', 'Israel', 'Most amazing place in the world!\r\nEnjoy places, such as Petah Tikwa senteral bus station, and more!', '2025-03-30', '2025-04-02', 9999, 'il.co.johnbryce.yuvalrayer/israel.jpg', '2025-03-29 11:59:48', '2025-03-29 11:59:48'),
('689735b4-b783-4544-97c3-5b4145af751b', 'Argentina', 'See Messi`s place of birth, eat some local food.\r\nA hot, lovely country with warm people.', '2025-04-05', '2025-05-02', 5745, 'il.co.johnbryce.yuvalrayer/argentina.jpg', '2025-03-29 12:54:46', '2025-03-29 12:55:23'),
('82ba9d7d-a202-467e-89fa-f0a11d6bb2c7', 'India', 'India is a nice place to visit. update', '2025-03-23', '2025-03-27', 1200, 'il.co.johnbryce.yuvalrayer/india.jpg', '2025-03-21 23:41:03', '2025-03-29 10:50:13'),
('9060ced8-fe63-11ef-be9c-0242ac110002', 'Japan', 'An exciting trip to Japan, exploring modern culture and traditional temples.', '2025-07-15', '2025-07-22', 1800, 'il.co.johnbryce.yuvalrayer/japan.jpg', '2025-03-11 10:27:52', '2025-03-11 10:27:52'),
('ab3c0335-fe63-11ef-be9c-0242ac110002', 'New York', 'A week in New York City, enjoying Broadway shows and Central Park.', '2025-08-01', '2025-08-07', 2000, 'il.co.johnbryce.yuvalrayer/new_york.jpg', '2025-03-11 10:28:26', '2025-03-25 12:02:20'),
('c00898a9-fe63-11ef-be9c-0242ac110002', 'Rome', 'A cultural trip to Rome, visiting ancient ruins and enjoying Italian cuisine.', '2025-09-10', '2025-09-17', 1200, 'il.co.johnbryce.yuvalrayer/rome.jpg', '2025-03-11 10:29:11', '2025-03-11 10:29:11'),
('e8297216-5136-4f5c-9fd6-1a7da98fafc6', 'Jordan', 'Beautiful country, with Petra site', '2025-03-30', '2025-04-02', 50, 'il.co.johnbryce.yuvalrayer/jordan.jpg', '2025-03-29 12:18:56', '2025-03-29 12:18:56');

--
-- Indexes for dumped tables
--

--
-- אינדקסים לטבלה `follows`
--
ALTER TABLE `follows`
  ADD PRIMARY KEY (`vacation_id`,`user_id`),
  ADD UNIQUE KEY `follows_vacationId_userId_unique` (`vacation_id`,`user_id`),
  ADD KEY `user_id` (`user_id`);

--
-- אינדקסים לטבלה `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- אינדקסים לטבלה `vacations`
--
ALTER TABLE `vacations`
  ADD PRIMARY KEY (`id`);

--
-- הגבלות לטבלאות שהוצאו
--

--
-- הגבלות לטבלה `follows`
--
ALTER TABLE `follows`
  ADD CONSTRAINT `follows_ibfk_1` FOREIGN KEY (`vacation_id`) REFERENCES `vacations` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `follows_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
