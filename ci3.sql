-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jul 25, 2024 at 02:00 PM
-- Server version: 8.0.30
-- PHP Version: 7.4.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ci3`
--

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int NOT NULL,
  `title` varchar(255) NOT NULL,
  `extra_info_title` varchar(255) DEFAULT NULL,
  `extra_info_description` varchar(256) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `meta_title` varchar(255) DEFAULT NULL,
  `meta_keywords` text,
  `meta_description` text,
  `seo_url` varchar(255) DEFAULT NULL,
  `description` text,
  `video_embed_code` text,
  `product_code` varchar(100) NOT NULL,
  `quantity` int NOT NULL,
  `quantity_type` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT 'Adet',
  `cart_discount` int NOT NULL DEFAULT '0',
  `tax_rate` int NOT NULL DEFAULT '18',
  `sale_price_usd` decimal(10,2) DEFAULT NULL,
  `sale_price_try` decimal(10,2) NOT NULL,
  `sale_price_eur` decimal(10,2) DEFAULT NULL,
  `second_sale_price` decimal(10,2) NOT NULL,
  `deduct_from_stock` tinyint(1) NOT NULL,
  `status` enum('active','inactive') NOT NULL,
  `show_features` tinyint(1) NOT NULL,
  `product_validity_periods` date NOT NULL,
  `sort_order` int NOT NULL,
  `show_on_homepage` int DEFAULT '0',
  `is_new` tinyint(1) NOT NULL,
  `installment` tinyint(1) NOT NULL,
  `guarantee_period` varchar(20) NOT NULL,
  `main_image` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `title`, `extra_info_title`, `extra_info_description`, `meta_title`, `meta_keywords`, `meta_description`, `seo_url`, `description`, `video_embed_code`, `product_code`, `quantity`, `quantity_type`, `cart_discount`, `tax_rate`, `sale_price_usd`, `sale_price_try`, `sale_price_eur`, `second_sale_price`, `deduct_from_stock`, `status`, `show_features`, `product_validity_periods`, `sort_order`, `show_on_homepage`, `is_new`, `installment`, `guarantee_period`, `main_image`) VALUES
(1, 'Deneme', 'Deneme', 'Deneme', 'Deneme', 'Deneme', 'Deneme', 'eymen.loc', '<h1>Deneme Metini</h1><ol><li>Deneme 1</li><li>deneme 2</li></ol>', '<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/lgT1AidzRWM?si=ki95dPaTkP2psNFi\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen></iframe>', 'e5e2972f-5b10-4a24-9c01-35b524b60c73', 7, 'kilogram', 10, 9, '12.00', '16.00', '17.00', '10.00', 0, 'active', 0, '2024-12-27', 1, 0, 0, 0, '12 ay', '/uploads/products/me.jpeg'),

-- --------------------------------------------------------

--
-- Table structure for table `product_discounts`
--

CREATE TABLE `product_discounts` (
  `id` int NOT NULL,
  `product_id` int NOT NULL,
  `customer_group` varchar(255) DEFAULT NULL,
  `priority` int DEFAULT NULL,
  `discount_price_usd` decimal(10,2) DEFAULT NULL,
  `discount_type_usd` varchar(10) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `discount_price_try` decimal(10,2) DEFAULT NULL,
  `discount_price_eur` decimal(10,2) DEFAULT NULL,
  `discount_type_eur` varchar(100) DEFAULT NULL,
  `discount_type_try` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `product_discounts`
--

INSERT INTO `product_discounts` (`id`, `product_id`, `customer_group`, `priority`, `discount_price_usd`, `discount_type_usd`, `discount_price_try`, `discount_price_eur`, `discount_type_eur`, `discount_type_try`, `start_date`, `end_date`) VALUES
(1, 1, 'Musteri', 1, '12.30', 'Oran', '0.00', '3.90', 'Fiyat', 'Fiyat', '0000-00-00', '2024-07-26'),


-- --------------------------------------------------------

--
-- Table structure for table `product_images`
--

CREATE TABLE `product_images` (
  `id` int NOT NULL,
  `product_id` int NOT NULL,
  `image_url` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `product_discounts`
--
ALTER TABLE `product_discounts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `product_images`
--
ALTER TABLE `product_images`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_id` (`product_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `product_discounts`
--
ALTER TABLE `product_discounts`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `product_images`
--
ALTER TABLE `product_images`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `product_discounts`
--
ALTER TABLE `product_discounts`
  ADD CONSTRAINT `product_discounts_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`);

--
-- Constraints for table `product_images`
--
ALTER TABLE `product_images`
  ADD CONSTRAINT `product_images_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
