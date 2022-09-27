<?php 
require_once 'databaseconnect.php';

$json = file_get_contents('php://input');
$act = json_decode($json, true);

if($act["part"] == "main"){
    switch($act["act"]){
        case "news": get_news($conn);break;
        case "breeds": get_breeds($conn);break;
        case "menu_breeds": get_breeds_menu($conn);break;
        case "puppies": get_puppies($conn);break;
        case "exhibition": get_exhibitions($conn);break;
        case "gallery": get_gallery($conn);break;
        case "useful": get_useful($conn);break;
        case "our_dog": get_our_dog($conn, $act['id']);break;
        case "our_dog_imgs": get_our_dog_breed($conn, $act['id']);break;
        case "gallery_imgs": get_gallery_imgs($conn,$act['id']);break;
        case "puppies_imgs": get_puppies_imgs($conn,$act['id']);break;
    }
} else {
    switch($act["adm"]){
        case "adm_news_change": adm_change_news($conn,$act["id"],$act["data"]);break;
    }
}

