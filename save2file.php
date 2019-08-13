<?php
    if($_POST){
        if(isset($_POST['scans'])){
            $values = array_values($_POST);
            save2file($values[0]);
        }
    } else {
 	readFileFromServer();
    }

    function save2file($scans)
    {
        $today = date("Y-m-d");
        $file = 'scans/scans'.$today.'.txt';
        $content = $scans."\n";   

        file_put_contents($file, $content, FILE_APPEND | LOCK_EX);
        echo "saved to server: ".$content;
    }

    function readFileFromServer()
    {
        $today = date("Y-m-d");
        $filename = 'scans/scans'.$today.'.txt';
        $content = "";

	$fil = fopen($filename,"r");
	while(!feof($fil))
  	{
	    $tmp = fgets($fil); 
            $tmparry = explode(",", $tmp);
	    
	    foreach ($tmparry as &$value) {
		$content = $content."<br/>".$value;
	    }
  	}
	fclose($fil);
	echo $content;
    }
?>