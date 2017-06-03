var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-97040145-1']);
_gaq.push(['_trackPageview']);

(function() {
  var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
  ga.src = 'https://ssl.google-analytics.com/ga.js';
  var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();

// add coins here, with exact number from popup.html list with exact string from ajax urls

function drawValues(value){
	$("#lineChart").show();
	
	var val = coins[value];
	
	var tickerString = "https://api.coinmarketcap.com/v1/ticker/"+val+"/";
	var dataString = "https://graphs.coinmarketcap.com/currencies/"+val+"/";
	var chartString = val.charAt(0).toUpperCase() + val.slice(1);
			fetchValues(tickerString);
			x(dataString, chartString, "ten");
			$("#seven").click(function(){
				if(value == $('#myselect').val())
				x(dataString, chartString, "seven");
			});
			$("#ten").click(function(){
				if(value == $('#myselect').val())
				x(dataString, chartString, "ten");
			});
			$("#thirty").click(function(){
				if(value == $('#myselect').val())
				x(dataString, chartString, "thirty");
			});
			$("#year").click(function(){
				if(value == $('#myselect').val())
				x(dataString, chartString, "year");
			});
			
			
}

function x(fetchUrl, currency, timeVal) {
	$.ajax({
		type: "GET"
		, url: fetchUrl
	}).done(function (response) {
		//console.dir(response);
		var lastItem = response.price_usd.length;
		var time = response.price_usd[lastItem - 1][0];
		var dollar = response.price_usd[lastItem - 1][1];
		var d = new Date();
		
		
		if(timeVal == "ten"){
			var toData = response.price_usd.slice(-10);
		}
		else if(timeVal == "seven"){
			var toData = response.price_usd.slice(-7);
			
		}
		else if(timeVal == "thirty"){
			var toData = response.price_usd.slice(-30);
		}
		else{
			var toData = response.price_usd.slice(-361);
			
			var tempVal = [];
			for (var i = 1; i < toData.length; i++){
				if(i%30==0){
					//console.log(i);
					//console.log(toData[i]);
					tempVal.push(toData[i]);
				}
			}
			toData = tempVal;
			
			
			
		}
		
		
		$("#usdPrice").html((dollar).toFixed(7) + " dollars");
		$("#time").html("<b>Time: </b>" + d);
		drawChart("#lineChart", toData, currency);
	}).fail(function (response) {
		alert("FAILURE: " + response);
		//("#lineChart");
	});
}


// used for average green line on charts

function average(elem) {
	var sum = 0;
	for (var i = 0; i < elem.length; i++) {
		sum += parseFloat(elem[i], 10);
	}
	var avg = sum / elem.length;
	return avg;

}

// takes the divId, and data and name of the currency to be displayed on the graph
// this funciton later calls fusion charts according to the date range selected
function drawChart(locations, toData, currency) {
	var DateArray = [];
	var AdjustedPrice = [];
	var smallestSize = false;
	
	
	// sanitazation of data, parsing the data into x and y axis for charts
	if(toData.length == 7 || toData.length == 10){
	for (i = 0; i < toData.length; i++) {
		var d = new Date(parseInt(toData[i][0]));
		var day = d.getDay();
		DateArray.push(day);
	}
	
}
	else if(toData.length == 12){
		for (i = 0; i < toData.length; i++) {
		var d = new Date(parseInt(toData[i][0]));
		var month = d.getMonth();
		DateArray.push(month);
	}
	
		
	}
	else{
		
	}

	for (i = 0; i < toData.length; i++) {
		if (toData[i][1] < 0.0009) {
			var d = (toData[i][1] * 1000000).toFixed(8);
			AdjustedPrice.push(d);
			smallestSize = true;
		}

		// } else if (toData[i][1] < 1 && toData[i][1] > 0.0009) {
		//	var d = (toData[i][1] * 100).toFixed(5);
		//	AdjustedPrice.push(d);
		//} 
		else {

			var d = (toData[i][1]).toFixed(3);
			AdjustedPrice.push(d);
		}


	}
	//console.dir(AdjustedPrice);

	captionForChart = currency + " Trend";
	var Sidecaption = "";
	var denomination = "";
	if (toData[0][1] < 0.0009) {
		Sidecaption = currency + " in MicroDollar";
		denomination = "u$";
		avg = average(AdjustedPrice);

	} 
	//else if (toData[0][1] < 1 && toData[0][1] > 0.0009) {
	//	Sidecaption = currency + " in Cents";
	//	denomination = "c";
	//	avg = average(AdjustedPrice);

	//} 
	else {

		Sidecaption = currency + " in Dollars";
		denomination = "$";
		avg = average(AdjustedPrice);
		
	}


	
	
	var d = new Date();
	// preapring the labels for different data range
	if(toData.length == 7 || toData.length == 10)
	{
	var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
	}
	
	if(toData.length ==12){
		var days = ["January", "February", "March", "April", "May", "June",
		  "July", "August", "September", "October", "November", "December"
		];
	}
	
	if(toData.length == 30)
	{
	var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
	}
	
	if(toData.length == 7 || toData.length == 10){
	$(locations).insertFusionCharts({
		type: 'area2d'
		, width: '750'
		, height: '300'
		, dataFormat: 'json'
		, dataSource: {
			"chart": {
				"caption": captionForChart
				, "subCaption": "Past 10 Days"
				, "xAxisName": "Day"
				, "yAxisName": Sidecaption
				, "numberPrefix": denomination
				, "showalternatehgridcolor": "0",
				"plotbordercolor": "008ee4",
				"plotborderthickness": "1",
				"showvalues": "1",
				"divlinecolor": "CCCCCC",
				"showcanvasborder": "0",
				"tooltipbgcolor": "00396d",
				"tooltipcolor": "FFFFFF",
				"tooltipbordercolor": "00396d",
				"numdivlines": "2",
				"yaxisvaluespadding": "20",
				"anchorbgcolor": "008ee4",
				"anchorborderthickness": "0",
				"showshadow": "0",
				"anchorradius": "4",
				"chartrightmargin": "25",
				"canvasborderalpha": "0",
				"showborder": "0",
				"baseFontSize": "8.5"
			, },

			"data": [{
				"label": days[DateArray[0]]
				, "value": AdjustedPrice[0]
									}, {
				"label": days[DateArray[1]]
				, "value": AdjustedPrice[1]
									}, {
				"label": days[DateArray[2]]
				, "value": AdjustedPrice[2]
									}, {
				"label": days[DateArray[3]]
				, "value": AdjustedPrice[3]
									}, {
				"label": days[DateArray[4]]
				, "value": AdjustedPrice[4]
									}, {
				"label": days[DateArray[5]]
				, "value": AdjustedPrice[5]
									}, {
				"label": days[DateArray[6]]
				, "value": AdjustedPrice[6]
									}, {
				"label": days[DateArray[7]]
				, "value": AdjustedPrice[7]
									}, {
				"label": days[DateArray[8]]
				, "value": AdjustedPrice[8]
									}, {
				"label": days[DateArray[9]]
				, "value": AdjustedPrice[9]
									}],

			"trendlines": [
				{
					"line": [
						{
							"startvalue": avg
							, "color": "#1aaf5d"
							, "displayvalue": "average"
							, "valueOnTop": "1"
							, "thickness": "2"
                }
            ]
					}
									]
		}
	});
	
	}
	
	
	if(toData.length == 12){
	$(locations).insertFusionCharts({
		type: 'area2d'
		, width: '750'
		, height: '300'
		, dataFormat: 'json'
		, dataSource: {
			"chart": {
				"caption": captionForChart
				, "subCaption": "Past 12 Months"
				, "xAxisName": "Month"
				, "yAxisName": Sidecaption
				, "numberPrefix": denomination
				, "showalternatehgridcolor": "0",
				"plotbordercolor": "008ee4",
				"plotborderthickness": "1",
				"showvalues": "1",
				"divlinecolor": "CCCCCC",
				"showcanvasborder": "0",
				"tooltipbgcolor": "00396d",
				"tooltipcolor": "FFFFFF",
				"tooltipbordercolor": "00396d",
				"numdivlines": "2",
				"yaxisvaluespadding": "20",
				"anchorbgcolor": "008ee4",
				"anchorborderthickness": "0",
				"showshadow": "0",
				"anchorradius": "4",
				"chartrightmargin": "25",
				"canvasborderalpha": "0",
				"showborder": "0",
				"baseFontSize": "8.5"
			, },

			"data": [{
				"label": days[DateArray[0]]
				, "value": AdjustedPrice[0]
									}, {
				"label": days[DateArray[1]]
				, "value": AdjustedPrice[1]
									}, {
				"label": days[DateArray[2]]
				, "value": AdjustedPrice[2]
									}, {
				"label": days[DateArray[3]]
				, "value": AdjustedPrice[3]
									}, {
				"label": days[DateArray[4]]
				, "value": AdjustedPrice[4]
									}, {
				"label": days[DateArray[5]]
				, "value": AdjustedPrice[5]
									}, {
				"label": days[DateArray[6]]
				, "value": AdjustedPrice[6]
									}, {
				"label": days[DateArray[7]]
				, "value": AdjustedPrice[7]
									}, {
				"label": days[DateArray[8]]
				, "value": AdjustedPrice[8]
									}, {
				"label": days[DateArray[9]]
				, "value": AdjustedPrice[9]
									}, {
				"label": days[DateArray[10]]
				, "value": AdjustedPrice[10]
									}, {
				"label": days[DateArray[11]]
				, "value": AdjustedPrice[11]
									}],

			"trendlines": [
				{
					"line": [
						{
							"startvalue": avg
							, "color": "#1aaf5d"
							, "displayvalue": "average"
							, "valueOnTop": "1"
							, "thickness": "2"
                }
            ]
					}
									]
		}
	});
	
	}
	
if(toData.length == 30){
	$(locations).insertFusionCharts({
		type: 'area2d'
		, width: '750'
		, height: '300'
		, dataFormat: 'json'
		, dataSource: {
			"chart": {
				"caption": captionForChart
				, "subCaption": "Past 30 Days"
				, "xAxisName": "Day"
				, "yAxisName": Sidecaption
				, "numberPrefix": denomination
				, "showalternatehgridcolor": "0",
				"plotbordercolor": "008ee4",
				"plotborderthickness": "1",
				"showvalues": "0",
				"divlinecolor": "CCCCCC",
				"showcanvasborder": "0",
				"tooltipbgcolor": "00396d",
				"tooltipcolor": "FFFFFF",
				"tooltipbordercolor": "00396d",
				"numdivlines": "2",
				"yaxisvaluespadding": "20",
				"anchorbgcolor": "008ee4",
				"anchorborderthickness": "0",
				"showshadow": "0",
				"anchorradius": "4",
				"chartrightmargin": "25",
				"canvasborderalpha": "0",
				"showborder": "0",
				"baseFontSize": "8.5"
			, },

			"data": [{
				"label": days[DateArray[0]]
				, "value": AdjustedPrice[0]
									}, {
				"label": days[DateArray[1]]
				, "value": AdjustedPrice[1]
									}, {
				"label": days[DateArray[2]]
				, "value": AdjustedPrice[2]
									}, {
				"label": days[DateArray[3]]
				, "value": AdjustedPrice[3]
									}, {
				"label": days[DateArray[4]]
				, "value": AdjustedPrice[4]
									}, {
				"label": days[DateArray[5]]
				, "value": AdjustedPrice[5]
									}, {
				"label": days[DateArray[6]]
				, "value": AdjustedPrice[6]
									}, {
				"label": days[DateArray[7]]
				, "value": AdjustedPrice[7]
									}, {
				"label": days[DateArray[8]]
				, "value": AdjustedPrice[8]
									}, {
				"label": days[DateArray[9]]
				, "value": AdjustedPrice[9]
									}, {
				"label": days[DateArray[10]]
				, "value": AdjustedPrice[10]
									}, {
				"label": days[DateArray[11]]
				, "value": AdjustedPrice[11]
									}, {
				"label": days[DateArray[12]]
				, "value": AdjustedPrice[12]
									}, {
				"label": days[DateArray[13]]
				, "value": AdjustedPrice[13]
									}, {
				"label": days[DateArray[14]]
				, "value": AdjustedPrice[14]
									}, {
				"label": days[DateArray[15]]
				, "value": AdjustedPrice[15]
									}, {
				"label": days[DateArray[16]]
				, "value": AdjustedPrice[16]
									}, {
				"label": days[DateArray[17]]
				, "value": AdjustedPrice[17]
									}, {
				"label": days[DateArray[18]]
				, "value": AdjustedPrice[18]
									}, {
				"label": days[DateArray[19]]
				, "value": AdjustedPrice[19]
									}, {
				"label": days[DateArray[20]]
				, "value": AdjustedPrice[20]
									}, {
				"label": days[DateArray[21]]
				, "value": AdjustedPrice[21]
									}, {
				"label": days[DateArray[22]]
				, "value": AdjustedPrice[22]
									}, {
				"label": days[DateArray[23]]
				, "value": AdjustedPrice[23]
									}, {
				"label": days[DateArray[24]]
				, "value": AdjustedPrice[24]
									}, {
				"label": days[DateArray[25]]
				, "value": AdjustedPrice[25]
									}, {
				"label": days[DateArray[26]]
				, "value": AdjustedPrice[26]
									}, {
				"label": days[DateArray[27]]
				, "value": AdjustedPrice[27]
									}, {
				"label": days[DateArray[28]]
				, "value": AdjustedPrice[28]
									}, {
				"label": days[DateArray[29]]
				, "value": AdjustedPrice[29]
									}, {
				"label": days[DateArray[30]]
				, "value": AdjustedPrice[30]
									}],

			"trendlines": [
				{
					"line": [
						{
							"startvalue": avg
							, "color": "#1aaf5d"
							, "displayvalue": "average"
							, "valueOnTop": "1"
							, "thickness": "2"
                }
            ]
					}
									]
		}
	});
	
	}


};

function fetchValues(fetchUrl) {
	$.ajax({
		type: "GET"
		, url: fetchUrl
	}).done(function (response) {
		$("#tableButton").show();
		var oneHour = response[0].percent_change_1h;
		var twentyFourHour = response[0].percent_change_24h;
		var sevenDays = response[0].percent_change_7d;
		$("#hourChange").text(oneHour);
		$("#dayChage").text(twentyFourHour);
		$("#monthChange").text(sevenDays);
		if(parseFloat(oneHour) < 0){
		$("#hourChange").html("<span style=\"color:red\">" + (oneHour) + " %</span>");
		}
		else{
			$("#hourChange").html("<span style=\"color:green\">" + (oneHour) + " %</span>");
		}
		
		if(parseFloat(twentyFourHour) < 0){
		$("#dayChage").html("<span style=\"color:red\">" + (twentyFourHour) + " %</span>");
		}
		else{
			$("#dayChage").html("<span style=\"color:green\">" + (twentyFourHour) + " %</span>");
		}
		
		if(parseFloat(sevenDays) < 0){
		$("#monthChange").html("<span style=\"color:red\">" + (sevenDays) + " %</span>");
		}
		else{
			$("#monthChange").html("<span style=\"color:green\">" + (sevenDays) + " %</span>");
		}
		
	}).fail(function (response) {
		alert("FAILURE: " + response);
		//("#lineChart");
	});
}

$(document).ready(function () {

	
	$("#lineChart").hide();
	$('#myselect').select2();
	$("#tableButton").hide();
	
	
	
	jQuery('#myselect').on('change', (function () {
		//var value = $(this).val();
		
		var value =$('#myselect').val();
		drawValues(value);
	}));

});