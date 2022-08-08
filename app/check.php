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
$allOrders = $mysqli->query("SELECT * FROM  `orders` WHERE `status`='wait'");
$orders = [];
if ($allOrders->num_rows > 0) {
   while ($row = $allOrders->fetch_assoc()) {
      array_push($orders, $row);
   }
}
// var_dump($orders);
foreach ($orders as $order) {
   $getPayment = $payment->getPaymentInfo($order['payment_uuid']);
   if ($getPayment->status == 'waiting_for_capture') {
      $idempotenceKey = uniqid();
      $response = $payment->capturePayment(
         array(
            'amount' => array(
               'value' => SUMMA,
               'currency' => 'RUB',
            ),
         ),
         $order['payment_uuid'],
         $idempotenceKey
      );
      if ($response->status == 'succeeded') {
         $id = $order['id'];
         $mysqli->query("UPDATE `orders` set `status`='success' WHERE `id` = '$id'");
      }
   }
}

header('Location:/');
