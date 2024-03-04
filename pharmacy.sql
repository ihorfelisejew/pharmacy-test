-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1:3306
-- Час створення: Бер 02 2024 р., 17:02
-- Версія сервера: 8.0.30
-- Версія PHP: 8.1.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База даних: `pharmacy`
--

-- --------------------------------------------------------

--
-- Структура таблиці `Clients`
--

CREATE TABLE `Clients` (
  `client_id` int NOT NULL,
  `name` varchar(50) NOT NULL,
  `phone` varchar(25) NOT NULL,
  `email` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Дамп даних таблиці `Clients`
--

INSERT INTO `Clients` (`client_id`, `name`, `phone`, `email`) VALUES
(1, 'Олександр', '+380687458475', 'sansanych555@gmail.com'),
(2, 'Ігор', '+380987895475', 'igoriii888@gmail.com'),
(3, 'Марина', '+380958745896', 'marinam87688@ukr.net'),
(4, 'Тетяна', '+380687874975', 'shevchenko214@gmail.com'),
(5, 'Андрій', '+380687458497', 'andriydrn23@gmail.com'),
(6, 'Наталя', '+380978749654', 'natalyanataliivna@ukr.net'),
(7, 'Юлія', '+380677201630', 'yuliayuriivna@gmail.com'),
(8, 'Сергій', '+380688753164', 'sergiyoleshko@ukr.net'),
(9, 'Ольга', '+380659563204', 'olgashevchuk@gmail.com'),
(10, 'Віталій', '+380688673922', 'vitaliikolomiets@gmail.com');

-- --------------------------------------------------------

--
-- Структура таблиці `Medicine`
--

CREATE TABLE `Medicine` (
  `medicine_id` int NOT NULL,
  `name` varchar(100) NOT NULL,
  `price` double NOT NULL,
  `manufacturer` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Дамп даних таблиці `Medicine`
--

INSERT INTO `Medicine` (`medicine_id`, `name`, `price`, `manufacturer`) VALUES
(1, 'Парацетамол (500мг) 10 таблеток', 31.02, 'Дарниця'),
(2, 'Парацетамол (500мг)', 31.29, 'Лекхім'),
(3, 'Цитрамон (500мг)', 30.3, 'Дарниця'),
(4, 'Ібупрофен (200мг)', 69.4, 'Vitaminy'),
(5, 'Фармадол х50', 110, 'Фармак'),
(6, 'Мукалтин Форте', 115, 'Arterium'),
(7, 'Тос-Май', 183.29, 'Sperco'),
(8, 'Лоратадин', 31.4, 'Дарниця'),
(9, 'Лоратадин', 27.9, 'Arterium'),
(10, 'Діазолін', 25.8, 'Дарниця'),
(11, 'Діазолін', 38.83, 'Фармак'),
(12, 'Лоратадин', 33.98, 'Фармак'),
(13, 'Вітамінний комплекс А+Е', 53, 'Екосвіт Ойл'),
(14, 'Шприци 10мл, 100шт.', 3.15, 'Долфі Україна'),
(15, 'Вата медична', 12.6, 'Білосніжка'),
(16, 'Термометр медичний, безртутний', 118.7, 'Paramed'),
(17, 'Пластир медичний', 48.99, 'Моя аптечка'),
(18, 'Маска для волосся', 107.62, 'Elpha Pharm'),
(19, 'Німесил (2г) 30 пак.', 338.81, 'BerlinChemie AG'),
(20, 'Вікс АнтиГрип', 259.9, 'Vicks');

-- --------------------------------------------------------

--
-- Структура таблиці `MedicineInOrders`
--

CREATE TABLE `MedicineInOrders` (
  `medicine_in_order_id` int NOT NULL,
  `medicine_id` int NOT NULL,
  `count_product` int NOT NULL DEFAULT '1',
  `order_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Дамп даних таблиці `MedicineInOrders`
--

INSERT INTO `MedicineInOrders` (`medicine_in_order_id`, `medicine_id`, `count_product`, `order_id`) VALUES
(1, 1, 1, 1),
(2, 3, 2, 1),
(3, 20, 1, 1),
(4, 2, 3, 2),
(5, 18, 1, 2),
(6, 3, 1, 3),
(7, 5, 4, 4),
(8, 3, 2, 5),
(9, 12, 2, 5),
(10, 16, 1, 5),
(11, 13, 1, 6),
(12, 15, 6, 6),
(13, 4, 1, 7),
(14, 18, 3, 7),
(15, 6, 1, 7),
(16, 14, 1, 7),
(17, 3, 4, 7),
(18, 17, 1, 7),
(19, 17, 1, 8),
(20, 15, 1, 8),
(21, 13, 1, 9),
(22, 6, 2, 11),
(23, 40, 1, 5),
(24, 48, 5, 10),
(25, 32, 6, 11),
(26, 48, 1, 9),
(27, 43, 1, 11),
(28, 13, 2, 9);

-- --------------------------------------------------------

--
-- Структура таблиці `MedicineInPharmacies`
--

CREATE TABLE `MedicineInPharmacies` (
  `medicine_in_pharmacies_id` int NOT NULL,
  `medicine_id` int NOT NULL,
  `pharmacy_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Дамп даних таблиці `MedicineInPharmacies`
--

INSERT INTO `MedicineInPharmacies` (`medicine_in_pharmacies_id`, `medicine_id`, `pharmacy_id`) VALUES
(1, 1, 1),
(2, 2, 1),
(3, 3, 1),
(4, 4, 2),
(5, 5, 6),
(6, 17, 3),
(7, 10, 4),
(8, 6, 2),
(9, 16, 10),
(10, 5, 5),
(11, 1, 3),
(12, 2, 3),
(13, 20, 1),
(14, 19, 1),
(15, 11, 1),
(16, 12, 1),
(17, 13, 3),
(18, 14, 1),
(19, 8, 8),
(20, 17, 10),
(21, 16, 11),
(22, 19, 6),
(23, 5, 2),
(24, 7, 6),
(25, 14, 4),
(26, 4, 6),
(27, 1, 11),
(28, 3, 10),
(29, 1, 9),
(30, 4, 9),
(31, 11, 9),
(32, 12, 9),
(33, 7, 2),
(34, 13, 2),
(35, 14, 9),
(36, 20, 9),
(37, 15, 10),
(38, 19, 10),
(39, 6, 8),
(40, 14, 7),
(41, 18, 1),
(42, 10, 7),
(43, 18, 2),
(44, 18, 3),
(45, 12, 7),
(46, 20, 6),
(47, 7, 5),
(48, 7, 7),
(49, 13, 6),
(50, 13, 9),
(51, 14, 5),
(52, 17, 7);

-- --------------------------------------------------------

--
-- Структура таблиці `Orders`
--

CREATE TABLE `Orders` (
  `order_id` int NOT NULL,
  `date_of_order` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `delivery_address` varchar(150) NOT NULL,
  `client_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Дамп даних таблиці `Orders`
--

INSERT INTO `Orders` (`order_id`, `date_of_order`, `delivery_address`, `client_id`) VALUES
(1, '2023-03-06 12:45:20', 'вул. Шевченка, 10, м. Київ, 01001', 1),
(2, '2023-03-07 18:45:20', 'просп. Гагаріна, 25, м. Харків, 61000', 2),
(3, '2023-03-12 16:20:12', 'вул. Лесі Українки, 5, м. Львів, 79000', 3),
(4, '2023-03-16 12:10:12', 'вул. Петра Шелеста, 12, м. Дніпро, 49000', 4),
(5, '2023-03-17 09:45:12', 'вул. Пушкіна, 22, м. Запоріжжя, 69000', 6),
(6, '2023-06-25 11:25:12', 'вул. Тарасівська, 8, м. Івано-Франківськ, 76000', 7),
(7, '2023-07-18 13:28:30', 'просп. Миру, 17, м. Чернівці, 58000', 8),
(8, '2023-08-25 17:23:32', 'вул. Степана Бандери, 3, м. Тернопіль, 46000', 9),
(9, '2024-02-01 08:29:21', 'вул. Соборна, 14, м. Херсон, 73000', 10),
(10, '2024-02-24 12:49:31', 'вул. Шевченка, 10, м. Київ, 01001', 1),
(11, '2024-02-27 15:21:43', 'просп. Гагаріна, 1, м. Харків, 61000', 5);

-- --------------------------------------------------------

--
-- Структура таблиці `Pharmacies`
--

CREATE TABLE `Pharmacies` (
  `pharmacy_id` int NOT NULL,
  `name` varchar(100) NOT NULL,
  `address` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Дамп даних таблиці `Pharmacies`
--

INSERT INTO `Pharmacies` (`pharmacy_id`, `name`, `address`) VALUES
(1, 'Здорова родина', ' вул. Гетьмана Івана Мазепи, 12/1, м. Коломия'),
(2, 'Подорожник', ' вул. Гетьмана Івана Мазепи, 12/1, м. Київ'),
(3, 'Доброго дня', 'провулок Політехнічний, 1/37, м. Київ'),
(4, 'Бажаємо здоров\'я', 'вул. Васильківська, 6, прим.1, м. Київ'),
(5, 'Інтелекс', ' вул. Джохара Дудаєва, 2, м. Київ'),
(6, 'DS', 'Соборна площа, 1/1, м. Львів'),
(7, 'Сімейна аптекс', 'вул. Незалежності, 49/1, м. Івано-Франківськ'),
(8, 'Бам', 'вул. Галицька, 80б, м. Івано-Франківськ'),
(9, 'Здорова родина', 'вул. Степана Бандери, 14, м. Івано-Франківськ'),
(10, 'Синиця', 'вул. Кам\'янецька, 38, м. Хмельницький'),
(11, 'Сідус', 'вул. Проспект Миру, 69, м. Хмельницький');

--
-- Індекси збережених таблиць
--

--
-- Індекси таблиці `Clients`
--
ALTER TABLE `Clients`
  ADD PRIMARY KEY (`client_id`);

--
-- Індекси таблиці `Medicine`
--
ALTER TABLE `Medicine`
  ADD PRIMARY KEY (`medicine_id`);

--
-- Індекси таблиці `MedicineInOrders`
--
ALTER TABLE `MedicineInOrders`
  ADD PRIMARY KEY (`medicine_in_order_id`),
  ADD KEY `medicine_id` (`medicine_id`),
  ADD KEY `order_id` (`order_id`);

--
-- Індекси таблиці `MedicineInPharmacies`
--
ALTER TABLE `MedicineInPharmacies`
  ADD PRIMARY KEY (`medicine_in_pharmacies_id`),
  ADD KEY `medicine_id` (`medicine_id`),
  ADD KEY `pharmacy_id` (`pharmacy_id`);

--
-- Індекси таблиці `Orders`
--
ALTER TABLE `Orders`
  ADD PRIMARY KEY (`order_id`),
  ADD KEY `client_id` (`client_id`);

--
-- Індекси таблиці `Pharmacies`
--
ALTER TABLE `Pharmacies`
  ADD PRIMARY KEY (`pharmacy_id`);

--
-- AUTO_INCREMENT для збережених таблиць
--

--
-- AUTO_INCREMENT для таблиці `Clients`
--
ALTER TABLE `Clients`
  MODIFY `client_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT для таблиці `Medicine`
--
ALTER TABLE `Medicine`
  MODIFY `medicine_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT для таблиці `MedicineInOrders`
--
ALTER TABLE `MedicineInOrders`
  MODIFY `medicine_in_order_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT для таблиці `MedicineInPharmacies`
--
ALTER TABLE `MedicineInPharmacies`
  MODIFY `medicine_in_pharmacies_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=53;

--
-- AUTO_INCREMENT для таблиці `Orders`
--
ALTER TABLE `Orders`
  MODIFY `order_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT для таблиці `Pharmacies`
--
ALTER TABLE `Pharmacies`
  MODIFY `pharmacy_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- Обмеження зовнішнього ключа збережених таблиць
--

--
-- Обмеження зовнішнього ключа таблиці `MedicineInOrders`
--
ALTER TABLE `MedicineInOrders`
  ADD CONSTRAINT `medicineinorders_ibfk_1` FOREIGN KEY (`medicine_id`) REFERENCES `MedicineInPharmacies` (`medicine_in_pharmacies_id`) ON DELETE CASCADE ON UPDATE RESTRICT,
  ADD CONSTRAINT `medicineinorders_ibfk_2` FOREIGN KEY (`order_id`) REFERENCES `Orders` (`order_id`) ON DELETE CASCADE ON UPDATE RESTRICT;

--
-- Обмеження зовнішнього ключа таблиці `MedicineInPharmacies`
--
ALTER TABLE `MedicineInPharmacies`
  ADD CONSTRAINT `medicineinpharmacies_ibfk_1` FOREIGN KEY (`medicine_id`) REFERENCES `Medicine` (`medicine_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `medicineinpharmacies_ibfk_2` FOREIGN KEY (`pharmacy_id`) REFERENCES `Pharmacies` (`pharmacy_id`) ON DELETE CASCADE ON UPDATE RESTRICT;

--
-- Обмеження зовнішнього ключа таблиці `Orders`
--
ALTER TABLE `Orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`client_id`) REFERENCES `Clients` (`client_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
