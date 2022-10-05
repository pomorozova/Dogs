<?php 
require_once 'databaseconnect.php';

$part = $_POST["part"];
$act = $_POST["act"];

if($part == "main"){
    switch($act){
        case "news": get_news($conn);break;
        case "index_news": get_index_news($conn);break;
        case "breeds": get_breeds($conn);break;
        case "menu_breeds": get_breeds_menu($conn);break;
        case "puppies": get_puppies($conn);break;
        case "exhibition": get_exhibitions($conn);break;
        case "gallery": get_gallery($conn);break;
        case "useful": get_useful($conn);break;
        case "our_dog": get_our_dog($conn, $_POST["id"]);break;
        case "our_dog_imgs": get_our_dog_breed($conn, $_POST["id"]);break;
        case "gallery_imgs": get_gallery_imgs($conn,$_POST["id"]);break;
        case "puppies_imgs": get_puppies_imgs($conn,$_POST["id"]);break;
        case "block_puppies": block_puppies();break;
    }
} else if($part == "admin") {
    switch($act){
        case "adm_news_change": adm_change_news($conn);break;
        case "adm_news_add": adm_add_news($conn);break;
        case "adm_news_del": adm_del_news($conn, $_POST["id"]); break;
        case "adm_exhib_change": adm_change_exhib($conn,$_POST["id"]);break; 
        case "adm_exhib_add": adm_add_exhib($conn);break; 
        case "adm_exhib_del": adm_del_exhib($conn, $_POST["id"]); break; 
        case "adm_gallery": adm_get_gallery($conn, $_POST["id_breed"]);break; 
        case "adm_gallery_change":adm_change_gallery_dogDesc($conn); break;
        case "adm_gallery_del": adm_del_gallery($conn, $_POST["id"]); break;
        case "adm_gallery_imgs": adm_get_gallery_imgs($conn, $_POST["id"]); break;
        case "adm_gallery_del_img":adm_del_gallery_img($conn, $_POST["id"]); break; 
        case "adm_gallery_add_img":adm_add_gallery_img($conn); break; 
        case "adm_gallery_img_change":adm_change_gallery_imgDog($conn); break; 
        case "adm_useful_add": adm_add_useful($conn);break; 
        case "adm_useful_del": adm_del_useful($conn, $_POST["id"]); break; 
        case "adm_useful_change": adm_change_useful($conn);break; 
        case "adm_dogs": adm_get_all_dogs($conn);break; 
        case "adm_dog_add": adm_ourDogs_add_new_dog($conn);break; 
        case "adm_dogs_breed": adm_get_all_breed($conn);break;
        case "adm_ourDogs_change_breed": adm_ourDogs_change_breed($conn);break; 
        case "adm_ourDogs_change_dogs": adm_ourDogs_change_dogs($conn);break;
        case "adm_dog_del": adm_del_dog($conn, $_POST["id"]); break; 
        case "adm_breedInfo_del": adm_del_infoBreed($conn, $_POST["id"]); break;
        case "adm_puppies_getAll": adm_get_puppies($conn);break;
        case "adm_puppies_getAllImgs": adm_get_puppies_imgs($conn);break; 
        case "adm_puppies_change": adm_chg_puppies($conn);break;
        case "adm_puppies_del": adm_del_puppies($conn, $_POST["id"]);break; 
        case "adm_puppies_add": adm_add_puppies($conn);break; 
    }
} else {
    switch($act){
        case "authorization": check_authoriz($conn); break;
        case "registration": registration($conn); break;
    }
}
