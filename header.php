<?php
include_once("functions.php");
//connect();
include_once("connection.php");

//$GLOBALS['mysql'] = connect();
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>TildeAsterisk.com</title>
  <link href="style.css" rel="stylesheet" type="text/css" />
  <link rel="icon" type="image/x-icon" href="tabIcon.ico">
</head>
<body>

  <div id="header">~* Strat Sim</div>
    <div id="container">
      <div id="navigation"><div id="nav_div">
        <?php 
        if(isset($_SESSION['uid'])){
          include("safe.php");
          //echo "Logged in.";
          //echo $stats['points'];
        ?>
          &raquo; <a href="main.php">Your Stats</a><br />
          &raquo; <a href="shop.php">Shop</a><br />
          <!--&raquo; <a href="inventory.php">Inventory</a><br /-->
          &raquo; <a href="units.php">Your Units</a><br />
          &raquo; <a href="rankings.php">Battle Players</a><br />
          &raquo; <a href="logout.php">Log-Out</a>
        <?php
        }
        else{
          ?>
          <form action="login.php" method="post">
          Username:<input type="text" name="username"/><br />
          Password:<input type="password" name="password"/><br />
          <input type="submit" name="login" value="Log-in"/>
          </form>
          <?php
        }
      ?>
      </div></div>
      <div id="content"><div id="con_div">