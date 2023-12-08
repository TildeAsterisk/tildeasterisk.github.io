<?php
/*function connect() {
    $mysql = mysqli_connect("localhost", "root", "Cxbolloz99", "gamedb");
    //$mysql = mysqli_connect("localhost", "root", "Cxbolloz99", "gamedb");
    if ($mysql->connect_errno) {
        die("Failed to connect to MySQL: " . $mysql->connect_error);
    }
    mysqli_select_db($mysql,"gamedb");
}
*/

function protect ($mysqlc,$string){
    return mysqli_real_escape_string($mysqlc,strip_tags(addslashes($string)));
}

function output ($string){
    echo "<div id='output'>" . $string . "</div>";
}

?>