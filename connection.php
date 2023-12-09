<?php 
$mysql = mysqli_connect("localhost", "id21643467_tildeasterisk", "Dbbolloz99!", "id21643467_gamedb");
if ($mysql->connect_errno) {
    die("Failed to connect to MySQL: " . $mysql->connect_error);
}
mysqli_select_db($mysql,"id21643467_gamedb");
?>