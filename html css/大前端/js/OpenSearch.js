var i=true;
function OpenCloseSearchDiv(){
	if (i) {
		document.getElementById("nav_search").style.height=("150px");
	}
	else {
		document.getElementById("nav_search").style.height=("0px");
	}
	
	i=!i;
}