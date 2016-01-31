<!doctype html>

<html lang="en">
<head>
	<meta charset="utf-8">

  	<title>Shrini Sees</title>
  
  	<link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css">
	<link rel="stylesheet" type="text/css" href="css/style.css">
	
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.0/jquery.min.js"></script>
  	<script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>
  	<script type="text/javascript" src="js/main.js"></script>
</head>

<body>
	<div class="container">
		<form action="dontbemean.php" method="get">

			<div class="form-group">
				<input type="text" name="user" id="user" placeholder="user"></textarea>	
			</div>

			<div class="form-group">
				<input type="hidden" name="rate" id="rate">
				<input type="hidden" name="ir" id="ir">
				<input type="hidden" name="sub" id="sub">
				<input type="hidden" name="agr" id="agr">
				<input type="hidden" name="conf" id="conf">
			</div>

			<div class="form-group messageBox">
				<textarea class="emoteText" name="comm" id="comm" data-toggle="popover" data-content="" placeholder="comment"></textarea>
			</div>

			<div class="form-group">
				<button id="submitBtn" type="submit" class="btn btn-primary">Submit</button>
			</div>
		</form>
	</div>	
    
    <div class="container" id="commentSection">
        <?php
        $servername = "localhost";
        $username = "cederw_user";
        $password = "userone";
        $dbname = "cederw_meanless";
        try {
            $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
            // set the PDO error mode to exception
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

            $sql = $conn->prepare(
                "SELECT User, Comment, Time_Posted
                FROM COMMENT_ANALYSIS
                ORDER BY Score DESC"
            );

            // use exec() because no results are returned
            $sql->execute();

            $result = $sql->setFetchMode(PDO::FETCH_ASSOC); 
            foreach ($sql->fetchAll() as $k=>$v) { 
                echo "<div class='container'>";
                
                echo "<div id='commentUserName'>"; 
                echo "<a href=''>" . $v['User'] . "</a>";
                echo "</div>";
                                
                echo "<div id='commentTimePosted'>"; 
                echo $v['Time_Posted'];
                echo "</div>";
                              
                echo "<div id='commentMessage'>"; 
                echo $v['Comment'];
                echo "</div>";
                
                echo "</div>";
                
                echo "<hr>";
            }
            }
        catch(PDOException $e)
            {
            echo $sql . "<br>" . $e->getMessage();
            }

        $conn = null;
        ?>        
    </div>

</body>
</html>