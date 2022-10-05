<?php
session_start();

require_once 'pdoconfig.php';
global $conn;

try {
    $conn = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);    
} catch (PDOException $pe) {
    die("Could not connect to the database $dbname :" . $pe->getMessage());
}

function moving_img($key_img){
    move_uploaded_file($_FILES[$key_img]['tmp_name'],dirname(dirname(__FILE__)) . '/' . 'image/' . $_FILES[$key_img]['name']);
}

function end_work()
{
   echo json_encode(array());
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
    $sth = $conn->prepare("SELECT * FROM `news` ORDER BY `date` DESC");
    $sth->execute();
    $data = $sth->fetchAll(PDO::FETCH_ASSOC);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($data);
}

function get_index_news($conn){
    $sth = $conn->prepare("SELECT * FROM `news` ORDER BY `date` DESC LIMIT 2");
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

function block_puppies()
{
    $full_name = htmlspecialchars($_POST['full_name']);
    $email = htmlspecialchars($_POST['email']);
    $town = htmlspecialchars($_POST['town']);
    $phone = htmlspecialchars($_POST['phone']);
    $gender = htmlspecialchars($_POST['gender']);
    $pcolor = htmlspecialchars($_POST['pcolor']);
    $need_dog = htmlspecialchars($_POST['need_dog']);
    $family_composition = htmlspecialchars($_POST['family_composition']);
    $comment = htmlspecialchars($_POST['comment']);

    $descr = "ФИО: {$full_name}\bEmail: {$email}\bГород: {$town}\bТелефон: {$phone}\bПол щенка: {$gender}\bОкрас: {$pcolor}\bДля чего собака: {$need_dog}\bСостав семьи: {$family_composition}\bКомментарий: {$comment}";
    mail('andrey.perminov@geekprogram.org',"Бронирование щенков", $descr);
    echo json_encode(array('success'=>true));
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
function adm_change_news($conn){
    moving_img("img_news_change");
    $sth = $conn->prepare("UPDATE `news` SET `title` = :title, `desc_news` = :desc_news, `img`=:img WHERE `id` = :id");
    $sth->execute(array('title' => $_POST["heading"], 'id' => $_POST["id"], 'desc_news'=>$_POST["description"], 'img' => $_FILES["img_news_change"]["name"] ));
    end_work();
}

//добавляем новую запись рубрики новостей
function adm_add_news($conn){  
    moving_img("img_news_add");
    $sth = $conn->prepare("INSERT INTO `news` (`title`, `date`, `desc_news`,`img`) VALUES(:title,'2022-09-22',:desc_news,:img)");
    $sth->execute(array('title' => $_POST["heading"], 'desc_news'=>$_POST["description"],'img'=>$_FILES['img_news_add']['name']));
    end_work();
}

//удаляем существующую запись из рубрики новости
function adm_del_news($conn, $id){
    $sth = $conn->prepare("DELETE FROM `news` WHERE `id`=:id");
    $sth->execute(array('id' => $id));
    header('Content-Type: application/json; charset=utf-8');
    end_work();
}

//изменяем существующую запись рубрики выставок по id
function adm_change_exhib($conn, $id){
    $title = $_POST['heading'];
    $desc_1 = $_POST['description1'];
    $desc_2 = $_POST['description2'];
    $sth = $conn->prepare("UPDATE `exhibitions` SET `title`=:title, `desc_text_1`=:desc_1,`desc_text_2`=:desc_2 where `id`=:id");
    $sth->execute(array('title' => $title, 'id' => $id, 'desc_1'=>$desc_1 , 'desc_2'=>$desc_2 ));
    end_work();
}

//добавляем новую запись рубрики выставок
function adm_add_exhib($conn){
    $title = $_POST['heading'];
    $desc_1 = $_POST['description1'];
    $desc_2 = $_POST['description2']; 
    $img1 = $_FILES['imgAdd']['name'];
    $sth = $conn->prepare("INSERT INTO `exhibitions`(`title`,`img`,`desc_text_1`,`desc_text_2`) VALUES(:title,:img,:desc_1,:desc_2)");
    $sth->execute(array('title' => $title, 'desc_1'=>$desc_1, 'desc_2'=>$desc_2, 'img'=>$img1 ));
    end_work();
}

//удаляем существующую запись из рубрики выставок
function adm_del_exhib($conn, $id){
    $sth = $conn->prepare("DELETE FROM `exhibitions` WHERE `id`=:id");
    $sth->execute(array('id' => $id));
    end_work();
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
function adm_change_gallery_imgDog($conn){
    moving_img('img');
    $img = $_FILES['img']['name'];
    $id = $_POST['id'];
    $sth = $conn->prepare("UPDATE `dog_imgs` SET img=:img WHERE id=:id");
    $sth->execute(array('img' => $img, 'id' => $id));
    end_work();
}

//изменяем описание собаки по id
function adm_change_gallery_dogDesc($conn){
    $id = $_POST['id'];
    $desc_dog = $_POST['description'];
    $sth = $conn->prepare("UPDATE `dog` SET desc_dog = :desc_dog WHERE id= :id");
    $sth->execute(array('desc_dog' => $desc_dog, 'id' => $id));
    end_work();
}

//удаляем существующую запись из галереи
function adm_del_gallery($conn, $id){
    $sth = $conn->prepare("DELETE FROM `gallery` WHERE `id`=:id");
    $sth->execute(array('id' => $id));
    end_work();
}

//удаляем изображение собаки по id
function adm_del_gallery_img($conn, $id){
    $sth = $conn->prepare("DELETE FROM `dog_imgs` WHERE `id`=:id");
    $sth->execute(array('id' => $id));
    end_work();
}

//добавляет изображение собаки
function adm_add_gallery_img($conn){
    $id = $_POST['id'];
    $img = $_FILES['imgDog']['name'];
    $sth = $conn->prepare("INSERT INTO `dog_imgs` (id_dog, img) VALUES(:id,:img)");
    $sth->execute(array('id' =>  $id, 'img'=> $img));
    end_work();
}

//добавляем новую запись полезностей
function adm_add_useful($conn){
    moving_img("img");
    $title = $_POST['heading'];
    $desc_1 = $_POST['description1'];
    $desc_2 = $_POST['description2'];
    $img = $_FILES["img"]['name'];
    $sth = $conn->prepare("INSERT INTO `useful` (`title`,`text_1`,`text_2`,`img`) VALUES(:title,:desc_1,:desc_2,:img)");
    $sth->execute(array('title' => $title, 'desc_1'=> $desc_1, 'desc_2'=> $desc_2 , 'img'=> $img));
    end_work();
}

//удаляем существующую запись из рубрики полезностей
function adm_del_useful($conn, $id){
    $sth = $conn->prepare("DELETE FROM `useful` WHERE `id`=:id");
    $sth->execute(array('id' => $id));
    end_work();
}

//изменяем существующую запись рубрики полезного по id
function adm_change_useful($conn){
    moving_img("imgChg");
    $title = $_POST['heading'];
    $desc_1 = $_POST['description1'];
    $desc_2 = $_POST['description2'];
    $id = $_POST["id"];
    $img = $_FILES["imgChg"]["name"];
    $sth = $conn->prepare("UPDATE `useful` SET `title` = :title, `text_1` = :desc_1, `text_2` = :desc_2, `img` = :img WHERE `useful`.`id` = :id");
    $sth->execute(array('title' => $title, 'id' => $id, 'desc_1'=>$desc_1 , 'desc_2'=>$desc_2 , 'img'=> $img));
    end_work();
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
    $sth = $conn->prepare("SELECT *,(SELECT name_breed FROM `dog_breeds` WHERE id=`dog`.`dog_breed`) as breed,(SELECT img FROM `dog_imgs` WHERE `dog`.`id`=`dog_imgs`.`id_dog` limit 1)as img FROM `dog`;");
    $sth->execute();
    $data = $sth->fetchAll(PDO::FETCH_ASSOC);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($data);
}

//изменяем запись-инфу о породе
function adm_ourDogs_change_breed($conn ){
    $id = $_POST['id'];
    $title = $_POST['heading'];
    $osn_text = $_POST['description'];
    $sth = $conn->prepare("UPDATE `our_breeds` SET text_desc=:osn_text, title=:title WHERE `id`=:id");
    $sth->execute(array('title' => $title, 'id' => $id, 'osn_text'=>$osn_text));
    end_work();
}

//изменяем запись о конкретной собаке
function adm_ourDogs_change_dogs($conn){
    $id = $_POST["id"];
    $breed = $_POST["breed"];
    $name_dog = $_POST['name_dog'];
    $sth = $conn->prepare("UPDATE `dog` SET name_dog=:name_dog,dog_breed=:breed WHERE `id`=:id");
    $sth->execute(array('name_dog' => $name_dog, 'id' => $id, 'breed'=>$breed));
    end_work();
}

//добавляем новую собаку
function adm_ourDogs_add_new_dog($conn){

    $name_dog = $_POST['name_dog'];
    $breed = $_POST['breed'];
    $sth = $conn->prepare("INSERT INTO `dog` (`name_dog`,`dog_breed`) VALUES(:name_dog,:breed)");
    $sth->execute(array('name_dog' => $name_dog, 'breed'=>$breed));
    end_work();
}


//удаляем собаку по id
function adm_del_dog($conn, $id){
    $sth = $conn->prepare("DELETE FROM `dog` WHERE `id`=:id");
    $sth->execute(array('id' => $id));
    end_work();
}

//удаляем инфу о породе по id
function adm_del_infoBreed($conn, $id){
    $sth = $conn->prepare("DELETE FROM `our_breeds` WHERE `id`=:id");
    $sth->execute(array('id' => $id));
    end_work();
}

//выводим инфу обо всех щенках
function adm_get_puppies($conn){
    $sth = $conn->prepare("SELECT * FROM `puppies`;");
    $sth->execute();
    $data = $sth->fetchAll(PDO::FETCH_ASSOC);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($data);
}

//выводим изображения для конкретной группы щенков
function adm_get_puppies_imgs($conn){    
    $sth = $conn->prepare("SELECT id, img FROM `imgs_puppies` WHERE id_pup=:id_pup;");
    $sth->execute(array('id_pup'=> $_POST['id']));
    $data = $sth->fetchAll(PDO::FETCH_ASSOC);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($data);
}

//изменяем инфу о щенках по id
function adm_chg_puppies($conn){
    moving_img('imgPupChg1');
    moving_img('imgPupChg2');
    $img1 = $_FILES['imgPupChg1']['name'];
    $img2 = $_FILES['imgPupChg2']['name'];
    $id_img1 = $_POST['id_img1'];
    $id_img2 = $_POST['id_img2'];
    $id = $_POST['id'];
    $desc_mom = $_POST['mother'];
    $desc_fat = $_POST['father'];
    $desc_pup = $_POST['description-puppies'];
    $sth = $conn->prepare("UPDATE `puppies` SET desc_mom=:desc_mom, desc_father=:desc_fat,desc_puppie=:desc_pup WHERE id=:id");
    $sth->execute(array("id"=>$id, "desc_mom"=>$desc_mom,"desc_fat"=>$desc_fat,"desc_pup"=>$desc_pup));

    $sth = $conn->prepare("UPDATE `imgs_puppies` SET `img` = :img WHERE `imgs_puppies`.`id` = :idImg");
    $sth->execute(array("idImg"=>$id_img1,"img"=>$img1));

    $sth = $conn->prepare("UPDATE `imgs_puppies` SET `img` = :img WHERE `imgs_puppies`.`id` = :idImg");
    $sth->execute(array("idImg"=>$id_img2,"img"=>$img2));

    end_work();
}

//удаляем инфу о щенках по id
function adm_del_puppies($conn, $id){
    $sth = $conn->prepare("DELETE FROM `puppies` WHERE `id`=:id");
    $sth->execute(array('id' => $id));
    end_work();
}

//добавляем новую инфу о щенках
function adm_add_puppies($conn){
    moving_img('imgPupAdd1');
    moving_img('imgPupAdd2');
    $img1 = $_FILES['imgPupAdd1']['name'];
    $img2 = $_FILES['imgPupAdd2']['name'];
    $desc_mom = $_POST['mother'];
    $desc_fat = $_POST['father'];
    $desc_pup = $_POST['description-puppies'];
    
    $sth = $conn->prepare("INSERT INTO `puppies` (desc_mom,desc_father,desc_puppie) VALUES(:desc_mom,:desc_fat,:desc_pup)");
    $sth->execute(array('desc_mom' => $desc_mom, 'desc_fat'=>$desc_fat, 'desc_pup'=>$desc_pup));

    $sth = $conn->prepare("INSERT INTO `imgs_puppies` (`img`, `id_pup`) VALUES (:img,(SELECT id FROM `puppies` ORDER BY id desc LIMIT 1))");
    $sth->execute(array('img'=>$img1));

    $sth = $conn->prepare("INSERT INTO `imgs_puppies` (`img`, `id_pup`) VALUES (:img,(SELECT id FROM `puppies` ORDER BY id desc LIMIT 1))");
    $sth->execute(array('img'=>$img2));
    end_work();
}


// -------------------------------------------------------------------------- Авторизация

function check_authoriz($conn){
    $sth = $conn->prepare("SELECT * FROM `accounts` WHERE login=:login_user and password=:password_user");
    $sth->execute(array("login_user"=>$_POST["login"],"password_user"=>md5($_POST["pass"])));
    $data = $sth->fetchAll(PDO::FETCH_ASSOC);
    if(count($data) > 0){
        
        $_SESSION["user"] = [
            "login"=> $data[0]
        ];
        echo json_encode(array("status"=>true,"message"=>'Авторизация прошла успешно'));
    } else {
        $_SESSION["msg_auth"] = "Неверный логин или пароль";
        echo json_encode(array("status"=>false,"message"=>'Неправильный логин или пароль'));
    }
    
}

function registration($conn){
    $sth = $conn->prepare("INSERT INTO `accounts` (`login`, `password`) VALUES (:login_user, :password_user)");
    $sth->execute(array("login_user"=>$_POST["login"],"password_user"=>md5($_POST["pass"])));
    end_work();
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