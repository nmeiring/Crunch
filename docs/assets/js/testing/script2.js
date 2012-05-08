/*****************
 writes company info from json object to document
 ******************/
console.log('alive');
$(function(){
	console.log('domready');
	$("#button1").on("click", fireRequest1);
	$("#button2").on("click", fireRequest2);
	dropDownList();
});

function fireRequest1 () {
	requestCompany("company1", 0);
}

function fireRequest2() {
	requestCompany("company2", 1);
}

function dropDownList (evt) {
	console.log("dropdownfired");
	var companyArray = [];
	$.ajax({
		url : 'assets/data/companyarray.txt', 
		dataType: 'json',
		success: function(data) {
			console.log(data);
			
			$('#company1Input').data('source', data);
			console.log($('#company1Input').data('source'));
			
			$('#company2Input').data('source', data);
			console.log($('#company2Input').data('source'));
		}
	});
}

function requestCompany (companyNum, tdPosition) {
	console.log("company 1 request fired");
	var company = $('#' + companyNum + 'Input').val().toLowerCase();
	console.log(company)
	var url = 'assets/data/' + company + '.json'
	
	console.log(url);
	$.ajax({
		url : url,
		dataType: 'json',
		data: company,
		success: function(data) {
			console.log(data);
			$($(".companyName:nth-child(2)").get(tdPosition - 1))
				.html(data["name"])
				.addClass('companyName');
			console.log($(".companyName:nth-child(2)").get(tdPosition - 1));
			
				
			var propertyList = ["homepage_url", "number_of_employees", "founded_year", "tag_list",
						     "overview", "total_money_raised"]
			for (i = 0; i < propertyList.length; i++) {
				$($("tr[data-key='" + propertyList[i] + "'] td").get(tdPosition)).html(data[propertyList[i]]);
				console.log($("tr[data-key='" + propertyList[i] + "'] td").get(tdPosition));
				}
			return false;
			}
		});
};