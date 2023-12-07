<?php
session_start();
include_once("header.php");

$_SESSION['uid'] = null;
if(!isset($_SESSION['uid'])){
  echo "You must be logged in to view this page!";
}
else{
  echo "Looks like you're logged in.";
}

include("footer.php");
?>