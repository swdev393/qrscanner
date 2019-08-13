<?php

$valid_passwords = array ("admin" => "Admin", "staff1" => "Staff1", "staff2" => "Staff2");
$valid_users = array_keys($valid_passwords);

$user = $_SERVER['PHP_AUTH_USER'];
$pass = $_SERVER['PHP_AUTH_PW'];

$validated = (in_array($user, $valid_users)) && ($pass == $valid_passwords[$user]);

if (!$validated) {
  header('WWW-Authenticate: Basic realm="My Realm"');
  header('HTTP/1.0 401 Unauthorized');
  die ("Not authorized");
}

// If arrives here, is a valid user.

echo "<!DOCTYPE html>";
echo "<html>";
echo "  <head>";
echo "    <title>Instascan</title>";
echo "  </head>";
echo "  <body onresize='window_resize()'>";
echo "    <p>Welcome $user.</p>";
echo "    <div id='qrRes'>";
echo "        <span id='qrResSpan'>&nbsp</span>";
echo "    </div>";
echo "    <br>";

echo "    <div id='qrVideo'>";
echo "        <video id='preview'></video>";
echo "    </div>";
echo "    <br>";

echo "    <button id='btn_clear_scans' onclick='clear_scans()'>clear local scans</button>";
echo "    <button id='btn_display_scans' onclick='display_scans()'>display local scans</button>";
echo "    <button id='btn_send_scans' onclick='SendScans()'>send scans to server</button>";
echo "    <button id='btn_get_scans' onclick='GetScans()'>get scans from server</button>";
echo "    <br/>";
echo "    <br/>";
echo "    <label for='lbl_scans_from_server'><b>Scans from Server:</b></label>";
echo "    <p id='scans_from_server'></p>";

echo "    <script type='text/javascript' src='js/instascan.min.js'></script>"; 
echo "    <script type='text/javascript' src='js/qrscan.js'></script>";  
echo "    <script type='text/javascript'>";
echo "	      scan_qrcode();";
echo "    </script>";
echo "  </body>";
echo "</html> ";
?>
