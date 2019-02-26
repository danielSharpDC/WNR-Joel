/*	popupDC.js
	©DataCenter Corporation - 2019 by Ntantame, Takongmo & Zeroloader
*/
var sauvMoi = "", __FZ = 150;
function PopupDC(elem){
	this.Wo = 300;	// initial width of the popup
	this.Ho = 200;	// initial height of the popup
	this.Xo = (window.innerWidth - this.Wo)/2;	/* initial x of the popup : we get the width of window that
											 we subtract from the width of the popup, all divided by 2*/
	this.Yo = (window.innerHeight - this.Ho)/2;
	this._T = 0;	// duration of the animation
	this.X = 0; this.Y = 0;	// final coordinate of the popup
	this.W = 600; this.H = 350;	// final dimensions of the popup
	this._Alpha = 10; this._Beta = 0;  // 
	this._To = 0; this._N = 10; this.n = 1;
	this._Element = null;

	// function that checks if a value is numeric
	this.isNumeric = function (value){
		var temp = parseFloat(value);
		if(temp != null && temp != 0)
			return true;
		else return false;
	};
	// function to initialize some constants
	this.initialization = function (duration, width, height){
		if(elem != null)
			this._Element = $(elem); // content html of popup
		else alert("Error : element must not be null");

		if(this.isNumeric(duration))
			this._T = parseFloat(duration);
		else this._T = 0.75; // default duration
		if(this.isNumeric(width) && this.isNumeric(height)){
			this.W = width;
			this.H = height;
		}
		this._Alpha = parseInt((this.W - this.Wo)/this._N);
		this._Beta = parseInt((this.H - this.Ho)/this._N);
		this._To = this._T/this._N;
		// positionning the popup at center of the window
		
		this._Element.css({
			'width' : this.Wo + "px",
			'height' : this.Ho + "px",
			'left' : this.Xo + "px",
			'top' : this.Yo + "px",
			'opacity' : 0
		}).prepend('<a href="#" class="close"><i class="fa fa-cross" style="font-size:15px; color:black;" width="20" id="btn_close" title="Fermer" alt="Fermer" ></i></a>');

		$('#close_popupDC').click(function (){
			this._Element.hide();
		});
	};
	// function that shows the popup
	this.Show = function (){
		$('body').append('<div id="fadeC"></div>'); 
		$('#fadeC').css({'filter' : 'alpha(opacity=80)'}).fadeIn();
		workerDC(this._Element, this.n, this._N, this.Wo, this.Ho, this.Wo, this.W, this._To, this._Alpha, this._Beta);
		this._Element.show();
	};
	// function init for better popup
	this.initDC = function (duration, width, height, eX, eY, wo, ho){
		if(elem != null)
			this._Element = $(elem); // content html of popup
		else alert("Error : element must not be null");

		this.Wo = wo; this.Ho = ho;
		this.Xo = eX; this.Yo = eY;
		if(this.isNumeric(duration))
			this._T = parseFloat(duration);
		else this._T = 15; // default duration

		if(this.isNumeric(width) && this.isNumeric(height)){
			this.W = width;
			this.H = height;
		}
		this._Alpha = parseInt((this.W - this.Wo)/this._N);
		this._Beta = parseInt((this.H - this.Ho)/this._N);
		this._To = this._T/this._N;
		// positionning the popup at the user click position
		this._Element.css({
			'width' : this.Wo + "px",
			'height' : this.Ho + "px",
			'left' : this.Xo + "px",
			'top' : this.Yo + "px",
			'opacity' : 0
		}).prepend('<a href="#" class="close"><i class="DGfi-cross" style="font-size:15px; color:black;" width="20" id="btn_close" title="Fermer" alt="Fermer" ></i></a>');
		this._Element.show();
		$('#close_popupDC').click(function (){
			this._Element.hide();
		});
		//alert(this._To);
		this.ShowDC();
	};
	// function that shows the better popup
	this.ShowDC = function (){
		$('body').append('<div id="fadeC"></div>'); 
		$('#fadeC').css({'filter' : 'alpha(opacity=80)'}).fadeIn();
		worker2DC(this._Element, this.n, this._N, this.Wo, this.Ho, this.Wo, this.W, this._To, this._Alpha, this._Beta, this.Xo, this.Yo);
		this._Element.show();
	};
}
var text = "";
// periodic function that works
function workerDC(elemt, n, _N, Wo, Ho, W, Wmax, To, alpha, beta){
	var Xn = 0, Yn = 0, Wn = 0, Hn = 0, _Window_W = window.innerWidth, _Window_H = window.innerHeight;
	if(n <= _N){
		Wn = Wo + n*alpha;	// popup width at an instant t
		Hn = Ho + n*beta;	// popup height at an instant t
		Xn = (_Window_W - Wn)/2;	// popup x at an instant t
		Yn = (_Window_H - Hn)/2;	// popup y at an instant t
		
		elemt.css({
			'width' : Wn + "px",
			'height' : Hn + "px",
			'left' : Xn + "px",
			'top' : Yn + "px",
			'opacity' : n/_N,
			'font-size' : n * __FZ/_N + "%"
		});
		setTimeout(workerDC, To, elemt, n+1, _N, Wo, Ho, Wn, Wmax, To, alpha, beta);
	}else{
		$('#close_popupDC, #fadeC, a.close').live('click', function (){
			dismissPopup(elemt, To, Ho + n*beta, Wmax, alpha, beta, _N);
		});
		return 0;
	}
}
// 2nd periodic function that works
function worker2DC(elemt, n, _N, Wo, Ho, W, Wmax, To, alpha, beta, Xo, Yo){
	var Xn = 0, Yn = 0, Wn = 0, Hn = 0, _Window_W = window.innerWidth, _Window_H = window.innerHeight;
	if(n <= _N){
		Wn = Wo + n*alpha;	// popup width at an instant t
		Hn = Ho + n*beta;	// popup height at an instant t
		Xn = n*((_Window_W - Wn - 2*Xo)/2)/_N + Xo;	// popup x at an instant t
		Yn = n*((_Window_H - Hn - 2*Yo)/2)/_N + Yo;	// popup y at an instant t
		//alert(To);
		//alert(Xn+", "+Yn+"\n"+Wn+", "+Hn+"\n\n"+elemt.height());
		elemt.css({
			'width' : Wn + "px",
			'height' : Hn + "px",
			'left' : Xn + "px",
			'top' : Yn + "px",
			'opacity' : n/_N,
			'font-size' : n * __FZ/_N + "%"
		});
		setTimeout(worker2DC, To, elemt, n+1, _N, Wo, Ho, Wn, Wmax, To, alpha, beta, Xo, Yo);
	}else{
		$('#close_popupDC, #fadeC, a.close').live('click', function (){
			dismissPopupDC(elemt, To, Ho + n*beta, Wmax, alpha, beta, _N, Xo, Yo);
		});
		return 0;
	}
}

function dismisserDC(elemt, n, _N, Hmax, Wmax, To, alpha, beta){
	var Xn = 0, Yn = 0, Wn = 0, Hn = 0, _Window_W = window.innerWidth,
		_Window_H = window.innerHeight;
	if(n <= _N){
		Wn = Wmax - n*alpha;	// popup width at an instant t
		Hn = Hmax - n*beta;	// popup height at an instant t
		Xn = (_Window_W - Wn)/2;	// popup x at an instant t
		Yn = (_Window_H - Hn)/2;	// popup y at an instant t
		
		elemt.css({
			'width' : Wn + "px",
			'height' : Hn + "px",
			'left' : Xn + "px",
			'top' : Yn + "px",
			'opacity' : (1.5 - n/_N),
			'font-size' : "100%"
		});

		setTimeout(dismisserDC, To, elemt, n+1, _N, Hmax, Wmax, To, alpha, beta);
	}else{
		elemt.hide();
		$('#fadeC').fadeOut(function() {
			$('#fadeC').remove(); 
		});
		return 0;
	}
}

function dismisserPopupDC(elemt, n, _N, Hmax, Wmax, To, alpha, beta, Xo, Yo){
	var Xn = 0, Yn = 0, Wn = 0, Hn = 0, _Window_W = window.innerWidth,
		_Window_H = window.innerHeight;
	if(n <= _N){
		Wn = Wmax - n*alpha;	// popup width at an instant t
		Hn = Hmax - n*beta;	// popup height at an instant t
		Xn = n*(Xo + (Wmax - _Window_W)/2)/_N - (Wmax - _Window_W)/2;	// popup x at an instant t
		Yn = n*(Yo + (Hmax - _Window_H)/2)/_N - (Hmax - _Window_H)/2;	// popup y at an instant t
		
		elemt.css({
			'width' : Wn + "px",
			'height' : Hn + "px",
			'left' : Xn + "px",
			'top' : Yn + "px",
			'opacity' : (1.5 - n/_N),
			'font-size' : "100%"
		});
		setTimeout(dismisserPopupDC, To+50, elemt, n+1, _N, Hmax, Wmax, To, alpha, beta, Xo, Yo);
	}else{
		elemt.hide();
		$('#fadeC').fadeOut(function() {
			$('#fadeC').remove(); 
		});
		return 0;
	}
}

function dismissPopup(elt, T, Hm, Wm, a, b, N){
	dismisserDC(elt, 1, N, Hm, Wm, T, a, b);
}
function dismissPopupDC(elt, T, Hm, Wm, a, b, N, Xo, Yo){
	dismisserPopupDC(elt, 1, N, Hm, Wm, T, a, b, Xo, Yo);
}
function popupComplex(id, id_, time_, w_, h_){
	var popup = new PopupDC(id);
	$(id_).click(function(e){
		var pTop = getParent(this, $('body').get(0)).scrollTop;
		var ey_ = this.offsetTop - pTop;
		popup.initDC(time_, w_, h_, this.offsetLeft, ey_, this.offsetWidth, this.offsetHeight);
	});
}
function getParent(child, parent){
	var temp = child.parentNode;
	//alert(temp);
	if(temp == parent) return temp;
	else return getParent(temp, parent);
}

