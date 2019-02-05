/*	functions.js
	© by Daniel SAKOU
*/
var idD = 0, maxID = 0, tabs, list_chats_ul, list_chats, msg_area, oldASide = "", endIdCount2nd = 0, article_head, article_form,
	__NO_CHAT = '<p id="no_chat">No chat</p>',
	__NO_MSG = '<p id="no_chat">No message</p>';

function getErequete(request){
	var result = request;
	if(result==null){
		if(window.XMLHttpRequest){
			result=new XMLHttpRequest();
		}else if(window.ActiveXObject){
			result=new ActiveXObject("Microsoft.XMLHTTP");
		}
	}
	return result;
}

function getChats(){
	var actReq;
	actReq = getErequete(actReq);
	if(actReq != null){
		var body = "op=0";
		try{
			actReq.open('POST', 'get.php', true);
			actReq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			actReq.onreadystatechange = function (){
				if(actReq.readyState == 4 && actReq.status == 200){
					var div = actReq.responseText;
					list_chats = document.querySelector("#list_chats");
					list_chats_ul = document.querySelector("#list_chats_ul");
					if(div != "" && div != oldASide){
						list_chats_ul.innerHTML = div;
						oldASide = div;
					}else if(div == ""){
						list_chats_ul.innerHTML = __NO_CHAT;
					}
				}
			};
			actReq.send(body);
		}catch(e){}
	}
}
getChats();
setInterval(getChats, 2000);

function chat(id, other, other_img, max){
	idD = id; maxID = max;

	//alert(other_img);
	article_head = document.querySelector("#article_head");
	article_form = document.querySelector("#send_form");
	//alert(article_head);
	var head = '<img src="Profil/'+other_img+'" width="50" id="user_img_article"/> <font id="user_article">'+other+'</font></br><font id="last_seen"></font>',
		form = '<form action="javascript:send('+id+');" id="formSend"><input type="text" id="msg" placeholder="Type a message"/><button type="submit" id="submit"><i class="fa fa-send-o" id="subGlyph" style="font-size:32px;"></i></button>';
	article_head.innerHTML = head;
	article_form.innerHTML = form;

	//alert(document.querySelector("#default_article"));
	document.querySelector("#default_article").style.display = "none";
	document.querySelector("#UlmsgList").innerHTML = "";
	document.querySelector("#article").style.display = "block";
	getMessage(id, 0, 50);
	setTimeout(function(){
		var msgInput = document.querySelector("#msg");
		msgInput.focus();
		msgInput.onkeyup = function (){
			var iValue = this.value, btn = document.querySelector("#subGlyph");
			if(iValue != ""){
				this.style.border = "1px solid green";
				btn.className = "fa fa-send";
			}else{
				this.style.border = "1px solid rgba(200,200,200,1)";
				btn.className = "fa fa-send-o";
			}
		};
	}, 1000);
	// positionnement intélligent
	setInterval(function(){
		var mineG=document.querySelectorAll("#mineG"),
		minenG=document.querySelectorAll("#minenG"),
		//bvb=document.querySelectorAll("#bvb"),
		mArea=document.querySelector("#MesArea").offsetWidth;
		for(var i=0; i<mineG.length; i++){
			var marg=mArea-(mineG[i].offsetWidth+64.1);
			mineG[i].style.marginLeft=marg+"px";
		}
		/*for(var j=0; j<bvb.length; j++){
			var margB=40-2*(minenG[j].offsetHeight);
			bvb[j].style.marginTop=margB+"px";
		}*/
	}, 0010);
}

setTimeout(function (){
	$("#MesArea").scroll(function(){
		var scrolM = document.querySelector("#MesArea");
		//alert(scrolM);
		var scrollH = scrolM.scrollTop, toId = endTabId[endTabId.length-1], moins20 = toId-20;
		if(scrollH == 0 && toId > 0){
			if(toId < 20)
				moins20 = 0;
			$("#waitingForOldMessages").show();
			getMessage(idD, moins20, toId - moins20);
			endTabId.push(moins20);
		}
	});
}, 1000);

function getMessage(id, deb, end){
	var actReq;
	actReq = getErequete(actReq);
	if(actReq != null){
		var body = "op=1&id="+id+"&deb="+deb+"&end="+end;
		try{
			actReq.open('POST', 'get.php', true);
			actReq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			actReq.onreadystatechange = function (){
				if(actReq.readyState == 4 && actReq.status == 200){
					var div = actReq.responseText;
					msg_area = document.querySelector("#UlmsgList");
					if(div != ""){
						$("#waitingForMessages").hide();
						$("#waitingForOldMessages").hide();
			
						updateMsgView(div);
					}else{
						msg_area.innerHTML = __NO_MSG;
					}
				}
			};
			actReq.send(body);
		}catch(e){}
	}
}

function updateMsgView(msg){
	if(msg!=""){
		//playBeep(0);
		var scrolM=document.querySelector("#MesArea");
		var tempH = scrolM.scrollHeight;
		uls=document.getElementById("UlmsgList");
		var div=document.createElement('div');
		div.id="affMs";
		uls.insertBefore(div, uls.childNodes[1]);
		document.getElementById("affMs").innerHTML=msg;
		
		setWidth();
		if(endIdCount2nd == 0){
			scrolM.scrollTop=scrolM.scrollHeight;
			endIdCount2nd++;
		}else{
			scrolM.scrollTop = (scrolM.scrollHeight - tempH);
		}
	}			
}

function searchChat(){
	var value = document.getElementById("search").value;
	//alert(value);
	if(value != ""){
		var actReq;
		actReq = getErequete(actReq);
		if(actReq != null){
			var body = "op=2&value="+value;
			try{
				actReq.open('POST', 'get.php', true);
				actReq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
				actReq.onreadystatechange = function (){
					if(actReq.readyState == 4 && actReq.status == 200){
						var div = actReq.responseText, tab = div.split(';');
						if(div != ""){
							//alert(div);
							chat(tab[0], tab[1], tab[2], tab[3]);
							//window.location.reload();
						}
					}
				};
				actReq.send(body);
			}catch(e){}
		}
	}
}

window.onload = function(){
	// margin of work page
	var section = document.querySelector('section'), __WINDOW_WIDTH = window.innerWidth,
	__WINDOW_HEIGHT = window.innerHeight,
	margW = (__WINDOW_WIDTH - section.offsetWidth)/2,
	margH = (__WINDOW_HEIGHT - section.offsetHeight)/2;
	section.style.marginTop = margH+"px";
	section.style.marginLeft = margW+"px";


	var sug=document.querySelectorAll(".sug"),
		motsClefs=new Array();

	for(var k = 0; k < sug.length; k++){
		motsClefs[k] = sug[k].innerHTML;
	}
	//alert(sug[0]);

	var form = document.getElementById("auto-suggest");
	var rec = document.getElementById("search");
	var input = form.search;
	var list = document.createElement("ul");
	list.className = "suggestions";
	list.style.display = "none";

	form.insertBefore(list, rec);

	input.onkeyup = function(){
		var txt = this.value;
		if(!txt){
			list.style.display = "none";
			$('.btnX').css({background : "rgba(210,210,210,0)"});
			return;
		}
		$('.btnX').css({background : "rgba(210,210,210,0.6)"});
		var suggestions = 0;
		var frag = document.createDocumentFragment();
		
		for(var i = 0, c = motsClefs.length; i < c; i++){
			if(new RegExp("^"+txt,"i").test(motsClefs[i])){
				var word = document.createElement("li");
				frag.appendChild(word);
				word.innerHTML = motsClefs[i].replace(new RegExp("^("+txt+")","i"),"<font style=\"color:rgb(42,16,140);\"><strong>$1</strong></font>");
				word.mot = motsClefs[i];
				word.onmousedown = function(){					
					input.focus();
					input.value = this.mot;
					list.style.display = "none";
					return false;
				};				
				suggestions++;
			}
		}

		if(suggestions){
			list.innerHTML = "";
			list.appendChild(frag);
			list.style.display = "block";
		}
		else {
			list.style.display = "none";			
		}
	};
	input.onblur = function(){
		list.style.display = "none";
		if(this.value=="")
			this.value = "";
			ac.style.display="none";
	};
}
// menu user
var show_menu = true, menu_ico = document.querySelector("#menu_ico"),
	menu_user = document.querySelector("#menu_user");
function menu(){
	if(show_menu == true){
		menu_ico.style.background = "rgba(150,150,150,0.3)";
		menu_user.style.display = "block";
		show_menu = false;
	}else{
		menu_ico.style.background = "rgba(150,150,150,0)";
		menu_user.style.display = "none";
		show_menu = true;
	}
}

// function send message
function send(id){
	var actReq, msgInput = document.querySelector("#msg");
	actReq = getErequete(actReq);
	if(actReq != null){
		var iValue = msgInput.value, btn = document.querySelector("#subGlyph");
		var dat=new Date();
		var myDate = StringiFy(dat);
		if(iValue != ""){
			var body = "op=0&msg="+encodeURIComponent(iValue)+"&id="+id;
			var li = '<li id="li" ondblclick="option('+(maxID+1)+');"><div id="mineG"><p style=""><span id="msgA">'+iValue+'</span><p style="text-align:left;color:gray;" id="msgd"> '+myDate+'</p><div id="load" class="load'+maxID+'" style="display:none;"><img id="editableimage2" height="20px" src="load.gif" border="0"/></div></div><span id="bulleMsg"></span></li>';
			var cod=document.getElementById("UlmsgList");
			//alert(cod);
			cod.innerHTML+=li;
			maxID++;
			try{
				actReq.open('POST', 'send.php', true);
				actReq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
				actReq.onreadystatechange = function (){
					if(actReq.readyState == 4 && actReq.status == 200){
						var div = actReq.responseText;
						//alert(div);
					}
				};
				actReq.send(body);
				msgInput.value = "";
				setTimeout(function(){
					var scrolM=document.querySelector("#MesArea");
					scrolM.scrollTop=scrolM.scrollHeight;
					setWidth();
				}, 200);
			}catch(e){}
		}
	}
}

function sendPeriod(){
	var requete1;
	requete1=getErequete(requete1);
	if(requete1 != null){
		//alert(maxID);
		var bod = "op=1&id="+idD+"&maxID="+maxID;
		try{
			requete1.open("POST", "send.php", true);
			requete1.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			requete1.onreadystatechange = function(){
				if(requete1.readyState == 4 && requete1.status == 200){
					newSetMes(requete1.responseText);
				}
			};
			requete1.send(bod);
			
		}catch(exc){
			
		}
	}else{
		setMessage("Impossible de se connecter au serveur PeriodiQ");
	}
}
setInterval(sendPeriod, 1000);

function newSetMes(msg){
	if(msg!=""){
		//playBeep(0);
		setTimeout(function(){
			var scrolM=document.querySelector("#MesArea");
			scrolM.scrollTop=scrolM.scrollHeight;
			setWidth();
		}, 200);
		var cod=document.getElementById("UlmsgList");
		cod.innerHTML+=msg;
		maxID++;
	}
			
}

function StringiFy(dates){
	var result = "", min = dates.getMinutes(), hou = dates.getHours();
	if(hou < 10){
		result += "0"+hou; 
	}else{
		result += hou;
	}
	if(min < 10){
		result += ":0"+min; 
	}else{
		result += ":"+min;
	}
	return result;
}

// puissance : pour la largeur automatique des messages
function setWidth(){
	var msgA=document.querySelectorAll("#msgA"),
	msgRc=document.querySelectorAll(".msgRc");
	var mineG=document.querySelectorAll("#mineG"),
		minenG=document.querySelectorAll("#minenG");
	for(var i=0; i<msgA.length; i++){
		var length=msgA[i].innerHTML.length;
		if(length<60 && length>=10){
			mineG[i].style.minWidth=(8.5*length)+"px";
			//alert(8.5*length);
		}
		else if(length>=60){
			mineG[i].style.minWidth="75%";	
		}else{
			mineG[i].style.minWidth="100px";
		}
	}
	for(var j=0; j<msgRc.length; j++){
		var leng=msgRc[j].innerHTML.length;
		//alert(minenG[j].offsetHeight-50);
		//document.querySelectorAll("#bulleMsg2")[j].style.marginTop="-"+(minenG[j].offsetHeight-50)+"px";
		if(leng<60 && leng>=10){
			minenG[j].style.minWidth=(8.5*leng)+"px";
			//alert(8.5*length);
		}
		else if(leng>=60){
			minenG[j].style.minWidth="75%";	
		}else{
			minenG[j].style.minWidth="100px";
		}
	}
}
setWidth();


