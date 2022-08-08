<?php


require '../vendor/autoload.php';


use YooKassa\Client;

const SUMMA = 490;
const URL = "https://www.checkout.progressmap.ru/";
const SHOPID = 924450;
const API_KEY = "live_qBYd6dXkNf7PfyU9VNaSHv7-VzJzMfmTo8jy2qy7rbE";

mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
$mysqli = new mysqli("localhost", "u1723962_default", "hE8E3El0EeBwtkl5Fc05", "u1723962_default");

$payment = new Client;
$payment->setAuth(SHOPID, API_KEY);
$idempotenceKey = uniqid();
$response = $payment->createPayment(
   array(
      'amount' => array(
         'value' => SUMMA,
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
$mysqli->query("INSERT INTO `orders`(`id`, `payment_uuid`,`status`) VALUES (NULL,'$response->id','wait')");
$confirmationUrl = $response->getConfirmation()->getConfirmationUrl();
return header('Location:' . $confirmationUrl);
