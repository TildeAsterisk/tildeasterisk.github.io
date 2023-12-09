<?php 
$mysql = mysqli_connect("localhost", "root", "Cxbolloz99", "gamedb");
if ($mysql->connect_errno) {
    die("Failed to connect to MySQL: " . $mysql->connect_error);
}
mysqli_select_db($mysql,"gamedb");
?>