function popupJS() {
	
//Lorsque vous cliquez sur un lien de la classe poplight et que le href commence par #
$('a.pop[href^=#]').click(function() {
	var popID = $(this).attr('rel'); //Trouver la pop-up correspondante
	var popURL = $(this).attr('href'); //Retrouver la largeur dans le href

	//Récupérer les variables depuis le lien
	var query= popURL.split('?');
	var dim= query[1].split('&amp;');
	var popWidth = dim[0].split('=')[1]; //La première valeur du lien
	if(popWidth==0){
		popWidth=0.65*(window.innerWidth);
	}else if(popWidth>(window.innerWidth)){
		popWidth=(window.innerWidth-50);
	}
	if( (window.innerWidth) <= 600){
		popWidth=(window.innerWidth-50);
		$('.popup_block').css({
		'height' : 0.95*(window.innerHeight)
		});
	}
	//Faire apparaitre la pop-up et ajouter le bouton de fermeture
	if(popID!="lecteurPDF" ){
		if( (window.innerWidth) <= 600){
			$('#' + popID).fadeIn().css({
				'width': Number(popWidth),
				'overflow': 'auto',
				'height': '95%'
			})
			.prepend('<a href="#" class="close"><img src="images/croix.gif" width="20" class="btn_close" title="Fermer" alt="Fermer" /></a>');
		}else{
			$('#' + popID).fadeIn().css({
				'width': Number(popWidth),
				'overflow': 'auto',
				'height': '80%'
			})
			.prepend('<a href="#" class="close"><img src="images/croix.gif" width="20" class="btn_close" title="Fermer" alt="Fermer" /></a>');
		}
	}else{
		$('#' + popID).fadeIn().css({
			'width': window.innerWidth,
			'overflow': 'auto',
			'height': window.innerHeight,
			'top' : '50%', 'left' : '51.7%',
			'float' : 'none' 
		});
		if(window.innerWidth <= 600){
			$('#' + popID).css({top : "50%", left :"47.7%", height : "100%", width : window.innerWidth+"px", float : "none", overflow : "auto"});
		}
		$('#pdf-arrow-left, #fadeC').live('click', function() { //Au clic sur le bouton ou sur le calque...
			$('#fadeC , .popup_block').fadeOut(function() {
				$('#fadeC, a.close').remove();  //...ils disparaissent ensemble
			});
		});

	}
	//Récupération du margin, qui permettra de centrer la fenêtre - on ajuste de 80px en conformité avec le CSS
	var popMargTop = ($('#' + popID).height() + 50) / 2;
	var popMargLeft = ($('#' + popID).width() + 80) / 2;

	//On affecte le margin
	if((window.innerWidth) > 600){
		$('#' + popID).css({
		'margin-top' : -popMargTop,
		'margin-left' : -popMargLeft
		});
	}else{
		$('#' + popID).css({
		'margin-top' : -popMargTop,
		'margin-left' : -(popMargLeft-25)
		});
	}

	//Effet fade-in du fond opaque
	$('body').append('<div id="fadeC"></div>'); //Ajout du fond opaque noir
	//Apparition du fond - .css({'filter' : 'alpha(opacity=80)'}) pour corriger les bogues de IE
	$('#fadeC').css({'filter' : 'alpha(opacity=80)'}).fadeIn();

	return false;
});

//Fermeture de la pop-up et du fond
$('a.close, #fadeC, #fadeN').live('click', function() { //Au clic sur le bouton ou sur le calque...
		$('#fadeC , .popup_block').fadeOut(function() {
			$('#fadeN').live('click', notification);
			$('#fadeC, a.close, #fadeN').remove();  //...ils disparaissent ensemble
		});
		return false;
	});
	$('#subm').live('click', function() {
		setTimeout(function (){
				$('#fadeC , .popup_block').fadeOut(function() {
				$('#fadeC, a.close').remove();  //...ils disparaissent ensemble
			});
			return false;
		}, 0500);
	});
	function closePopup(){
		$('#fadeC , .popup_block').fadeOut(function() {
			$('#fadeC, a.close').remove();  //...ils disparaissent ensemble
		});
	}
}
popupJS();
