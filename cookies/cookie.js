//Set variables

var enableCookieConsent = true;
var cookieURL = "";
var cookieText = '<p>Cookie text with the link to the <a href="' + cookieURL + '">cookie policy</a> page</p>';


//Show cookie consent message

$( document ).ready(function() {
	
	if (enableCookieConsent) {
		
		$('.footer > .container').append('&nbsp; <a href="' + cookieURL + '">Cookie Policy</a>');

		$('.footer').before('' + 
		'<div class="cookies fade-out">' + 
			'<div class="cookies-text">' +
				cookieText + 
			'</div>' +
			'<div class="cookies-btn">' +
				'<button class="cookies-close">I understand</button>' +
			'</div>' +
			'</div>');

		function showCookies() {
			if (localStorage.getItem('showCookieConsent') != 'false') {
				$('.cookies').removeClass('fade-out');
			};

			$('.cookies-close').click(function() {
				$('.cookies').addClass('fade-out');
				localStorage.setItem('showCookieConsent','false');
			});
			
		};
		
		setTimeout(showCookies, 750);
	
	};
	
});