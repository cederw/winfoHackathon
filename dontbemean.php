<?php
$servername = "localhost";
$username = "cederw_user";
$password = "userone";
$dbname = "cederw_meanless";

try {
    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    // set the PDO error mode to exception
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $sql = "INSERT INTO COMMENT_ANALYSIS (
    	User, 
    	Comment, 
    	Rating, 
    	Irony, 
    	Subjective, 
    	Agreement, 
    	Confidence)
    VALUES (
    	'".$_GET['user']."',
    	'".$_GET['comm']."',
    	'".$_GET['rate']."',
    	'".$_GET['ir']."',
    	'".$_GET['sub']."',
    	'".$_GET['agr']."',
    	'".$_GET['conf']."')";
    // use exec() because no results are returned
    $conn->exec($sql);

    echo "New record created successfully";
    }
catch(PDOException $e)
    {
    echo $sql . "<br>" . $e->getMessage();
    }

$conn = null;
?>

