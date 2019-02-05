<?php
	session_start();
	include('functions.php');
?>
<!DOCTYPE html>
<html>
	<head>
		<title>Joel - Chat</title>
		<link rel="stylesheet" href="style.css"/>
		<meta name="viewport" content="width=device-width, initial-scale=1" />
		<link rel="stylesheet" href="bootstrap-3.3.7/font-awesome-4.1.0/css/font-awesome.css"/>
	</head>
	<body>
		<?php
			$i=0;
			$j=0;
			$req=$db->query('SELECT * FROM membres LIMIT 0,100');
			while($sug=$req->fetch()){
				echo '<span class="sug" style="display:none;">'.$sug['username'].'</span>';
			}
		?>
		<section>
			<aside>
				<div id="aside_head">
					<?php echo'<img align="center" src="Profil/'.$_SESSION['img'].'" width="64" id="img_user"/>';?>
					<button id="menu_ico" onclick="menu();"><i class="fa fa-ellipsis-v" style="font-size:32px;"></i></button>
					<div id="menu_user">
						<ul>
							<li><a href="javascript:;" onclick="profil();">Profil</a></li>
							<li><a href="javascript:;" onclick="setting();">Setting</a></li>
					</div>
				</div>
				<div id="search_chats">
					<form action="javascript:searchChat();" id="auto-suggest">
						<input type="text" id="search" placeholder="Search or start a new chat" required/>
						<button type="submit" class="btnX" id="rec"><img src="loop.svg" style="width:20px;display:inline-block;margin-top:1%;"/></button>
						<ul class="suggestions">
						</ul></br>
					</form>
				</div>
				<div id="list_chats">
					<ul id="list_chats_ul">
					</ul>
				</div>
			</aside>
			<article>
				<div id="default_article">
					<p align="center">Click on a chat</p>
				</div>
				<div id="article">
					<div id="article_head">
					</div>
					<div id="MesArea">
						<ul id="UlmsgList">
							<div id="waitingForOldMessages">wait while getting old messages...</div>
							<div id="waitingForMessages">wait while getting messages...</div>
						</ul>
					</div>
					<div id="send_form">

					</div>
				</div>
			</article>
		</section>
		<script type="text/javascript" src="functions.js"></script>
		<script type="text/javascript" src="jQuery.js"></script>
		<script src="popup.js"></script>
	</body>
</html>