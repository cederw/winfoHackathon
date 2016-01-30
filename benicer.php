<?php
$servername = "localhost";
$username = "cederw_user";
$password = "userone";
$dbname = "cederw_meanless";

try {
    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    // set the PDO error mode to exception
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $sql = 
        "SELECT (User, Comment)
        FROM COMMENT_ANALYSIS
        ORDER BY Score DESC"

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