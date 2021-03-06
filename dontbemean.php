<?php
$servername = "localhost";
$username = "cederw_user";
$password = "userone";
$dbname = "cederw_meanless";

$rate = $_GET['rate'];
$ir = $_GET['ir'];
$sub = $_GET['sub'];
$agr = $_GET['agr'];
$conf = $_GET['conf'];

function getScore(){
	$score = 0; 
	if ($_GET['rate'] == 'P+') {
		$score += 4000;
	} else if ($_GET['rate'] == 'P') {
		$score += 3000;
	} else if ($_GET['rate'] == 'NEU' || $_GET['rate'] == 'NONE') {
		$score += 2000;
	} else if ($_GET['rate'] == 'N') {
		$score += 1000;
	}
   // echo $score;

	if ($_GET['ir'] == 'NONIRONIC') {
		$score += 1000;
	} else if ($_GET['ir'] == 'IRONIC') {
		$score += 500;
	}
   // echo $score;
	if ($_GET['sub'] == 'OBJECTIVE') {
		$score += 100;
	} else if ($_GET['sub'] == 'SUBJECTIVE') {
		$score += 50; 
	}
  //  echo $score; 
	if ($_GET['agr'] == 'AGREEMENT') {
		$score += 10; 
	} else if ($_GET['agr'] == 'DISAGREEMENT'){
		$score += 5;
	}
	$score = $score * $_GET['conf']; 

	return $score;
}

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
    	Confidence,
    	Score)
    VALUES (
    	'".$_GET['user']."',
    	'".$_GET['comm']."',
    	'".$_GET['rate']."',
    	'".$_GET['ir']."',
    	'".$_GET['sub']."',
    	'".$_GET['agr']."',
    	'".$_GET['conf']."',
    	'".getScore()."')";
    // use exec() because no results are returned
    $conn->exec($sql);

    //echo "New record created successfully";
   header('Location: index.php');
    }
catch(PDOException $e)
    {
    echo $sql . "<br>" . $e->getMessage();
    }

$conn = null;
?>

