<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <!-- link href="style.css" rel="stylesheet" type="text/css" /-->
</head>

<body>
    <div id="header"></div>
    <div id="container">
        <div id="navigation"></div>
        <div id="content"></div>
    </div>
    <div id="footer"></div>



    <?php
        //phpinfo();

        $mysqli = new mysqli("localhost", "root", "Cxbolloz99", "gamedb");
        if ($mysqli->connect_errno) {
            die("Failed to connect to MySQL: " . $mysqli->connect_error);
        }
        mysqli_select_db($mysqli,"gamedb");
        ////CREATE NEW USER ~Inserts a new user into the db
        //mysqli_query($mysqli ,"INSERT INTO `game` (`username`,`email`) VALUES ('Zionidas','123')") or die(mysqli_error($connection));
        
        $sql = mysqli_query($mysqli ,"SELECT * FROM `user` WHERE `username`='Zionidas'") or die(mysqli_error($connection)) or die(mysqli_error($connection));
        $user = mysqli_fetch_assoc($sql);
        echo "Hello ";
        echo $user['username'], ",</br>";
        echo "Date is: " . date('j.m.y, h:i:s');
        

    ?>
</body>
</html>