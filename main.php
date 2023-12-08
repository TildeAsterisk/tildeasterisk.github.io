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
  <center><h2 style="margin:0;padding:0;">Your Stats</h2></center>
  <table cellpadding="3" cellspacing="5">
    <tr>
      <td>Username:</td>
      <td><i><?php  echo $user['username'] ?></td>
    </tr>
    <tr>
      <td>Points:</td>
      <td><?php  echo $stats['points'] ?></td>
    <!--/tr>
    <tr-->
      <td>Income:</td>
      <td><?php  echo '+'.$stats['income'].'/ut' ?></td>
    </tr>
    <tr>
      <td>Food:</td>
      <td><?php  echo $stats['food'] ?></td>
    <!--/tr>
    <tr-->
      <td>Farming:</td>
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
      <td><?php  echo $unit['farmer'] ?></td>
    </tr>
    <tr>
      <td>Workers:</td>
      <td><?php  echo $unit['worker'] ?></td>
    </tr>
    <tr>
      <td>Warriors:</td>
      <td><?php  echo $unit['warrior'] ?></td>
    </tr>
    <tr>
      <td>Defenders:</td>
      <td><?php  echo $unit['defender'] ?></td>
    </tr>
  </table>
<!--/pre-->
  <?php

}

include("footer.php");
?>