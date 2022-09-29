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
        case "adm_news_add": adm_add_news($conn,$act["data"]["main_data"],$act["data"]['img']);break;
        case "adm_news_del": adm_del_news($conn, $act["id"]); break;
        case "adm_exhib_change": adm_change_exhib($conn,$act["id"],$act["data"]);break;
        case "adm_exhib_add": adm_add_exhib($conn, $act["data"]["main_data"],$act["data"]['img1'],$act["data"]['img2']);break;
        case "adm_exhib_del": adm_del_exhib($conn, $act["id"]); break;
        case "adm_gallery": adm_get_gallery($conn, $act["id_breed"]);break;
        case "adm_gallery_change":adm_change_gallery_dogDesc($conn, $act["id"], $act["data"]); break;
        case "adm_gallery_del": adm_del_gallery($conn, $act["id"]); break;
        case "adm_gallery_imgs": adm_get_gallery_imgs($conn, $act["id"]); break;
        case "adm_gallery_del_img":adm_del_gallery_img($conn, $act["id"]); break;
        case "adm_gallery_add_img":adm_add_gallery_img($conn, $act["id"],$act["img"]); break;
        case "adm_gallery_img_change":adm_change_gallery_imgDog($conn, $act["id"],$act["img"]); break;
        case "adm_useful_add": adm_add_useful($conn,$act["data"]["main_data"],$act["data"]['img']);break;
        case "adm_useful_del": adm_del_useful($conn, $act["id"]); break;
        case "adm_useful_change": adm_change_useful($conn,$act["id"],$act["data"]);break;
        case "adm_dogs": adm_get_all_dogs($conn);break;
        case "adm_dog_add": adm_ourDogs_add_new_dog($conn, $act["data"]['main_data'],$act["data"]["img"],$act["data"]["breed"]);break;
        case "adm_dogs_breed": adm_get_all_breed($conn);break;
        case "adm_ourDogs_change_breed": adm_ourDogs_change_breed($conn,$act["id"],$act["data"]);break;
        case "adm_ourDogs_change_dogs": adm_ourDogs_change_dogs($conn,$act["id"],$act["data"],$act['img'],$act['breed']);break;
        case "adm_dog_del": adm_del_dog($conn, $act["id"]); break;
        case "adm_breedInfo_del": adm_del_infoBreed($conn, $act["id"]); break;
    }
}

