<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  
  <title>~* MMO</title>
  <link href="GameMap.css" rel="stylesheet" type="text/css" />
  <link rel="icon" type="image/x-icon" href="tabIcon.ico">
  <!--script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script-->
</head>
<body>
<?php 
session_start();
//include_once("GameMapHeader.php");

//$_SESSION['uid'] = null;
if(!isset($_SESSION['uid'])){
  echo "You must be logged in to view this page!";
}
else{ 
  ?>
<center>
<div id="game-screen" class="ascii-art"></div>
<div id="TextMessageWindow1" ></div>
<br/>
<button>Place Building</button>
<button>Stop Building</button>
</center>

<script type="text/javascript" src="GameMap.js"></script>
<?php
}
?>

</body>
</html>