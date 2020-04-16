//Set file name

var file = "file.xml";

//Display API entry details from Doxygen XML output

$(document).ready(function () {
    $.ajax({
        type: "GET",
        url: file,
        dataType: "xml",
        success: xmlParser
    });
});

var i = 0;

function xmlParser(xml) {

	$(".main").append($(xml).find("compoundname").text());
	
    $(xml).find("memberdef[kind='function']").each(function () {
		
		i += 1;
		
		//Title
		$(".main").append('<div class="title">' + i + '. ' + $(this).find("name").text() + '</div>' 
		//+ '<div class="funcid"><p class="subheading">ID</p>' + $(this).attr('id') + '</div>'
		
		//Function
		+ '<div class="definition"><p class="subheading">Function</p>' + $(this).find("definition").text()
		+ $(this).find("argsstring").text() + ';</div>'
		
		//Descriptions
		+ '<div class="briefdescription"><p class="subheading">Brief description</p>' + $(this).find("briefdescription").text() + '</div>'
		+ '<div class="detaileddescription"><p class="subheading">Detailed description</p>' + $(this).find("detaileddescription > para").prevUntil("parameterlist").text() + '</div>' //can end with .addBack("para:first").text() 


		//Parameters
		+ '<div class="parameters"><p class="subheading">Parameters</p>'
		);
				
		$(this).find("parameterlist > parameteritem").each(function() {
			$(".main").append(
			$(this).find("parametername").text() + '&nbsp; &nbsp;'
			+ $(this).find("parametername").attr('direction') + '&nbsp; &nbsp;'
			+ $(this).find("parameterdescription").text() + '<br/>'			
			);
			});
		$(".main").append('</div>');
		
		//Return
		$(".main").append('<div class="return"><p class="subheading">Return</p>');
		$(".main").append($(this).find("simplesect[kind='return'] > para").clone().children().remove("itemizedlist").end().get(0));
		$(".main").append('<br/>');
		
		
		
		$(this).find("simplesect[kind='return'] > para > itemizedlist > listitem").each(function() {
			$(".main").append(
				$(this).find("para").text() + '</br>'
			);
		});
		$(".main").append('<br/>');
		$(".main").append($(this).find("detaileddescription > para").clone().children().remove("simplesect,parameterlist").end().get(-1));
		$(".main").append('</div>');
		

		//Display
        $(".book").fadeIn(1000);

    });

}