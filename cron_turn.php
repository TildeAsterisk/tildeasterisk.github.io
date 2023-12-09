<?php
include("functions.php");
include("connection.php");

//Runs every 30 mins
$get_users=mysqli_query($mysql,"SELECT * FROM `stats`") or die(mysqli_error($mysql));
while($user = mysqli_fetch_assoc($get_users)){
  $update = mysqli_query($mysql,"UPDATE `stats` SET 
  `currency`=`currency`+'".$user['income']."',
  `food`=`food`+'".$user['farming']."'") or die(mysqli_error($mysql));
  //`turns`=`turns`+'5' WHERE `id`='".$user['id']."'"

}

include("cron_rankings.php");
include("cron_logs.php");

?>