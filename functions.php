<?php
function protect ($mysqlc,$string){
    return mysqli_real_escape_string($mysqlc,strip_tags(addslashes($string)));
}

function output ($string){
    echo "<div id='output'>" . $string . "</div>";
}

?>