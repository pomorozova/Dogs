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