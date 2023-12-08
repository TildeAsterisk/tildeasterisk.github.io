<?php
session_start();
include("header.php");
if(!isset($_SESSION['uid'])){
    echo "You must be logged in to view this page!";
}else{
  if(isset($_POST["points"])){
    $turns = protect($mysql,$_POST['turns']);
    //$turns=protect($mysql,1);
    $id = protect($mysql,$_POST['id']);
    $user_check = mysqli_query($mysql,"SELECT * FROM `stats` WHERE `id`='".$id."'") or die(mysqli_error($mysql));
    if(mysqli_num_rows($user_check) == 0){
        output("There is no user with that ID!");
    }elseif($turns < 1 || $turns > 10){
        output("You must attack with 1-10 turns!");
    }
    /*elseif($turns > $stats['turns']){
        output("You do not have enough turns!");
    }*/
    elseif($id == $_SESSION['uid']){
        output("You cannot attack yourself!");
    }else{
        $enemy_stats = mysqli_fetch_assoc($user_check);
        $attack_effect = $turns * 0.1 * $stats['attack'];
        $defense_effect = $enemy_stats['defense'];
        
        echo "You send your warriors into battle!<br><br>";
        echo "Your warriors dealt " . number_format($attack_effect) . " damage!<br>";
        echo "The enemy's defenders dealt " . number_format($defense_effect) . " damage!<br><br>";
        if($attack_effect > $defense_effect){
            $ratio = ($attack_effect - $defense_effect)/$attack_effect * $turns;
            $ratio = min($ratio,1);
            $gold_stolen = floor($ratio * $enemy_stats['points']);
            echo "You won the battle! You stole " . $gold_stolen . " gold!";
            $battle1 = mysqli_query($mysql,"UPDATE `stats` SET `points`=`points`-'".$gold_stolen."' WHERE `id`='".$id."'") or die(mysqli_error($mysql));
            $battle2 = mysqli_query($mysql,"UPDATE `stats` SET `points`=`points`+'".$gold_stolen."',`turns`=`turns`-'".$turns."' WHERE `id`='".$_SESSION['uid']."'") or die(mysqli_error($mysql));
            $battle3 = mysqli_query($mysql,"INSERT INTO `logs` (`attacker`,`defender`,`attacker_damage`,`defender_damage`,`points`,`food`,`time`) 
                                    VALUES ('".$_SESSION['uid']."','".$id."','".$attack_effect."','".$defense_effect."','".$gold_stolen."','0','".time()."')") or die(mysqli_error($mysql));
            $stats['points'] += $gold_stolen;
            //$stats['turns'] -= $turns;
        }else{
            echo "You lost the battle!";
        }
    }
  }
  elseif(isset($_POST["food"])){

  }
  else{
    output("You have visited this page incorrectly.");
  }

}
include("footer.php");
?>