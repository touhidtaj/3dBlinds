$(function(){
	if(!flux.browser.supportsTransitions)
		alert("Flux Slider requires a browser that supports CSS3 transitions");
		window.myFlux = new flux.slider('#slider', { transitions: [ 'blinds3d' ]
	});
});





