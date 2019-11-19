<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Accept');
// Файлы phpmailer
require 'phpmailer/PHPMailer.php';
require 'phpmailer/SMTP.php';
require 'phpmailer/Exception.php';
// Переменные, которые отправляет пользователь
$name = $_POST['name'];
$email = $_POST['email'];
$phone = $_POST['phone'];
$city = $_POST['city'];
$discuss = $_POST['discuss'];

$mail = new PHPMailer\PHPMailer\PHPMailer();

try {
    $msg = "ok";
    $mail->isSMTP();   
    $mail->CharSet = "UTF-8";                                          
    $mail->SMTPAuth   = true;
    // Настройки вашей почты
    $mail->Host       = 'smtp.gmail.com'; // SMTP сервера GMAIL
    $mail->Username   = 'sapfir.offers@gmail.com'; // Логин на почте
    $mail->Password   = '19sapfir19'; // Пароль на почте
    $mail->SMTPSecure = 'ssl';
    $mail->Port       = 465;
    $mail->setFrom('sapfir.offers@gmail.com', 'Инна Здерчук'); // Адрес самой почты и имя отправителя
    // Получатель письма
    //cvltof666@gmail.com
    $mail->addAddress('sapfir.offers@gmail.com');  
    $mail->addAddress('cvltof666@gmail.com'); // Ещё один, если нужен
    // Прикрипление файлов к письму
    if (!empty($_FILES['myfile']['name'][0])) {
        for ($ct = 0; $ct < count($_FILES['myfile']['tmp_name']); $ct++) {
            $uploadfile = tempnam(sys_get_temp_dir(), sha1($_FILES['myfile']['name'][$ct]));
            $filename = $_FILES['myfile']['name'][$ct];
            if (move_uploaded_file($_FILES['myfile']['tmp_name'][$ct], $uploadfile)) {
                $mail->addAttachment($uploadfile, $filename);
            } else {
                $msg .= 'Неудалось прикрепить файл ' . $uploadfile;
            }
        }   
    }
        // -----------------------
        // Само письмо
        // -----------------------
    $mail->isHTML(true);
    
    $mail->Subject = 'Заголовок письма';
    $mail->Body    = "<b>Имя:</b> $name <br>
    <b>Почта:</b> $email<br><br>
    <b>Телефон:</b> $phone<br>
    <b>Город:</b> $city<br>
    <b>Что хотели бы обсудить?:</b> $discuss<br>";

// Проверяем отравленность сообщения
    if ($mail->send()) {
        echo "$msg";
    } else {
        echo "Сообщение не было отправлено. Неверно указаны настройки вашей почты";
    }
} catch (Exception $e) {
    echo "Сообщение не было отправлено. Причина ошибки: {$mail->ErrorInfo}";
}