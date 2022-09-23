<?php 
require_once 'databaseconnect.php';

$json = file_get_contents('php://input');
$act = json_decode($json, true);

if($act['act'] == "news"){
    get_news($conn);
} else if($act['act'] == "dogs") {
    get_dogs($conn);
}
