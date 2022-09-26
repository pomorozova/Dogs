<?php 
require_once 'databaseconnect.php';

$json = file_get_contents('php://input');
$act = json_decode($json, true);

switch($act["act"]){
    case "news": get_news($conn);break;
    case "breeds": get_breeds($conn);break;
    case "puppies": get_puppies($conn);break;
    case "exhibition": get_exhibitions($conn);break;
    case "gallery": get_gallery($conn);break;
    case "gallery_imgs": get_gallery_imgs($conn,$act['id']);break;
    case "puppies_imgs": get_puppies_imgs($conn,$act['id']);break;
}
