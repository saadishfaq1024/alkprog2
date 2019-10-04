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

-- Dumping data for table dev2qa.clients: ~6 rows (approximately)
DELETE FROM `clients`;
/*!40000 ALTER TABLE `clients` DISABLE KEYS */;
INSERT INTO `clients` (`id`, `active`, `title`, `client_full_name`, `client_first_name`, `client_last_name`, `client_initials`, `client_type`, `phone`, `street_address`, `email`, `assi_therapist_full_name`, `assi_therapist_first`, `assi_therapist_last`, `facility`, `session_type`, `session_cost`, `session_length`, `bday`, `password`, `confirm_password`, `notes`, `primary_location`, `city`, `state`, `zip`, `contact_title`, `contact_first_name`, `contact_last_name`, `contact_street_address`, `contact_city`, `contact_state`, `contact_zip`, `contact_email`, `contact_phone`, `contact_secondary_phone`, `billing_first_name`, `billing_last_name`, `billing_full_name`, `payment_type`, `card_type`, `card_num`, `card_exp_date`, `cvv`, `billing_street_address`, `name_on_card`, `billing_city`, `billing_state`, `billing_email`, `billing_phone`, `billing_zip`, `contact_title_2`, `contact_first_name_2`, `contact_last_name_2`, `contact_street_address_2`, `contact_city_2`, `contact_state_2`, `contact_zip_2`, `contact_email_2`, `contact_phone_2`, `contact_title_3`, `contact_first_name_3`, `contact_last_name_3`, `contact_street_address_3`, `contact_city_3`, `contact_state_3`, `contact_zip_3`, `contact_email_3`, `contact_phone_3`, `contact1_receive_email`, `contact2_receive_email`, `contact3_receive_email`) VALUES
	(1, 1, 'Mr.', 'Billy Joe', 'Billy', 'Joe', 'BJ', 'Individual', '123-444-5555', '123 Fake Street', 'bjoe@mail.com', 'Harry Potter', 'Harry', 'Potter', NULL, 'Lessons', 20, 30, '7/3/02', 'test', 'test', 'everything is great', NULL, 'Plano', 'TX', '75023', 'Mr.', 'Bob', 'Joe', '123 Fake Street', 'Plano', 'TX', '75023', 'bobjoe@mail.com', '123-222-2222', NULL, 'Bob', 'Joe', 'Bob Joe', 'Card', 'Visa', '11111111111', '10/25', '123', '123 Fake Street', 'Bob Joe', 'Plano', 'TX', 'bjoe@mail.com', '123-222-2222', '75023', 'Mr.', 'Contact', 'Two', 'Avenue 2 street', 'Tyler', 'TX', '11111', 'c2@mail.com', '555-444-3333', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, 1, NULL),
	(2, 1, NULL, 'Sarah Silver', 'Sarah', 'Silver', 'SS', 'Facility', '123-222-3333', '444 Clark Drive', 'ssilver@mail.com', 'Lisa Simpson', 'Lisa', 'Simpson', 'Clark High School', 'Lessons', 1, 2, '6/3/04', '123', '123', 'she is nice', NULL, 'Allen', 'TX', '70986', 'Ms.', 'Sarah', 'Silver', '432 Ink Lane', 'Allen', 'TX', '75643', 'ssilver@mail.com', '555-555-5555', NULL, 'Sarah', 'Silver', 'Sarah Silver', 'Check', NULL, NULL, NULL, NULL, '4444 Street', NULL, 'Allen', 'TX', 'ssilver@mail.com', '111-111-1111', '34342', 'Mrs.', 'Contact', 'Three', 'Avenue 3 Lane', 'Houston', 'TX', '34333', 'c22@mail.com', '444-555-4444', 'Mx.', 'C3', 'PO', '123 Moon Lane', 'Moon', 'TX', '00033', 'c3po@mail.com', '300-222-2222', 1, 0, 1),
	(3, 1, NULL, 'Jaren Jones', 'Jaren', 'Jones', 'JJ', 'Individual', '123-111-2232', '234 Tree Street', 'jjones@mail.com', 'Harry Potter', 'Harry', 'Potter', NULL, 'Therapy', 0, 0, '5/7/05', '124', '124', 'fantastic so far', NULL, 'Dallas', 'TX', '44444', 'Mrs.', 'No', 'Name', '1111 Lane ', 'Dallas', 'TX', '12345', 'nname@mail.com', '777-777-7777', '888-888-8888', 'Every', 'Name', 'Every Name', 'Card', 'Discover', '3333333333', '2/23', '432', '1111 Lane', 'Every E Everyname', 'Dallas', 'TX', 'email@mail.com', '222-222-2222', '22424', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, NULL),
	(4, 1, NULL, 'Ian Stark', 'Ian', 'Stark', 'IS', 'Individual', '122-232-4444', '645 Elm Ave', 'istark@mail.com', 'Jake Jakerson', 'Jake', 'riff', NULL, 'Lessons', 7, 8, '8/2/01', '1244', '1244', 'nothing is going on', NULL, 'Smithtown', 'TX', '44444', 'Mr.', 'Fake', 'Fake', '3214 Elm Court', 'Smithtown', 'TX', '54321', 'ffake@mail.com', '234-334-3444', '121-112-2222', 'Fred', 'Fake', 'Fred Fake', 'Check', NULL, NULL, NULL, NULL, '2343 Ave', NULL, 'Plano', 'TX', 'money@mail.com', '444-444-4444', '12345', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, NULL),
	(5, 1, NULL, 'John Jackson', 'Johnny', 'Jackson', 'JJ', 'Facility', '122-222-1111', '789 Tom Lane', 'jjackson@mail.com', 'Hermione Grainger', 'Hermione', 'Grainger', 'Thomas Elementary', 'Lessons', 1, 11, '9/6/12', '4444', '4444', 'everything is cool', NULL, 'Austin', 'TX', '33322', 'Miss', 'Jill', 'Jackson', '4352 Imagine Lane', 'Austin', 'TX', '33333', 'jjackson@mail.com', '111-111-1111', NULL, 'Jill', 'Jackson', 'Jill Jackson', 'Cash', NULL, NULL, NULL, NULL, '5555 Lane', NULL, 'Austin', 'TX', 'billing@mail.com', '555-555-5544', '54321', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, NULL),
	(70, 1, NULL, 'Joe Jackson', 'Joe', 'Jackson', 'JJ', 'Facility', '122-222-1111', '789 Tom Lane', 'joejack@mail.com', 'Hermione Grainger', 'Hermione', 'Grainger', 'Thomas Elementary', 'Lessons', 1, 11, '10/4/13', '7777', '7777', 'so far so good', NULL, 'Austin', 'TX', '23424', 'Miss', 'Jill', 'Jackson', '4352 Imagine Lane', 'Austin', 'TX', '33333', 'jjackson@mail.com', '111-111-1111', NULL, 'Jill', 'Jackson', 'Jill Jackson', 'Cash', NULL, NULL, NULL, NULL, '5555 Lanr', NULL, 'Austin', 'TX', 'billing@mail.com', '555-555-5544', '54321', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, NULL);
/*!40000 ALTER TABLE `clients` ENABLE KEYS */;

-- Dumping data for table dev2qa.invoices: ~3 rows (approximately)
DELETE FROM `invoices`;
/*!40000 ALTER TABLE `invoices` DISABLE KEYS */;
INSERT INTO `invoices` (`id`, `status`, `inv_date`, `start_date`, `end_date`, `due_date`, `amount`, `payor_full`) VALUES
	(3, NULL, '2019-10-01', '2019-10-01', '2019-10-05', '2019-10-16', NULL, 'Bob Joe'),
	(4, NULL, '2019-10-01', '2019-10-01', '2019-10-02', '2019-10-01', NULL, 'Sarah Silver'),
	(5, NULL, '2019-10-01', '2019-09-01', '2019-09-30', '2019-10-15', NULL, 'Sarah Silver');
/*!40000 ALTER TABLE `invoices` ENABLE KEYS */;

-- Dumping data for table dev2qa.members: ~6 rows (approximately)
DELETE FROM `members`;
/*!40000 ALTER TABLE `members` DISABLE KEYS */;
INSERT INTO `members` (`id`, `active`, `title`, `member_full_name`, `member_first_name`, `member_last_name`, `email`, `phone`, `street_address`, `city`, `zip`, `location`, `bday`, `npi`, `pass`, `notes`, `role`) VALUES
	(1, 1, 'Mr.', 'Harry Potter', 'Harry', 'Potter', 'hpotter@gmail.com', '123-456-1111', '713 Hogwarts Lane', 'London', '77777', 'Diagon Alley', NULL, '731890', 'test123', NULL, 'Administrator'),
	(2, 1, 'Ms.', 'Hermione Grainger', 'Hermione', 'Grainger', 'email@mail.com', '123-333-3333', '123 Fake Street', 'Plano', '75023', 'Wherever', NULL, '2213414', 'pass', NULL, 'Intern'),
	(3, 1, 'Mr.', 'Joe Bob', 'Joe', 'Bob', 'jbob@mail.com', '222-223-3333', '123 Street Lane', 'Frisco', '12345', 'Nowhere', NULL, '2223324', 'ooo', NULL, 'Therapist'),
	(4, 1, 'Miss', 'Jennifer Robinson', 'Jennifer', 'Robinson', 'jrob@mail.com', '122-222-2222', '222 Nowhere', 'Allen', '12333', 'Somewhere', NULL, '123214', 'ooee', NULL, 'Administrator'),
	(5, 1, 'Dr', 'Lisa Simpson', 'Lisa', 'Simpson', 'lsimpson@mail.com', '111-222-2222', '222 Evergreen Terrace', 'Springfield', '22244', 'Everywhere', NULL, '345221', 'simp', NULL, 'Therapist'),
	(38, 1, 'Mr.', 'Jake Jakerson', 'Jake', 'Jakerson', 'jake@mail.com', '233-333-3333', '123 Jake Street', 'Jaketopia', '33333', 'Main Building', NULL, '323232', '$2b$10$BpKBvvhOsAn93bCLODGOV.bmuHtdTmNp3FIQ7CjgNM8iQwxH.8md2', 'Jake has notes', 'Intern');
/*!40000 ALTER TABLE `members` ENABLE KEYS */;

-- Dumping data for table dev2qa.testevent: ~8 rows (approximately)
DELETE FROM `testevent`;
/*!40000 ALTER TABLE `testevent` DISABLE KEYS */;
INSERT INTO `testevent` (`id`, `title`, `bill_type`, `client`, `therapist`, `start`, `end`, `location`, `category`, `repeats`, `repeat_option`, `end_repeat`, `num_occurences`, `end_date_occurrence`, `custom_frequency`, `repeat_num_days`, `mon`, `tues`, `wed`, `thu`, `fri`, `sat`, `sun`, `series_start_id`) VALUES
	(2, 'event2', NULL, 'John Smith', 'Harry Potter', '2019-07-13 12:30:00', '2019-07-13 13:30:00', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
	(516, 'Joe Jackson', '', 'Joe Jackson', '', '2019-09-27 17:42:00', '2019-09-27 18:42:00', '', '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
	(517, 'Sarah Silver', '', 'Sarah Silver', '', '2019-09-28 17:43:00', '2019-09-28 18:43:00', '', '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
	(518, 'Jaren Jones', '', 'Jaren Jones', '', '2019-09-28 17:44:00', '2019-09-28 18:44:00', '', '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
	(556, 'Sarah Silver', 'Non-billable', 'Sarah Silver', 'Joe Bob', '2019-10-04 07:15:34', '2019-10-04 09:15:34', 'uu', 'None', 'true', 'Daily', 'After', '2', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
	(557, 'Sarah Silver', 'Non-billable', 'Sarah Silver', 'Joe Bob', '2019-10-05 07:15:34', '2019-10-05 09:15:34', 'uu', 'None', 'true', 'Daily', 'After', '2', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
	(558, 'Sarah Silver', 'Non-billable', 'Sarah Silver', 'Lisa Simpson', '2019-10-04 07:16:07', '2019-10-04 07:16:07', '44', 'None', 'true', 'Daily', 'After', '2', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
	(559, 'Sarah Silver', 'Non-billable', 'Sarah Silver', 'Lisa Simpson', '2019-10-05 07:16:07', '2019-10-05 07:16:07', '44', 'None', 'true', 'Daily', 'After', '2', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
/*!40000 ALTER TABLE `testevent` ENABLE KEYS */;

-- Dumping data for table dev2qa.transactions: ~3 rows (approximately)
DELETE FROM `transactions`;
/*!40000 ALTER TABLE `transactions` DISABLE KEYS */;
INSERT INTO `transactions` (`id`, `date`, `transType`, `payor`, `amount`, `method`, `description`) VALUES
	(1, NULL, NULL, 'Mary Smith', '40', 'Card', NULL),
	(2, NULL, NULL, 'Jim Adams', '20', 'Check', 'Check #456'),
	(3, '2019-10-01', 'Discount', 'Jack Johnson', '22', 'Card', 'Discount for Jack');
/*!40000 ALTER TABLE `transactions` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
