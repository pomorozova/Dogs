<?php 
require_once 'databaseconnect.php';

if($_POST['act'] == "news"){
    get_news($conn);
} else if($_POST['act'] == "dogs") {
    get_dogs($conn);
}
