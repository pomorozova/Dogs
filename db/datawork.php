<?php 
require_once 'databaseconnect.php';

$json = file_get_contents('php://input');
$act = json_decode($json, true);

switch($act["act"]){
    case "news": get_news($conn);break;
    case "dogs": get_dogs($conn);break;
    case "puppies": get_puppies($conn);break;
    case "exhibition": get_exhibitions($conn);break;
    case "gallery": get_gallery($conn);break;
}
