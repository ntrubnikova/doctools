// Localization

//--- Set variables for the script ---//
	
		// Turn localization on/off
		const localized = true;
		
		//Define the list of language codes (ISO 639-1, 2 chars) and their display names. Names of lan folders should be the same as language codes.
		const lans = {en:'English', ru: 'Русский'};
		
		//Define languages for each site section. Child sections act as overrides and must follow their parent sections. If a child section is not localized (while its parent is), leave the child's language list empty.
		const docsections = [
		
			{	section: '',
				lans: ['en', 'ru']},		

			{	section: '/section_two/',
				lans: []},
				
			{	section: '/section_two/page_four.html',
				lans: ['en', 'ru']}
				
			];


//--- End of set variables for the script ---//


	//Common script variables
	const url = window.location.href;
	let displayswitcher = false;


	//Check page language
	let lancode = window.location.href.match(/\/([a-z]{2})\//g);
	let pagelan;
	if (lancode) {
		lancode = lancode.map(s => s.slice(1,-1));
		pagelan = lancode[lancode.findIndex(v => Object.keys(lans).includes(v))];
	};

	
	//Check available languages for the page
	let sectionlans = [];
	docsections.forEach(element => {
		if (url.includes(pagelan + element.section)) {
			sectionlans = element.lans;	
		};
	});

	
	//Build html language selector
	let lanselector = '<select class="languages">\r\n';
	Object.entries(lans).forEach(([key, value]) => {
		if (key == pagelan && sectionlans.includes(key)) {
			lanselector += '<option value="' + key + '" selected disabled>' + value + '</option>\r\n';
			displayswitcher = true;
			}
		else if (sectionlans.includes(key)) {
			lanselector += '<option value="' + key + '">' + value + '</option>\r\n';
			}
	});
	lanselector += '</select>'

	//Insert the language selector to page code
	if (localized && displayswitcher) {
		$('.target').html(lanselector);
	};

	
	//Switch page to the selected language
	 $('.languages').on('change', function () {
		let newlan = $(this).val();
		let pageurl = $(location).attr('href');
		pageurl = pageurl.replace(pagelan + '/', newlan + '/');
		window.location.href = pageurl;
	});



//Clear cache for select

$(document).ready(function () {
    $("select").each(function () {
        $(this).val($(this).find('option[selected]').val());
    });
});

