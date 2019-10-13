-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               8.0.17 - MySQL Community Server - GPL
-- Server OS:                    Win64
-- HeidiSQL Version:             10.2.0.5599
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

-- Dumping data for table dev2qa.testevent: ~4 rows (approximately)
DELETE FROM `testevent`;
/*!40000 ALTER TABLE `testevent` DISABLE KEYS */;
INSERT INTO `testevent` (`id`, `title`, `bill_type`, `client`, `therapist`, `start`, `end`, `location`, `category`, `repeats`, `repeat_option`, `end_repeat`, `num_occurences`, `end_date_occurrence`, `custom_frequency`, `repeat_num_days`, `sun`, `mon`, `tues`, `wed`, `thu`, `fri`, `sat`, `series_start_id`) VALUES
	(634, 'Billy Joe', 'Billable', 'Billy Joe', 'Joe Bob', '2019-10-12 22:37:56', '2019-10-12 22:37:56', '', 'None', 1, 'Custom', 'After', '2', '2019-10-12', 'Specific Days', '', 1, 1, 0, 0, 0, 0, 0, '634'),
	(635, 'Billy Joe', 'Billable', 'Billy Joe', 'Joe Bob', '2019-10-13 22:37:56', '2019-10-13 22:37:56', '', 'None', 1, 'Custom', 'After', '2', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '634'),
	(652, 'Jaren Jones', '', 'Jaren Jones', '', '2019-10-12 23:28:31', '2019-10-12 23:28:31', '', '', 1, 'Weekly', 'After', '3', '2019-10-12', '', '', 0, 0, 0, 0, 0, 0, 0, '652'),
	(654, 'Jaren Jones', '', 'Jaren Jones', '', '2019-10-26 23:28:31', '2019-10-26 23:28:31', '', '', 1, 'Weekly', 'After', '3', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '652'),
	(655, 'Sarah Silver', '', 'Sarah Silver', 'Lisa Simpson', '2019-10-12 23:29:04', '2019-10-12 23:29:04', '', '', 1, 'Weekly', 'On Date', '', '2019-10-30', '', '', 0, 0, 0, 0, 0, 0, 0, '655'),
	(656, 'Sarah Silver', '', 'Sarah Silver', 'Lisa Simpson', '2019-10-19 23:29:04', '2019-10-19 23:29:04', '', '', 1, 'Weekly', 'On Date', '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '655'),
	(657, 'Sarah Silver', '', 'Sarah Silver', 'Lisa Simpson', '2019-10-26 23:29:04', '2019-10-26 23:29:04', '', '', 1, 'Weekly', 'On Date', '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '655');
/*!40000 ALTER TABLE `testevent` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
