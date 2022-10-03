<?php 
    session_start();
    if(isset($_SESSION['user'])){
        header('Location: list.php');
    }
?>
<!doctype html>
<html lang="ru">
<head>
	<meta charset="UTF-8">
    <meta name='viewport' content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
	<link rel = "stylesheet" href="css/styleEnter.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
    <title>Форма авторизации</title>
    <script src="scripts/auth.js?v=4"></script>
</head> 
<body>
    <div class="container mt-4">
        <form id="form_auth">
            <div class = "form">
                <h1>Авторизация</h1>
                <div class ="input-form">
                    <input type="text" class="form-control" name="login"
                    id="login" placeholder="Введите логин" 
                    ><br></div>  
                <div class ="input-form">
                    <input type="password" class="form-control" name="pass"
                    id="pass" placeholder="Введите пароль"><br></div>
                <div class ="input-form">
                <button class="btn btn-success"
                type="submit">Войти</button></div>
            </div>
            <?php 
                if(isset($_SESSION['msg_auth'])){
                    echo '<p>'. $_SESSION['msg_auth'] .'</p>';
                }
                unset($_SESSION['msg_auth']);
            ?>
        </form>
    </div>
</body>
<footer>
</footer>
</html>