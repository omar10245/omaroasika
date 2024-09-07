<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "myy_database";

// إنشاء اتصال
$conn = new mysqli($servername, $username, $password, $dbname);

// التحقق من الاتصال
if ($conn->connect_error) {
    die(json_encode(['error' => 'فشل الاتصال: ' . $conn->connect_error]));
}

// استرجاع البيانات من الجدول
$sql = "SELECT * FROM userr_tracking";
$result = $conn->query($sql);

$users = array();
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $users[] = $row;
    }
}

$conn->close();

// إرسال البيانات بصيغة JSON
header('Content-Type: application/json');
echo json_encode($users);
?>