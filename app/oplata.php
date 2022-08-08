<?php
require '../vendor/autoload.php';


use YooKassa\Client;

const SUMMA = 490;
const URL = "https://www.checkout.progressmap.ru/";
const SHOPID = 924450;
const API_KEY = "live_qBYd6dXkNf7PfyU9VNaSHv7-VzJzMfmTo8jy2qy7rbE";

mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
// $mysqli = new mysqli("localhost", "u1723962_default", "hE8E3El0EeBwtkl5Fc05", "u1723962_default");
$mysqli = new mysqli("localhost", "agaly", "1122", "map");
$mysqli->query("CREATE TABLE IF NOT EXISTS `orders`(
   `id` int(11) AUTO_INCREMENT PRIMARY KEY , 
   `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
   `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL, 
   `payment_uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL, 
   `status` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
   `sended` boolean  NOT NULL  )
    ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;");
$payment = new Client;
$payment->setAuth(SHOPID, API_KEY);
$idempotenceKey = uniqid();
$response = $payment->createPayment(
   array(
      'amount' => array(
         'value' => SUMMA,
         // 'value' => 1,
         'currency' => 'RUB',
      ),
      'confirmation' => array(
         'type' => 'redirect',
         'return_url' => URL
      ),
      'description' => 'Единоразовый платеж 16 рублей / день'
   ),
   $idempotenceKey
);
$name = $_GET['name'];
$email = $_GET['email'];
$mysqli->query("INSERT INTO `orders`(`id`,`name`,`email`,`payment_uuid`,`status`,`sended`) VALUES (NULL,'$name','$email','$response->id','wait',false)");
$confirmationUrl = $response->getConfirmation()->getConfirmationUrl();
return header('Location:' . $confirmationUrl);
