<?php
function protect ($mysqlc,$string){
    return mysqli_real_escape_string($mysqlc,strip_tags(addslashes($string)));
}

function output ($string){
    echo "<div id='output'>" . $string . "</div>";
}

$food_symbol="&#9753;";
$materials_symbol="&#8862;";
$currency_symbol="&#164;";
$attack_symbol="&#128481;";
$defense_symbol="<b>&#128737;</b>";

?>