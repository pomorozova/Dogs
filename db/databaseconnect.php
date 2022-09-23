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

function get_dogs($conn){
    $sth = $conn->prepare("SELECT * FROM `dog`");
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

function get_exhibitions($conn){
    $sth = $conn->prepare("SELECT * FROM `exhibitions`");
    $sth->execute();
    $data = $sth->fetchAll(PDO::FETCH_ASSOC);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($data);
}

function get_gallery($conn){
    $sth = $conn->prepare("SELECT * FROM `gallery`");
    $sth->execute();
    $data = $sth->fetchAll(PDO::FETCH_ASSOC);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($data);
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