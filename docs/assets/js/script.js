/*****************
 writes company info from json object to document
 ******************/
console.log('alive');
$(function(){
	console.log('domready');
	$("#button1").on("click", requestCompany1);
	$("#button2").on("click", requestCompany2);
	dropDownList();
	blurFocus(1);
	blurFocus(2);
});

function dropDownList (evt) {
	console.log("dropdownfired");
	var companyArray = [];
	$.ajax({
		//url : 'http://api.crunchbase.com/v/1/companies.js', 
		//url: 'companyarray.txt',
		url: 'assets/data/companyList.js',
		dataType: 'json',
		success: function(data) {
			console.log('dropdownsuccess');
			nameList = []
			
			
			/*for (i = 0; i < data.length; i++) {
				companyName = data[i]["name"];
				//console.log(data[i]["name"])
				nameList[i] = companyName;
			}
			
			console.log(data.length);
			console.log(nameList);
			*/
			$('#company1Input').data('source', data);
			
			$('#company2Input').data('source', data);
		}
	});
}

function requestCompany1 (evt) {
	console.log("company 1 request fired");
	var company1 = $('#company1Input').val()
	fixedName1 = queryFixing(company1);
	
	var url1 = 'http://api.crunchbase.com/v/1/company/' + fixedName1 + '.js?callback=?';
	console.log(url1);
	$.ajax({
		url : url1,
		dataType: 'json',
		data: company1,
		error: function() {
			window.alert("Sorry! Company not found");
		},
		success: function(data) {
			clearTable(1);
			
			propertyTable(data, 1);	
			
			importantPeople($("#founders1"), data);
			
			imageGrab(data, 1);
			
			hyperLinked(data, 1, 'blog_url');
			hyperLinked(data, 1, 'twitter_username');
			hyperLinked(data, 1, 'homepage_url');
			
			stillFighting(data, 1);
			
			investorList(data, 1);
			//not working see below
			//TCposts(1, data['name']);
			
			return false;
			}
		});
};



function requestCompany2 (evt) {
	console.log("request2fired")
	var company2 = $('#company2Input').val();
	var fixedName2 = queryFixing(company2);
	
	var url2 = 'http://api.crunchbase.com/v/1/company/' + fixedName2 + '.js?callback=?';
	console.log(company2);
	$.ajax({
		url : url2,
		dataType: 'json',
		data: company2,
		error: function() {
			window.alert("Sorry! Company not found");
		},
		success: function(data) {
			clearTable(2);
			console.log(url2);

			propertyTable(data, 2);
			
			hyperLinked(data, 2, 'blog_url');
			hyperLinked(data, 2, 'twitter_username');
			hyperLinked(data, 2, 'homepage_url');
			
			//Access-Control-Allow-Origin error on api call
			//TCposts(2, data['name']);
			
			importantPeople($('#founders2'), data);
			
			imageGrab(data, 2);
			
			stillFighting(data, 2);
			
			investorList(data, 2);
			return false;
		}
		});
}

//Clearing the table first
var clearTable = function (num) {
	var tableRows = $('tr');
	var tableData = $('tr > td');
	$.each(tableData, function(a, val) {
		if (tableData.index(val) % 3 == 0) {
			console.log('not changing');
		}
		else if (tableData.index(val) % 3 == num){
			console.log(val);
			$(val).text('');
		}
	});
}
//ADDING THE GENERAL PROPERTIES TO THE TABLE-- EXCEPTIONS DONE BELOW
var propertyTable = function(data, num) {
	//creating the companyName and img divs
	$($('tr > td')[num]).html('<img id="logo' + num + '"><div class="companyName" id="companyName' + num + '" ></div>')
	console.log($('tr > td')[num]);
	//adding company name and css class for styling on it
	var companyName = $($(".companyName:nth-child(2)").get(num - 1));
	$(companyName)
		.html(data["name"])
		.addClass('companyName');
	console.log($(".companyName:nth-child(2)").get(num - 1));
	console.log(companyName);
	if(companyName.length > 10) {
		console.log("greater than 10!")
		companyName.attr("font-size", 30);
	}
	else if (companyName.length <= 10) {
		console.log("less than 10!")
		companyName.attr("font-size", 40);
	}
	console.log(companyName.attr("font-size"));
	
	//general properties in table -- exceptions are dont seperately
	var propertyList = ["number_of_employees", "founded_year", "tag_list",
						     "overview", "total_money_raised"];
	for (i = 0; i < propertyList.length; i++) {
		$($("tr[data-key='" + propertyList[i] + "'] td").get(num)).html(data[propertyList[i]]);
		//console.log(propertyList[i])
		//console.log($("tr[data-key='" + propertyList[i] + "'] td").get(1));
		}
		
		
				
}

//MAKING QUERY LOWERCASE AND HAVE "-" INSTEAD OF SPACES IN MULTI-WORD QUERIES
var queryFixing = function (string) {
	string = string.toLowerCase();
	var letterArray = string.split('');
	console.log(letterArray);

	//fixing multi-word queries so spaces are replaced with "-"
	var spacePos = letterArray.indexOf(' ');
	console.log(spacePos);
	letterArray[spacePos] = '-';
	console.log(letterArray);
	
	var fixedName2 = letterArray.join('');
	console.log(fixedName2);
	return fixedName2
}

//CREATING A LIST OF UP TO THE FIRST 6 PEOPLE LISTED
var importantPeople = function (div, data) {
	var founderArray = [];
	i = 0;
	console.log(data);
	for (person in data['relationships']) {
		if (i > 6) {
			break
		}
		
		var firstName = data['relationships'][person]['person']['first_name'];
		var lastName = data['relationships'][person]['person']['last_name'];
		founderArray[person] = firstName + " " + lastName;
	
		
		arrayToStr = founderArray.join(", ");
		i++;
	}
	console.log(arrayToStr);
	div.text(arrayToStr);
}

var hyperLinked = function (data, num, dataSection) {
	if (dataSection == 'twitter_username') {
		$($("tr[data-key='" + dataSection + "'] td").get(num)).html("<a href='www.twitter.com/" + data[dataSection] + "'>" + data[dataSection] + "</a>");
	}
	else if (dataSection == 'blog_url') {
		$($("tr[data-key='" + dataSection + "'] td").get(num)).html("<a href='" + data[dataSection] + "'>" + data[dataSection] + "</a>");
	}
	else if (dataSection == 'homepage_url') {
		$($("tr[data-key='" + dataSection + "'] td").get(num)).html('<a href="' + data[dataSection] + '">' + data[dataSection] + '</a>');
	}
	
}
var imageGrab = function (data, num) {
	
	if (data["image"] != null) {
		var imageExtension = data["image"]["available_sizes"][0][1];
		var logoURL = 'http://www.crunchbase.com/' + imageExtension;
		console.log(imageExtension);
		console.log(logoURL);
	
		$('#logo' + num).attr('src', logoURL);
		$('#logo' + num).attr('class','oneLineLogo');
	
		console.log($('#logo1'));
	}
	else {
		$('#logo' + num).attr('src', '');
		console.log("no image found");
	}
}

//Access-Control-Allow-Origin error on api call
var TCposts = function (num, company) {
	console.log('tcpost function fired');
	$.ajax({
		url: 'http://api.crunchbase.com/v/1/companies/posts?name=' + company,
		//data: company, -- doesnt work because it appends &company instead of just company
		dataType: JSON,
		success: function (data) {
			console.log(url);
			$('#posts' + num).text(data['num_posts']);
			console.log(data['num_posts']);
			console.log('#posts' + num);
		}
	})
}

var stillFighting = function(data, num) {
	var deadYear = data["deadpooled_year"]
	console.log(deadYear);
	if (deadYear != null) {
		$($("tr[data-key='deadpooled_year'] td").get(num)).html('RIP ' + data["name"] + ': ' + deadYear);
		console.log('dead comp fire');
	}
	else {
		$($("tr[data-key='deadpooled_year'] td").get(num)).html('Still fighting!');
	}
	console.log($("tr[data-key='deadpooled_year'] td").get(num))
}

var investorList = function(data, num) {
	var fundingRounds = data["funding_rounds"];
	console.log(fundingRounds);
	console.log("here");
	var finalInvestorArr = [];
	console.log(fundingRounds.length);
	i = 0;
	
	//for (x=0; x < fundingRounds.length; x++) {
	//	tempRound = data["funding_rounds"][x]["investments"];
	//	if (tempRound) {
	//		if (tempRound["company"]==null) {
	//			break
	//		}
	//	}
	//}
	
	for (x=0; x < fundingRounds.length; x++) {
		if (data["funding_rounds"][x]) {
			var investments = data["funding_rounds"][x]["investments"];
		}
		else {
			break
		}
		var round = data["funding_rounds"][x];
		console.log('round ' + x);
		for (y=0; y < investments.length; y++) {
			
			
		
			var angelObject = round["investments"][y]["person"];
			if (angelObject != null) {
				console.log("angel fired");
				var angel = angelObject["first_name"] + " " + angelObject["last_name"];
				if ($.inArray(angel, finalInvestorArr)) {
					finalInvestorArr[i] = angel;
				}
			}
			
			var financialOrgObject = round["investments"][y]["financial_org"];
			if (financialOrgObject != null) {
				console.log("financial_org fired");
				var financialOrg = financialOrgObject["name"]
				if ($.inArray(financialOrg, finalInvestorArr)) {
					finalInvestorArr[i] = financialOrg;
				}
			}
			
			var companyObject = round['investments'][y]["company"];
			if (companyObject != null) {
				console.log('company fired');
				var company = companyObject["name"];
				if ($.inArray(financialOrg, finalInvestorArr)) {
					finalInvestorArr[i] = company;
				}
			}
                        
                        i = i + 1
		}
	}
	console.log(finalInvestorArr); //array
	
	function eliminateDuplicates (an_array) {
		var i, len = an_array.length, refinedList = [], obj = {};

		for (i = 0; i < len; i++) {
			obj[an_array[i]]=0;
		}
		for (i in obj) {
			refinedList.push(i);
		}
		return refinedList;
	}
	var arrMinusDuplicates = eliminateDuplicates(finalInvestorArr);
	var finalInvestorStr = arrMinusDuplicates.join(', ');
	console.log(arrMinusDuplicates);
	
//	finalInvestorStr = String(the_list);
	$($("tr[data-key='funding_rounds'] td").get(num)).html(finalInvestorStr);
	
	matchingInvestors(data, num, arrMinusDuplicates);
	
}

var matchingInvestors = function(data, num, arrMinusDuplicates) {
	console.log("attempting to match investors");
	if (num == 1) {
		var temp = 2;
	}
	else if (num == 2) {
		var temp = 1;
	}
	
	var otherList = $($("tr[data-key='funding_rounds'] td").get(temp)).html();
	console.log(otherList); //string
	
	var splitOtherList = otherList.split(', ');
	console.log(splitOtherList); // array
	console.log(arrMinusDuplicates);
	
	var sStr = $($("tr[data-key='funding_rounds'] td").get(num)).html();
	var sStr2 = $($("tr[data-key='funding_rounds'] td").get(temp)).text();
	
	var matchingArr = [];
	
	//arrMinusDuplicate = array of investors in the requested column
	//splitOtherList = array of investors in the other column-- function should break if this doesn't exist
	
	$.each(arrMinusDuplicates, function(a, val) {
		if ($.inArray(val, splitOtherList) != -1) {
			console.log(val);
			console.log($.inArray(val, splitOtherList))
			console.log('matched');
			matchingArr.push(val);
		}
	});
	
	var newStr = sStr;

	//go through each string and find the matching values and replace them with a span with that text
	//give the span a color attribute of red
	
	$.each(matchingArr, function(ind, valu) {
		var patt = new RegExp("(" + valu + ")","g");
		newStr = newStr.replace(patt,'<span style="color: #CCAD7E;">$1</span>');
	});
	
	$($("tr[data-key='funding_rounds'] td").get(num)).html(newStr);
	
	var newStr2 = sStr2;
	
	$.each(matchingArr, function(ind, valu) {
		var patt = new RegExp("(" + valu + ")","g");
		newStr2 = newStr2.replace(patt,'<span style="color: #CCAD7E;">$1</span>');
	});
	
	$($("tr[data-key='funding_rounds'] td").get(temp)).html(newStr2);
	
	console.log(matchingArr);
	
}








//Blur/Focus

var blurFocus = function(num) {
$('#company' + num + 'Input').focus(function() {
            $('#company' + num + 'Input').val("");
    })

$('#company' + num + 'Input').blur(function() {
        if ($('#company' + num + 'Input').val() === "") {
            $('#company' + num + 'Input').val("Company Name");
	    console.log('blurred');
        }
    })

}
