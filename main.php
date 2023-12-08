<?php
session_start();
include_once("header.php");

//$_SESSION['uid'] = null;
if(!isset($_SESSION['uid'])){
  echo "You must be logged in to view this page!";
}
else{
  ?>
  <!--pre-->
  <center><h2 style="margin:0;padding:0;"><i><?php echo ucfirst($user['username'])."</i> - ".$stats['points']?>&#581;</h2></center><hr>
  <table cellpadding="3" cellspacing="5">
    <!--tr>
      <td>Username:</td>
      <td><i><?php echo $user['username'] ?></td>
    
      <td></td>
      <td></td>
      <td>Points:</td>
      <td><?php  echo $stats['points'] ?></td>
    </tr-->
    <tr>
      <td>Materials:</td>
      <td><?php  echo $stats['materials'] ?></td>
      <td><?php  echo '+'.$stats['mat_production'].'/ut' ?></td>
    </tr>
    <tr>
    <td>Currency:</td>
      <td><?php  echo $stats['currency'] ?></td>
      <td><?php  echo '+'.$stats['income'].'/ut' ?></td>
    </tr>
    <tr>
      <td>Food:</td>
      <td><?php  echo $stats['food'] ?></td>
    <!--/tr>
    <tr-->
      <td><?php  echo '+'.$stats['farming'].'/ut' ?></td>
    </tr>
    <tr>
      <td>Attack:</td>
      <td><?php  echo $stats['attack'] ?></td>
    </tr>
    <tr>
      <td>Defense:</td>
      <td><?php  echo $stats['defense'] ?></td>
    </tr>
    <td></td>
    <td></td>
    <tr>
      <td>Farmers:</td>
      <td>Workers:</td>
      <td>Warriors:</td>
      <td>Defenders:</td>
    </tr>
    <tr style="text-align: center;">
      <td><?php  echo $unit['farmer'] ?></td>
      <td><?php  echo $unit['worker'] ?></td>
      <td><?php  echo $unit['warrior'] ?></td>
      <td><?php  echo $unit['defender'] ?></td>
    </tr>
  </table>
<!--/pre-->
  <?php

}

include("footer.php");
?>