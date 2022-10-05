<?php 
    session_start();
    if(!$_SESSION['user']){
        header('Location: ../index.html');
    }
?>
<!doctype html>
<html lang="ru">
<head>
	<meta charset="UTF-8">
    <meta name='viewport' content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
	<link rel = "stylesheet" href="../css/editList.css">
    <link rel = "stylesheet" href="../css/main.css">
    <link rel = "stylesheet" href="../font/stylesheet.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script> 
    <script src="../scripts/navigate-menu light.js"></script>
    <script src="../scripts/adm_list.js?v=5"></script>
    <script src="../scripts/adm_exit.js?v=1"></script>
    <script src="../scripts/contact_control.js?v=1"></script>
    <title>Список для редактирования</title>
</head> 
<body>
    <header class="header1 " >
        <div class="wrapper">
            <div class ="navigate_menu"> 
                <div class="row space-between">
                    <div class = "menu-burger__header">
                        <span></span>
                    </div>
                    <nav class="header__nav">
                        <ul class="menu header__menu"> 
                            <img class="header_logo" src="../image/logo1.png" width="50px" height="50px"> 
                            <li><a class="scroll" href="#" id="exitAdmin">Выйти</a></li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    </header>
    <div class="container mt-4">
        <form class="list_menu">
            <div class = "form">
                <h1>Страницы для редактирования:</h1>
                <nav class="list__nav">
                    <ul class="list__menu"> 
                        <li><a class="change" href="news.php">- Новости;</a></li>
                        <li><a class="change" href="ourDogs.php">- Наши собаки;</a></li>
                        <li><a class="change" href="useful.php">- Полезное;</a></li>
                        <li><a class="change" href="exhibition.php">- Выставки;</a></li>
                        <li><a class="change" href="puppies.php">- Щенки;</a></li>
                        <li><div class="dropdown">
                            <button class="dropbtn1">- Галерея;</button>
                            <div id="list_breeds_pages" class="dropdown-content">
                            </div>
                          </div></a></li>
                    </ul>
                </div>
            </div>
        </form>
    </div>
</body>

</html>