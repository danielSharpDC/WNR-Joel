<?php
	try{
		$db=New PDO('mysql:host=localhost;dbname=chat_joel_bd','root', '');
	}catch(Exception $e){
		die('Erreur: '. $e->getMessage());
	}

	function getStrDate($a){
		$dat=getDate(strtotime($a));
		if(date("Y")==$dat['year']){  
		  if(date("m")==$dat['mon']){
			if(date("d")==$dat['mday']){
				$dates=$dat['hours'].':'.$dat['minutes'];
			}
			else if(date("d")==($dat['mday']+1)){
				$dates='Hier à '.$dat['hours'].':'.$dat['minutes'];
			}else{
				$month = getMonth($dat['month']);
				$dates=$dat['mday'].' '.$month.' à  '.$dat['hours'].':'.$dat['minutes'];
			}
		  }else{
		  	$month = getMonth($dat['month']);
			$dates=$dat['mday'].' '.$month.' à  '.$dat['hours'].':'.$dat['minutes'];
		  }

		}else{
			$dates=$dat['mday'].' '.$dat['mon'].'/'.$dat['year'].' à  '.$dat['hours'].':'.$dat['minutes'];
		}
		return $dates;
	}
	function getMonth($mon){
		$res = '';
		switch ($mon) {
			case 'December':
				$res = 'Dec.';
				break;
			case 'November':
				$res = 'Nov.';
				break;
			case 'October':
				$res = 'Oct.';
				break;
			case 'September':
				$res = 'Sep.';
				break;
			case 'August':
				$res = 'Aug.';
				break;
			case 'Jully':
				$res = 'Jul.';
				break;
			case 'June':
				$res = 'Jun.';
				break;
			case 'May':
				$res = 'May';
				break;
			case 'April':
				$res = 'Apr.';
				break;
			case 'March':
				$res = 'Mar.';
				break;
			case 'Febuary':
				$res = 'Feb.';
				break;
			case 'January':
				$res = 'Jan.';
				break;
			default:
				# code...
				break;
		}
		return $res;
	}
	function getStrDateAside($a){
		$dat=getDate(strtotime($a));
		if(date("Y")==$dat['year']){  
		  if(date("m")==$dat['mon']){
			if(date("d")==$dat['mday']){
				$dates=$dat['hours'].':'.$dat['minutes'];
			}
			else if(date("d")==($dat['mday']+1)){
				$dates='Hier';
			}else{
				$month = getMonth($dat['month']);
				$dates=$dat['mday'].' '.$month;
			}
		  }else{
		  	$month = getMonth($dat['month']);
			$dates=$dat['mday'].' '.$month;
		  }

		}else{
			$dates=$dat['mday'].' '.$dat['mon'].'/'.$dat['year'];
		}
		return $dates;
	}
?>