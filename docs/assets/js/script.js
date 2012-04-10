/*****************
 writes company info from json object to document
 ******************/
console.log('alive');
$(function(){
	console.log('domready');
	$("#button1").on("click", requestCompany1);
	$("#button2").on("click", requestCompany2);
	dropDownList();
});

function dropDownList (evt) {
	console.log("dropdownfired");
	var companyArray = [];
	$.ajax({
		url : 'companyarray.txt', 
		dataType: 'json',
		success: function(data) {
			console.log(data);
			
			$('#companyInput1').data('source', data);
			console.log($('#companyInput1').data('source'));
			
			$('#companyInput2').data('source', data);
			console.log($('#companyInput2').data('source'));
		}
	});3
}





function requestCompany1 (evt) {
	console.log("company 1 request fired");
	var company1 = $('#companyInput1').val().toLowerCase();
	
	console.log(company1);
	
	
	var url1 = 'assets/data/' + company1 + 'json'
	
	console.log(url1);
	$.ajax({
		url : url1,
		dataType: 'json',
		data: company1,
		success: function(data) {
			console.log(data);
			$($(".companyName:nth-child(2)").get(0))
				.html(data["name"])
				.addClass('companyName');
			console.log($(".companyName:nth-child(2)").get(0));
				
			var propertyList = ["homepage_url", "number_of_employees", "founded_year", "tag_list",
						     "overview", "total_money_raised"]
			for (i = 0; i < propertyList.length; i++) {
				$($("tr[data-key='" + propertyList[i] + "'] td").get(1)).html(data[propertyList[i]]);
				console.log($("tr[data-key='" + propertyList[i] + "'] td").get(1));
				}
			return false;
			}
		});
};


function requestCompany2 (evt) {
	console.log("request2fired")
	var company2 = $('#companyInput2').val().toLowerCase();
	var url2 = 'assets/data/' + company2 + '.json'
	
	console.log(company2);
	$.ajax({
		url : url2,
		dataType: 'json',
		data: company2,
		success: function(data) {
				console.log(data);
			
				$($(".companyName:nth-child(2)").get(1))
					.html(data["name"])
					.addClass('companyName');
				console.log($(".companyName:nth-child(2)").get(1));
				
				var propertyList = ["homepage_url", "number_of_employees", "founded_year", "tag_list",
						     "overview", "total_money_raised"]
				
				for (i = 0; i < propertyList.length; i++) {
					$($("tr[data-key='" + propertyList[i] + "'] td").get(2)).html(data[propertyList[i]]);
					console.log($("tr[data-key='" + propertyList[i] + "'] td").get(2));
					}
				return false;
			}
		});
}