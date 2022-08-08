<?php

ini_set('log_errors', 'On');
ini_set('error_log', 'php_errors.log');
ini_set('max_execution_time', '900');
require '../vendor/autoload.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

$subject = 'Вы успешно оплатили';
$file = 'https://www.checkout.progressmap.ru/ProgressMap.pdf';
mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
// $mysqli = new mysqli("localhost", "u1723962_default", "hE8E3El0EeBwtkl5Fc05", "u1723962_default");
$mysqli = new mysqli("localhost", "agaly", "1122", "map");

$allOrders = $mysqli->query("SELECT * FROM  `orders` WHERE `status`='success' AND `sended`=false");
$orders = [];
if ($allOrders->num_rows > 0) {
   while ($row = $allOrders->fetch_assoc()) {
      array_push($orders, $row);
   }
}
$mail = new PHPMailer(true);
$mail->SMTPDebug = 3;
$mail->isSMTP();
$mail->Host = "checkout.progressmap.ru";
$mail->SMTPAuth = true;
$mail->Username = "admin@checkout.progressmap.ru";
$mail->Password = "12345678";
$mail->SMTPSecure = "ssl";
$mail->Port = 465;
$mail->From = "admin@checkout.progressmap.ru";
$mail->FromName = "";
$mail->isHTML(true);
$mail->Subject = $subject;
$mail->Body = "<a href='$file'>Нажмите суда для скачивание</a>";
$mail->CharSet = PHPMailer::CHARSET_UTF8;
try {
   foreach ($orders as $order) {
      $mail->addAddress($order['email']);
      $result = $mail->send();
      $id = $order['id'];
      $mysqli->query("UPDATE `orders` set `sended`=true WHERE `id` = '$id'");
   }
} catch (Exception $e) {
   echo $e->getMessage();
}
