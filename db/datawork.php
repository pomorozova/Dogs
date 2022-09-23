<?php 
require_once 'databaseconnect.php';

$json = file_get_contents('php://input');
$act = json_decode($json, true);

/*
switch($act){
    case "news": get_news($conn);break;
    case "dogs": get_dogs($conn);break;
    case "puppies": get_puppies($conn);break;
}
*/

if($act["act"] == "news"){
    get_news($conn);
} 
else if($act["act"] == "dogs"){
    get_dogs($conn);
}
else if($act["act"] == "puppies"){
    get_puppies($conn);
}
