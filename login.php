<?php
	include("functions.php");

	if(isset($_POST['pseudo'])){
		$pseudo = htmlspecialchars($_POST['pseudo']);
		$password = sha1(htmlspecialchars($_POST['password']));
		$genre = $_POST["genre"];
		$img = "";
		$check = (int) $_POST['keep'];

		if($genre == "male"){
			$img = "default_male.png";
		}else{
			$img = "default_female.png";
		}
		$test = $db->prepare('SELECT * FROM membres WHERE username=?');
		$test->execute(array($pseudo));
		$test = $test->fetch();
		if(isset($test['username']) && !empty($test['username'])){
			if($test['password'] == $password)
				create_session($pseudo, $password, $genre, $img);
			else
				header('location: connexion.html?msg=username_already_taked_by_another_user');
		}else{
			$insert_member = $db->prepare('INSERT INTO membres(username, password, img, genre, dates) VALUES(:username, :password, :img, :genre, NOW())');
			$insert_member->execute(array('username'=>$pseudo, 'password'=>$password, 'img'=>$img, 'genre'=>$genre));

			create_session($pseudo, $password, $genre, $img);
		}
		
	}

	function create_session($pseudo, $password, $genre, $img){
			session_start();
			$_SESSION['username'] = $pseudo;
			$_SESSION['password'] = $password;
			$_SESSION['genre'] = $genre;
			$_SESSION['img'] = $img;

			if($check == 1){
				$__TIME = time() + (86400 * 30);
				$cookie_pseudo_name = "username";
				$cookie_pseudo_value = $pseudo;
				$cookie_mdp_name = "password";
				$cookie_mdp_value = $password;
				setcookie($cookie_pseudo_name, $cookie_pseudo_value, $__TIME, null, null, false, true);
				setcookie($cookie_mdp_name, $cookie_mdp_value, $__TIME, null, null, false, true);	
			}else{
				$__TIME = 0	;
				$cookie_pseudo_name = "username";
				$cookie_pseudo_value = $pseudo;
				$cookie_mdp_name = "password";
				$cookie_mdp_value = $password;
				setcookie($cookie_pseudo_name, $cookie_pseudo_value, $__TIME, null, null, false, true);
				setcookie($cookie_mdp_name, $cookie_mdp_value, $__TIME, null, null, false, true);
			}

			header('location: work.php');
		}
?>