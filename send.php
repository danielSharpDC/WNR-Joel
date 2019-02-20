<?php
	/*	send.php to post message

	*/
	session_start();
	include ('functions.php');

	if(isset($_SESSION['username']) && is_numeric($_POST['op'])){
		$op = (int) $_POST['op'];
		$pseudo = $_SESSION['username'];
		$other = "";

		switch ($op) {
			case 0:
				$id = (int) $_POST['id'];
				$msg = htmlspecialchars($_POST['msg']);

				$select = $db->query('SELECT * FROM messages ORDER BY dates DESC LIMIT 0,1');
				$select = $select->fetch();
				$maxID = 0;
				if(is_numeric($select['id'])){
					$maxID = (int) $select['id'] + 1;
				}

				$mes = $db->prepare('INSERT INTO messages(address, username, msg, type_, dates) VALUES(:address, :username, :msg, :type_, NOW())');
				$mes->execute(array('address'=>$id, 'username'=>$pseudo, 'msg'=>$msg, 'type_'=>"text"));
				$mes->closeCursor();
				$ins = $db->prepare('UPDATE chats SET msg=:max, dates=NOW() WHERE id=:id');
				$ins->execute(array('max'=>$maxID, 'id'=>$id));
				print $maxID;
				break;
			case 1:
				$id = (int) $_POST['id'];
				$maxID = (int) $_POST['maxID'];

				$select = $db->prepare('SELECT * FROM messages WHERE id>:id AND address=:address');
				$select->execute(array('id'=>$maxID, 'address'=>$id));
				while ($msg = $select->fetch()) {
					if($msg['username'] != $pseudo){
						/*print '<li id="li" ondblclick="option('.$msg['id'].');"><div id="mineG"><p style="">
							<span id="msgA">'.$msg['msg'].'</span><p style="text-align:left;color:gray;" id="msgd"> '.getStrDate($msg['dates']).'</p>
							<img id="editableimage2" height="20px" src="load.gif" border="0"/></div></div><span id="bulleMsg"></span></li>';*/
						print   '<li id="li" ondblclick="pointeur('.$msg['id'].');"><span id="bulleMsg2"></span><div id="minenG"><p style="" class="spG">
						<span class="msgRc">   '.nl2br($msg['msg']). ' </span>';
						$dates=getStrDate($msg['dates']);
						echo '<p style="text-align:right;color:gray;" id="msgd"> '.$dates. '   </p>
						</div></li>';
					}
				}
				break;
			case 2:
				$id = (int) $_POST['id'];
				$msg = htmlspecialchars($_POST['msg']);
				$nbI = (int) $_POST['nb_file'];
				$type = htmlspecialchars($_POST['type']);
				$directory = "";

				$select = $db->query('SELECT * FROM messages ORDER BY dates DESC LIMIT 0,1');
				$select = $select->fetch();
				$maxID = 0;
				if(is_numeric($select['id'])){
					$maxID = (int) $select['id'] + 1;
				}
				switch ($type) {
					case 'img':
						$directory = "Upload/Images/";
						break;
					case 'audio':
						$directory = "Upload/Audios/";
						break;
					case 'video':
						$directory = "Upload/Videos/";
						break;
					case 'doc':
						$directory = "Upload/Documents/";
						break;
					default:
						# code...
						break;
				}
				for($s=0; $s<=$nbI; $s++){		
					$file=$_FILES['file'.$s];
					$ext = explode(".", $file['name']);
					$fileName =substr(strtoupper($type), 0, 3)."_".date('d-m-Y H:i:s')."_n".$s."_DC.".$ext[count($ext)-1];
					if(isset($file) && $file['error']==0){
						if ($file['size'] <= 95728640){
							move_uploaded_file($file['tmp_name'], $directory.''.$fileName);
							$mes = $db->prepare('INSERT INTO messages(address, username, msg, type_, file_, dates) VALUES(:address, :username, :msg, :type_, :file_, NOW())');
							$mes->execute(array('address'=>$id, 'username'=>$pseudo, 'msg'=>$msg, 'type_'=>$type, 'file_'=>$fileName));
							$mes->closeCursor();
							$ins = $db->prepare('UPDATE chats SET msg=:max, dates=NOW() WHERE id=:id');
							$ins->execute(array('max'=>$maxID, 'id'=>$id));
							$maxID++;
						}
					
					}
				}
				print $maxID;
				print 'Saved !';
				exit();
				break;
			default:
				break;
		}
	}
?>