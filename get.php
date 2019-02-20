<?php
	/*	get.php returns the content of work page
		*/
	session_start();
	include ('functions.php');

	if(isset($_SESSION['username']) && is_numeric($_POST['op'])){
		$op = (int) $_POST['op'];
		$pseudo = $_SESSION['username'];
		$other = "";

		switch ($op) {
			case 0:
				$all_chats = $db->query('SELECT * FROM chats WHERE user1="'.$pseudo.'" OR user2="'.$pseudo.'" ORDER BY dates DESC');
				while($chat = $all_chats->fetch()){
					if($chat['user1'] == $pseudo)
						$other = $chat['user2'];
					else
						$other = $chat['user1'];
					$select = $db->prepare('SELECT * FROM membres WHERE username =:username ');
					$select->execute(array('username'=>$other));
					$select = $select->fetch();

					$msg=$db->query('SELECT * FROM messages WHERE id='.$chat['msg'].'');
					$msg = $msg->fetch();
					$msgValue = "";
					if($msg['username'] == $pseudo)
						$msgValue = "Vous : ".$msg['msg'];
					else
						$msgValue = $msg['msg'];

					print '<a href="javascript:;" onclick="chat('.$chat['id'].', \''.$other.'\', \''.$select['img'].'\', \''.$chat['msg'].'\');">
						<li><img src="Profil/'.$select['img'].'" width="50" id="list_chat_img"/> 
						<p><font id="other_aside">'.$other.' </font><font id="datesAside">'.getStrDateAside($chat['dates']).'</font></br>'.$msgValue.'</p></li></a>';
				}
				print '';
				break;
			case 1:
				$id = (int) $_POST['id'];
				$deb = (int) $_POST['deb'];
				$end = (int) $_POST['end'];

				$allMsg=$db->query('SELECT * FROM messages WHERE address='.$id.' AND id >='.$deb.' ORDER BY dates LIMIT 0,20');
				while($msg = $allMsg->fetch()){
					switch ($msg['type_']) {
						case 'text':
							if($msg['username'] == $pseudo){
								print '<li id="li" ondblclick="option('.$msg['id'].');"><div id="mineG"><p style="">
									<span id="msgA">'.$msg['msg'].'</span><p style="text-align:left;color:gray;" id="msgd"> '.getStrDate($msg['dates']).'</p>
									</div></div><span id="bulleMsg"></span></li>';
							}else{
								print   '<li id="li" ondblclick="pointeur('.$msg['id'].');"><span id="bulleMsg2"></span><div id="minenG"><p style="" class="spG">
								<span class="msgRc">   '.nl2br($msg['msg']). ' </span>';
								$dates=getStrDate($msg['dates']);
								echo '<p style="text-align:right;color:gray;" id="msgd"> '.$dates. '   </p>
								</div></li>';
							}
							break;
						case 'img':
							if($msg['username'] == $pseudo){
								print '<li id="li" ondblclick="option('.$msg['id'].');"><div id="mineG"><p style="">
									<div id="prevE"><a href="javascript:;" onclick="imageReader(this, event);"><img src="Upload/Images/'.$msg['file_'].'" id="image"/></a></div>
									<span id="msgA">'.$msg['msg'].'</span><p style="text-align:left;color:gray;" id="msgd"> '.getStrDate($msg['dates']).'</p>
									</div></div><span id="bulleMsg"></span></li>';
							}else{
								print   '<li id="li" ondblclick="pointeur('.$msg['id'].');"><span id="bulleMsg2"></span><div id="minenG"><p style="" class="spG">
								<div id="prevE"><a href="javascript:;" onclick="imageReader(this, event);"><img src="Upload/Images/'.$msg['file_'].'" id="image"/></a></div>
								<span class="msgRc">   '.nl2br($msg['msg']). ' </span>';
								$dates=getStrDate($msg['dates']);
								echo '<p style="text-align:right;color:gray;" id="msgd"> '.$dates. '   </p>
								</div></li>';
							}
							break;
						case 'audio':
							if($msg['username'] == $pseudo){
								print '<li id="li" ondblclick="option('.$msg['id'].');"><div id="mineG"><p style="">
									<div id="prevE"><audio src="Upload/Audios/'.$msg['file_'].'" id="audio" controls></audio></div>
									<span id="msgA">'.$msg['msg'].'</span><p style="text-align:left;color:gray;" id="msgd"> '.getStrDate($msg['dates']).'</p>
									</div></div><span id="bulleMsg"></span></li>';
							}else{
								print   '<li id="li" ondblclick="pointeur('.$msg['id'].');"><span id="bulleMsg2"></span><div id="minenG"><p style="" class="spG">
								<div id="prevE"><audio src="Upload/Audios/'.$msg['file_'].'" id="audio" controls></audio></div>
								<span class="msgRc">   '.nl2br($msg['msg']). ' </span>';
								$dates=getStrDate($msg['dates']);
								echo '<p style="text-align:right;color:gray;" id="msgd"> '.$dates. '   </p>
								</div></li>';
							}
							break;
						case 'video':
							if($msg['username'] == $pseudo){
								print '<li id="li" ondblclick="option('.$msg['id'].');"><div id="mineG"><p style="">
									<div id="prevE"><video src="Upload/Videos/'.$msg['file_'].'" id="video" controls></video></div>
									<span id="msgA">'.$msg['msg'].'</span><p style="text-align:left;color:gray;" id="msgd"> '.getStrDate($msg['dates']).'</p>
									</div></div><span id="bulleMsg"></span></li>';
							}else{
								print   '<li id="li" ondblclick="pointeur('.$msg['id'].');"><span id="bulleMsg2"></span><div id="minenG"><p style="" class="spG">
								<div id="prevE"><video src="Upload/Videos/'.$msg['file_'].'" id="video" controls></video></div>
								<span class="msgRc">   '.nl2br($msg['msg']). ' </span>';
								$dates=getStrDate($msg['dates']);
								echo '<p style="text-align:right;color:gray;" id="msgd"> '.$dates. '   </p>
								</div></li>';
							}
							break;
					}
				}
				print '';
				break;
			case 2:
				$value = htmlspecialchars($_POST['value']);
				$test = $db->prepare('SELECT * FROM chats WHERE (user1 =:user1 AND user2 =:user2) OR (user1 =:user2 AND user2=:user1)');
				$test->execute(array('user1'=>$pseudo, 'user2'=>$value));
				$test = $test->fetch();

				$select = $db->prepare('SELECT * FROM membres WHERE username=? ');
				$select->execute(array($value));
				$select = $select->fetch();

				if(isset($test['user1']) && !empty($test['user1'])){
					if($test['user1'] == $pseudo)
						$other = $test['user2'];
					else
						$other = $test['user1'];

					print $test['id'].';'.$other.';'.$select['img'].';'.$test['msg'];
				}else{
					$maxID = $db->prepare('SELECT * FROM chats ORDER BY dates DESC LIMIT 0,1');
					$maxID = $maxID->fetch();
					if(!empty($maxID['user1'])){
						$maxID = $maxID['id']+1;
					}else{
						$maxID = 1;
					}

					$ins = $db->prepare('INSERT INTO chats(user1, user2, dates) VALUES(:user1, :user2, NOW())');
					$ins->execute(array('user1'=>$pseudo, 'user2'=>$value));

					print $maxID.';'.$value.';'.$select['img'];
				}
				print '';
				break;
			default:
				# code...
				break;
		}
	}
?>