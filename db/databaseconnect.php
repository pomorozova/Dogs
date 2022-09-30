<?php
require_once 'pdoconfig.php';
global $conn;

try {
    $conn = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);    
} catch (PDOException $pe) {
    die("Could not connect to the database $dbname :" . $pe->getMessage());
}

function select_test($conn){
    $sth = $conn->prepare("SELECT * FROM `category`");
    $sth->execute();
    $array = $sth->fetchAll(PDO::FETCH_ASSOC);

    $sth = $conn->prepare("SELECT * FROM `category` WHERE `id` = ?");
    $sth->execute(array('21'));
    $array = $sth->fetch(PDO::FETCH_ASSOC);

    $sth = $conn->prepare("SELECT `name` FROM `category` WHERE `id` = ?");
    $sth->execute(array('21'));
    $value = $sth->fetch(PDO::FETCH_COLUMN);
}


function get_news($conn){
    $sth = $conn->prepare("SELECT * FROM `news`");
    $sth->execute();
    $data = $sth->fetchAll(PDO::FETCH_ASSOC);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($data);
}

function get_breeds($conn){
    $sth = $conn->prepare("SELECT * FROM `dog_breeds`");
    $sth->execute();
    $data = $sth->fetchAll(PDO::FETCH_ASSOC);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($data);
}

function get_breeds_menu($conn){
    $sth = $conn->prepare("SELECT id, name_breed, page_breed FROM `dog_breeds`;");
    $sth->execute();
    $data = $sth->fetchAll(PDO::FETCH_ASSOC);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($data);
}

function get_puppies($conn){
    $sth = $conn->prepare("SELECT * FROM `puppies`");
    $sth->execute();
    $data = $sth->fetchAll(PDO::FETCH_ASSOC);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($data);
}

function get_puppies_imgs($conn,$id){
    $sth = $conn->prepare("SELECT img FROM `imgs_puppies` WHERE id_pup=:id;");
    $sth->execute(array('id'=>$id));
    $data = $sth->fetchAll(PDO::FETCH_ASSOC);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($data);
}

function get_exhibitions($conn){
    $sth = $conn->prepare("SELECT * FROM `exhibitions`");
    $sth->execute();
    $data = $sth->fetchAll(PDO::FETCH_ASSOC);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($data);
}

function get_gallery($conn){
    $sth = $conn->prepare("SELECT * FROM `dog`");
    $sth->execute();
    $data = $sth->fetchAll(PDO::FETCH_ASSOC);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($data);
}

function get_useful($conn){
    $sth = $conn->prepare("SELECT * FROM `useful`");
    $sth->execute();
    $data = $sth->fetchAll(PDO::FETCH_ASSOC);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($data);
}

function get_our_dog($conn, $id){
    $sth = $conn->prepare("SELECT id_breed, title, text_desc,(select name_breed from `dog_breeds` where `dog_breeds`.`id`=:id) as breed FROM `our_breeds` WHERE id_breed = :id;");
    $sth->execute(array("id"=>$id));
    $data = $sth->fetchAll(PDO::FETCH_ASSOC);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($data);
}

function get_our_dog_breed($conn, $id){
    $sth = $conn->prepare("SELECT name_dog,img FROM `dog` INNER JOIN `dog_imgs` on `dog`.`id`=`dog_imgs`.`id_dog` WHERE dog_breed=:id GROUP BY name_dog;");
    $sth->execute(array("id"=>$id));
    $data = $sth->fetchAll(PDO::FETCH_ASSOC);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($data);
}

function get_gallery_imgs($conn, $id){
    $sth = $conn->prepare("SELECT img FROM `dog_imgs` where id_dog=:id;");
    $sth->execute(array("id"=>$id));
    $data = $sth->fetchAll(PDO::FETCH_ASSOC);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($data);
}

// -------------------------------------------------------------------- админ часть

//изменяем существующую запись рубрики новостей по id
function adm_change_news($conn, $id, $data){
    $title = $data[0]['value'];
    $desc_news = $data[1]['value'];
    $sth = $conn->prepare("UPDATE `news` SET `title` = :title, `desc_news` = :desc_news WHERE `id` = :id");
    $sth->execute(array('title' => $title, 'id' => $id, 'desc_news'=>$desc_news ));
}

//добавляем новую запись рубрики новостей
function adm_add_news($conn, $data, $img_link){
    $title = $data[0]['value'];
    $desc_news = $data[1]['value'];    
    //$res_copy = copy($img_link, "bb.jpg"); //доделать
    $sth = $conn->prepare("INSERT INTO `news` (`title`, `date`, `desc_news`,`img`) VALUES(:title,'2022-09-22',:desc_news,'dog3.jpg')");
    $sth->execute(array('title' => $title, 'desc_news'=>$desc_news ));
}

//удаляем существующую запись из рубрики новости
function adm_del_news($conn, $id){
    $sth = $conn->prepare("DELETE FROM `news` WHERE `id`=:id");
    $sth->execute(array('id' => $id));
}

//изменяем существующую запись рубрики выставок по id
function adm_change_exhib($conn, $id, $data){
    $title = $data[0]['value'];
    $desc_1 = $data[1]['value'];
    $desc_2 = $data[2]['value'];
    $sth = $conn->prepare("UPDATE `exhibitions` SET `title`=:title, `desc_text_1`=:desc_1,`desc_text_2`=:desc_2 where `id`=:id");
    $sth->execute(array('title' => $title, 'id' => $id, 'desc_1'=>$desc_1 , 'desc_2'=>$desc_2 ));
}

//добавляем новую запись рубрики выставок
function adm_add_exhib($conn, $data, $img_link1, $img_link2){
    $title = $data[0]['value'];
    $desc_1 = $data[1]['value'];
    $desc_2 = $data[2]['value'];   
    //$res_copy = copy($img_link1, "bb.jpg"); //доделать
    $sth = $conn->prepare("INSERT INTO `exhibitions`(`title`,`img`,`desc_text_1`,`desc_text_2`) VALUES(:title,'dog1.jpg',:desc_1,:desc_2)");
    $sth->execute(array('title' => $title, 'desc_1'=>$desc_1, 'desc_2'=>$desc_2 ));
}

//удаляем существующую запись из рубрики выставок
function adm_del_exhib($conn, $id){
    $sth = $conn->prepare("DELETE FROM `exhibitions` WHERE `id`=:id");
    $sth->execute(array('id' => $id));
}

//выводим описание собаки
function adm_get_gallery($conn,$id_breed){
    $sth = $conn->prepare("SELECT id, name_dog, desc_dog FROM `dog` WHERE `dog_breed` = :id_breed");
    $sth->execute(array("id_breed"=>$id_breed));
    $data = $sth->fetchAll(PDO::FETCH_ASSOC);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($data);
}

//выводим все изображения собак определённой породы через id
function adm_get_gallery_imgs($conn, $id){
    $sth = $conn->prepare("SELECT `dog_imgs`.`id`,name_dog,img FROM `dog` INNER JOIN dog_imgs on `dog`.`id`=`dog_imgs`.`id_dog` WHERE `dog_breed`=:id;");
    $sth->execute(array('id'=>$id));
    $data = $sth->fetchAll(PDO::FETCH_ASSOC);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($data);
}

//изменяем картинку по id
function adm_change_gallery_imgDog($conn, $id, $img){
    $sth = $conn->prepare("UPDATE `dog_imgs` SET img=:img WHERE id=:id");
    $sth->execute(array('img' => $img, 'id' => $id));
}

//изменяем описание собаки по id
function adm_change_gallery_dogDesc($conn, $id, $data){
    $desc_dog = $data[0]['value'];
    $sth = $conn->prepare("UPDATE `dog` SET desc_dog = :desc_dog WHERE id= :id");
    $sth->execute(array('desc_dog' => $desc_dog, 'id' => $id));
}

//удаляем существующую запись из галереи
function adm_del_gallery($conn, $id){
    $sth = $conn->prepare("DELETE FROM `gallery` WHERE `id`=:id");
    $sth->execute(array('id' => $id));
}

//удаляем изображение собаки по id
function adm_del_gallery_img($conn, $id){
    $sth = $conn->prepare("DELETE FROM `dog_imgs` WHERE `id`=:id");
    $sth->execute(array('id' => $id));
}

//добавляет изображение собаки
function adm_add_gallery_img($conn, $id, $img){
    $sth = $conn->prepare("INSERT INTO `dog_imgs` (id_dog, img) VALUES(:id,:img)");
    $sth->execute(array('id' =>  $id, 'img'=> $img));
}

//добавляем новую запись полезностей
function adm_add_useful($conn, $data, $img_link){
    $title = $data[0]['value'];
    $desc_1 = $data[1]['value'];
    $desc_2 = $data[2]['value'];    
    //$res_copy = copy($img_link, "bb.jpg"); //доделать
    $sth = $conn->prepare("INSERT INTO `useful` (`title`,`text_1`,`text_2`,`img`) VALUES(:title,:desc_1,:desc_2,'News.jpg')");
    $sth->execute(array('title' => $title, 'desc_1'=> $desc_1, 'desc_2'=> $desc_2 ));
}

//удаляем существующую запись из рубрики полезностей
function adm_del_useful($conn, $id){
    $sth = $conn->prepare("DELETE FROM `useful` WHERE `id`=:id");
    $sth->execute(array('id' => $id));
}

//изменяем существующую запись рубрики полезного по id
function adm_change_useful($conn, $id, $data){
    $title = $data[0]['value'];
    $desc_1 = $data[1]['value'];
    $desc_2 = $data[2]['value'];
    $sth = $conn->prepare("UPDATE `exhibitions` SET `title`=:title, `desc_text_1`=:desc_1,`desc_text_2`=:desc_2 where `id`=:id");
    $sth->execute(array('title' => $title, 'id' => $id, 'desc_1'=>$desc_1 , 'desc_2'=>$desc_2 ));
}

//достаём инфу о всех породах
function adm_get_all_breed($conn){
    $sth = $conn->prepare("SELECT *,(select name_breed from `dog_breeds` where `dog_breeds`.`id`=id_breed) as breed FROM `our_breeds`;");
    $sth->execute();
    $data = $sth->fetchAll(PDO::FETCH_ASSOC);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($data);
}

//достаём всех имеющихся собак
function adm_get_all_dogs($conn){
    $sth = $conn->prepare("SELECT *,(SELECT name_breed FROM `dog_breeds` WHERE id=`dog`.`dog_breed`) as breed FROM `dog`;");
    $sth->execute();
    $data = $sth->fetchAll(PDO::FETCH_ASSOC);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($data);
}

//изменяем запись-инфу о породе
function adm_ourDogs_change_breed($conn, $id, $data){
    $title = $data[0]['value'];
    $osn_text = $data[1]['value'];
    $sth = $conn->prepare("UPDATE `our_breeds` SET text_desc=:osn_text, title=:title WHERE `id`=:id");
    $sth->execute(array('title' => $title, 'id' => $id, 'osn_text'=>$osn_text));
}

//изменяем запись о конкретной собаке
function adm_ourDogs_change_dogs($conn, $id, $data, $img, $breed){
    $name_dog = $data[0]['value'];
    $sth = $conn->prepare("UPDATE `dog` SET name_dog=:name_dog,dog_breed=:breed WHERE `id`=:id");
    $sth->execute(array('name_dog' => $name_dog, 'id' => $id, 'breed'=>$breed));
}

//добавляем новую собаку
function adm_ourDogs_add_new_dog($conn, $data, $img, $breed){
    $name_dog = $data[0]['value'];
    $sth = $conn->prepare("INSERT INTO `dog` (`name_dog`,`dog_breed`) VALUES(:name_dog,:breed)");
    $sth->execute(array('name_dog' => $name_dog, 'breed'=>$breed));
}


//удаляем собаку по id
function adm_del_dog($conn, $id){
    $sth = $conn->prepare("DELETE FROM `dog` WHERE `id`=:id");
    $sth->execute(array('id' => $id));
}

//удаляем инфу о породе по id
function adm_del_infoBreed($conn, $id){
    $sth = $conn->prepare("DELETE FROM `our_breeds` WHERE `id`=:id");
    $sth->execute(array('id' => $id));
}

//выводим инфу обо всех щенках
function adm_get_puppies($conn){
    $sth = $conn->prepare("SELECT * FROM `puppies`;");
    $sth->execute();
    $data = $sth->fetchAll(PDO::FETCH_ASSOC);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($data);
}

//изменяем инфу о щенках по id
function adm_chg_puppies($conn,$id, $data){
    $desc_mom = $data[0]['value'];
    $desc_fat = $data[1]['value'];
    $desc_pup = $data[2]['value'];
    $sth = $conn->prepare("UPDATE `puppies` SET desc_mom=:desc_mom, desc_father=:desc_fat,desc_puppie=:desc_pup WHERE id=:id");
    $sth->execute(array("id"=>$id, "desc_mom"=>$desc_mom,"desc_fat"=>$desc_fat,"desc_pup"=>$desc_pup));
}

//удаляем инфу о щенках по id
function adm_del_puppies($conn, $id){
    $sth = $conn->prepare("DELETE FROM `puppies` WHERE `id`=:id");
    $sth->execute(array('id' => $id));
}

//добавляем новую инфу о щенках
function adm_add_puppies($conn, $data){
    $desc_mom = $data[0]['value'];
    $desc_fat = $data[1]['value'];
    $desc_pup = $data[2]['value'];
    
    $sth = $conn->prepare("INSERT INTO `puppies` (desc_mom,desc_father,desc_puppie) VALUES(:desc_mom,:desc_fat,:desc_pup)");
    $sth->execute(array('desc_mom' => $desc_mom, 'desc_fat'=>$desc_fat, 'desc_pup'=>$desc_pup));
}

//
function add_test($conn){
    $sth = $conn->prepare("INSERT INTO `dog` values (2,'sdfs','bdbdda','sdfsgw1')");
    $sth->execute();
    $data = "ijj";
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($data);
}

//
function update_test($conn){
    $sth = $conn->prepare("UPDATE `category` SET `name` = :name WHERE `id` = :id");
    $sth->execute(array('name' => 'Виноград', 'id' => 22));
}

//
function del_test($conn)
{
    $sth = $conn->prepare("DELETE FROM `category` WHERE `parent` = :parent");
    $sth->execute(array('parent' => 1));
}