var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-97040145-1']);
_gaq.push(['_trackPageview']);

(function() {
  var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
  ga.src = 'https://ssl.google-analytics.com/ga.js';
  var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();


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


function average(elem) {


	var sum = 0;
	for (var i = 0; i < elem.length; i++) {
		sum += parseFloat(elem[i], 10);
	}
	var avg = sum / elem.length;
	return avg;

}


function drawChart(locations, toData, currency) {
	var DateArray = [];
	var AdjustedPrice = [];
	var smallestSize = false;
	console.log("length" + toData.length);
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
	console.log(DateArray);
	console.log("blab lbal");
		
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
	// subcaptions
	
	// prepare data
	
	// pass values to graph
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
				, "paletteColors": "#0075c2"
				, "bgColor": "#ffffff"
				, "showBorder": "0"
				, "showCanvasBorder": "0"
				, "plotBorderAlpha": "10"
				, "usePlotGradientColor": "0"
				, "plotFillAlpha": "50"
				, "showXAxisLine": "1"
				, "axisLineAlpha": "25"
				, "divLineAlpha": "10"
				, "showValues": "1"
				, "showAlternateHGridColor": "0"
				, "captionFontSize": "14"
				, "subcaptionFontSize": "14"
				, "subcaptionFontBold": "0"
				, "toolTipColor": "#ffffff"
				, "toolTipBorderThickness": "0"
				, "toolTipBgColor": "#000000"
				, "toolTipBgAlpha": "80"
				, "toolTipBorderRadius": "2"
				, "toolTipPadding": "5", //Anchor Cosmetics
				"anchorRadius": "4"
				, "anchorBorderThickness": "2"
				, "anchorBorderColor": "#127fcb"
				, "anchorSides": "1"
				, "anchorBgColor": "#d3f7ff"
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
				, "xAxisName": "Day"
				, "yAxisName": Sidecaption
				, "numberPrefix": denomination
				, "paletteColors": "#0075c2"
				, "bgColor": "#ffffff"
				, "showBorder": "0"
				, "showCanvasBorder": "0"
				, "plotBorderAlpha": "10"
				, "usePlotGradientColor": "0"
				, "plotFillAlpha": "50"
				, "showXAxisLine": "1"
				, "axisLineAlpha": "25"
				, "divLineAlpha": "10"
				, "showValues": "1"
				, "showAlternateHGridColor": "0"
				, "captionFontSize": "14"
				, "subcaptionFontSize": "14"
				, "subcaptionFontBold": "0"
				, "toolTipColor": "#ffffff"
				, "toolTipBorderThickness": "0"
				, "toolTipBgColor": "#000000"
				, "toolTipBgAlpha": "80"
				, "toolTipBorderRadius": "2"
				, "toolTipPadding": "5", //Anchor Cosmetics
				"anchorRadius": "4"
				, "anchorBorderThickness": "2"
				, "anchorBorderColor": "#127fcb"
				, "anchorSides": "1"
				, "anchorBgColor": "#d3f7ff"
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
				, "paletteColors": "#0075c2"
				, "bgColor": "#ffffff"
				, "showBorder": "0"
				, "showCanvasBorder": "0"
				, "plotBorderAlpha": "10"
				, "usePlotGradientColor": "0"
				, "plotFillAlpha": "50"
				, "showXAxisLine": "1"
				, "axisLineAlpha": "25"
				, "divLineAlpha": "10"
				, "showValues": "1"
				, "showAlternateHGridColor": "0"
				, "captionFontSize": "14"
				, "subcaptionFontSize": "14"
				, "subcaptionFontBold": "0"
				, "toolTipColor": "#ffffff"
				, "toolTipBorderThickness": "0"
				, "toolTipBgColor": "#000000"
				, "toolTipBgAlpha": "80"
				, "toolTipBorderRadius": "2"
				, "toolTipPadding": "5", //Anchor Cosmetics
				"anchorRadius": "4"
				, "anchorBorderThickness": "2"
				, "anchorBorderColor": "#127fcb"
				, "anchorSides": "1"
				, "anchorBgColor": "#d3f7ff"
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
			$("#hourChange").html((oneHour) + " %");
		}
		
		if(parseFloat(twentyFourHour) < 0){
		$("#dayChage").html("<span style=\"color:red\">" + (twentyFourHour) + " %</span>");
		}
		else{
			$("#dayChage").html((twentyFourHour) + " %");
		}
		
		if(parseFloat(sevenDays) < 0){
		$("#monthChange").html("<span style=\"color:red\">" + (sevenDays) + " %</span>");
		}
		else{
			$("#monthChange").html((sevenDays) + " %");
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

		if (value == 1) {
			$("#lineChart").show();
			fetchValues("https://api.coinmarketcap.com/v1/ticker/ripple/");
			x("https://graphs.coinmarketcap.com/currencies/ripple/", "Ripple", "ten");
			$("#seven").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/ripple/", "Ripple", "seven");
			});
			$("#ten").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/ripple/", "Ripple", "ten");
			});
			$("#thirty").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/ripple/", "Ripple", "thirty");
			});
			$("#year").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/ripple/", "Ripple", "year");
			});
			
		}

		if (value == 2) {
			$("#lineChart").show();
			fetchValues("https://api.coinmarketcap.com/v1/ticker/bitcoin/");
			x("https://graphs.coinmarketcap.com/currencies/bitcoin/", "Bitcoin", "ten");
			$("#seven").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/bitcoin/", "Bitcoin", "seven");
			});
			$("#ten").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/bitcoin/", "Bitcoin", "ten");
			});
			$("#thirty").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/bitcoin/", "Bitcoin", "thirty");
			});
			$("#year").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/bitcoin/", "Bitcoin", "year");
			});
			
		}

			if (value == 3) {
			$("#lineChart").show();
			fetchValues("https://api.coinmarketcap.com/v1/ticker/ethereum/");
			x("https://graphs.coinmarketcap.com/currencies/ethereum/", "Ethereum", "ten");
			$("#seven").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/ethereum/", "Ethereum", "seven");
			});
			$("#ten").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/ethereum/", "Ethereum", "ten");
			});
			$("#thirty").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/ethereum/", "Ethereum", "thirty");
			});
			$("#year").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/ethereum/", "Ethereum", "year");
			});
			
		}

		if (value == 4) {
			$("#lineChart").show();
			fetchValues("https://api.coinmarketcap.com/v1/ticker/dash/");
			x("https://graphs.coinmarketcap.com/currencies/dash/", "Dash", "seven");
			$("#seven").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/dash/", "Dash", "seven");
			});
			$("#ten").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/dash/", "Dash", "ten");
			});
			$("#thirty").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/dash/", "Dash", "thirty");
			});
			$("#year").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/dash/", "Dash", "year");
			});
			
		}

		if (value == 5) {
			$("#lineChart").show();
			fetchValues("https://api.coinmarketcap.com/v1/ticker/litecoin/");
			x("https://graphs.coinmarketcap.com/currencies/litecoin/", "Litecoin", "ten");
			$("#seven").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/litecoin/", "Litecoin", "seven");
			});
			$("#ten").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/litecoin/", "Litecoin", "ten");
			});
			$("#thirty").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/litecoin/", "Litecoin", "thirty");
			});
			$("#year").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/litecoin/", "Litecoin", "year");
			});
			
		}

		if (value == 6) {
			$("#lineChart").show();
			fetchValues("https://api.coinmarketcap.com/v1/ticker/dogecoin/");
			x("https://graphs.coinmarketcap.com/currencies/dogecoin/", "Dogecoin", "ten");
			$("#seven").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/dogecoin/", "Dogecoin", "seven");
			});
			$("#ten").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/dogecoin/", "Dogecoin", "ten");
			});
			$("#thirty").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/dogecoin/", "Dogecoin", "thirty");
			});
			$("#year").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/dogecoin/", "Dogecoin", "year");
			});
			
		}
		
		if (value == 7) {
			$("#lineChart").show();
			fetchValues("https://api.coinmarketcap.com/v1/ticker/monero/");
			x("https://graphs.coinmarketcap.com/currencies/monero/", "Monero", "ten");
			$("#seven").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/monero/", "Monero", "seven");
			});
			$("#ten").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/monero/", "Monero", "ten");
			});
			$("#thirty").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/monero/", "Monero", "thirty");
			});
			$("#year").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/monero/", "Monero", "year");
			});
			
		}
		
		
		if (value == 8) {
			$("#lineChart").show();
			fetchValues("https://api.coinmarketcap.com/v1/ticker/nem/");
			x("https://graphs.coinmarketcap.com/currencies/nem/", "Nem", "ten");
			$("#seven").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/nem/", "Nem", "seven");
			});
			$("#ten").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/nem/", "Nem", "ten");
			});
			$("#thirty").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/nem/", "Nem", "thirty");
			});
			$("#year").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/nem/", "Nem", "year");
			});
			
		}
		
		if (value == 9 ) {
			$("#lineChart").show();
			fetchValues("https://api.coinmarketcap.com/v1/ticker/virtualcoin/");
			x("https://graphs.coinmarketcap.com/currencies/virtualcoin/", "VirtualCoin", "ten");
			$("#seven").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/virtualcoin/", "VirtualCoin", "seven");
			});
			$("#ten").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/virtualcoin/", "VirtualCoin", "ten");
			});
			$("#thirty").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/virtualcoin/", "VirtualCoin", "thirty");
			});
			$("#year").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/virtualcoin/", "VirtualCoin", "year");
			});
			
		}
		
		if (value == 10) {
			$("#lineChart").show();
			fetchValues("https://api.coinmarketcap.com/v1/ticker/zcash/");
			x("https://graphs.coinmarketcap.com/currencies/zcash/", "Zcash", "ten");
			$("#seven").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/zcash/", "Zcash", "seven");
			});
			$("#ten").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/zcash/", "Zcash", "ten");
			});
			$("#thirty").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/zcash/", "Zcash", "thirty");
			});
			$("#year").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/zcash/", "Zcash", "year");
			});
			
		}
		
		if (value == 11) {
			$("#lineChart").show();
			fetchValues("https://api.coinmarketcap.com/v1/ticker/pivx/");
			x("https://graphs.coinmarketcap.com/currencies/pivx/", "Pivx", "ten");
			$("#seven").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/pivx/", "Pivx", "seven");
			});
			$("#ten").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/pivx/", "Pivx", "ten");
			});
			$("#thirty").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/pivx/", "Pivx", "thirty");
			});
			$("#year").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/pivx/", "Pivx", "year");
			});
			
		}
		
		if (value == 12) {
			$("#lineChart").show();
			fetchValues("https://api.coinmarketcap.com/v1/ticker/decred/");
			x("https://graphs.coinmarketcap.com/currencies/decred/", "Decred", "ten");
			$("#seven").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/decred/", "Decred", "seven");
			});
			$("#ten").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/decred/", "Decred", "ten");
			});
			$("#thirty").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/decred/", "Decred", "thirty");
			});
			$("#year").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/decred/", "Decred", "year");
			});
			
		}
		
		if (value == 13) {
			$("#lineChart").show();
			fetchValues("https://api.coinmarketcap.com/v1/ticker/waves/");
			x("https://graphs.coinmarketcap.com/currencies/waves/", "Waves", "ten");
			$("#seven").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/waves/", "Waves", "seven");
			});
			$("#ten").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/waves/", "Waves", "ten");
			});
			$("#thirty").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/waves/", "Waves", "thirty");
			});
			$("#year").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/waves/", "Waves", "year");
			});
			
		}
		
		if (value == 14) {
			$("#lineChart").show();
			fetchValues("https://api.coinmarketcap.com/v1/ticker/ethereum-classic/");
			x("https://graphs.coinmarketcap.com/currencies/ethereum-classic/", "Ethereum-classic", "ten");
			$("#seven").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/ethereum-classic/", "Ethereum-classic", "seven");
			});
			$("#ten").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/ethereum-classic/", "Ethereum-classic", "ten");
			});
			$("#thirty").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/ethereum-classic/", "Ethereum-classic", "thirty");
			});
			$("#year").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/ethereum-classic/", "Ethereum-classic", "year");
			});
			
		}
		
		if (value == 15) {
			$("#lineChart").show();
			fetchValues("https://api.coinmarketcap.com/v1/ticker/factom/");
			x("https://graphs.coinmarketcap.com/currencies/factom/", "Factom", "ten");
			$("#seven").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/factom/", "Factom", "seven");
			});
			$("#ten").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/factom/", "Factom", "ten");
			});
			$("#thirty").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/factom/", "Factom", "thirty");
			});
			$("#year").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/factom/", "Factom", "year");
			});
			
		}
		
		if (value == 16) {
			$("#lineChart").show();
			fetchValues("https://api.coinmarketcap.com/v1/ticker/stratis/");
			x("https://graphs.coinmarketcap.com/currencies/stratis/", "Stratis", "ten");
			$("#seven").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/stratis/", "Stratis", "seven");
			});
			$("#ten").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/stratis/", "Stratis", "ten");
			});
			$("#thirty").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/stratis/", "Stratis", "thirty");
			});
			$("#year").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/stratis/", "Stratis", "year");
			});
			
		}
		
		if (value == 17) {
			$("#lineChart").show();
			fetchValues("https://api.coinmarketcap.com/v1/ticker/steem/");
			x("https://graphs.coinmarketcap.com/currencies/steem/", "Steem", "ten");
			$("#seven").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/steem/", "Steem", "seven");
			});
			$("#ten").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/steem/", "Steem", "ten");
			});
			$("#thirty").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/steem/", "Steem", "thirty");
			});
			$("#year").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/steem/", "Steem", "year");
			});
			
		}
		
		if (value == 18) {
			$("#lineChart").show();
			fetchValues("https://api.coinmarketcap.com/v1/ticker/gamecredits/");
			x("https://graphs.coinmarketcap.com/currencies/gamecredits/", "Gamecredits", "ten");
			$("#seven").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/gamecredits/", "Gamecredits", "seven");
			});
			$("#ten").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/gamecredits/", "Gamecredits", "ten");
			});
			$("#thirty").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/gamecredits/", "Gamecredits", "thirty");
			});
			$("#year").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/gamecredits/", "Gamecredits", "year");
			});
			
		}
		
		if (value == 19) {
			$("#lineChart").show();
			fetchValues("https://api.coinmarketcap.com/v1/ticker/lisk/");
			x("https://graphs.coinmarketcap.com/currencies/lisk/", "Lisk", "ten");
			$("#seven").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/lisk/", "Lisk", "seven");
			});
			$("#ten").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/lisk/", "Lisk", "ten");
			});
			$("#thirty").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/lisk/", "Lisk", "thirty");
			});
			$("#year").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/lisk/", "Lisk", "year");
			});
			
		}
		
		if (value == 20) {
			$("#lineChart").show();
			fetchValues("https://api.coinmarketcap.com/v1/ticker/bytecoin-bcn/");
			x("https://graphs.coinmarketcap.com/currencies/bytecoin-bcn/", "Byte-coin", "ten");
			$("#seven").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/bytecoin-bcn/", "Byte-coin", "seven");
			});
			$("#ten").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/bytecoin-bcn/", "Byte-coin", "ten");
			});
			$("#thirty").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/bytecoin-bcn/", "Byte-coin", "thirty");
			});
			$("#year").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/bytecoin-bcn/", "Byte-coin", "year");
			});
			
		}
		
		if (value == 21) {
			$("#lineChart").show();
			fetchValues("https://api.coinmarketcap.com/v1/ticker/stellar/");
			x("https://graphs.coinmarketcap.com/currencies/stellar/", "Stellar", "ten");
			$("#seven").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/stellar/", "Stellar", "seven");
			});
			$("#ten").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/stellar/", "Stellar", "ten");
			});
			$("#thirty").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/stellar/", "Stellar", "thirty");
			});
			$("#year").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/stellar/", "Stellar", "year");
			});
			
		}
		
		if (value == 22) {
			$("#lineChart").show();
			fetchValues("https://api.coinmarketcap.com/v1/ticker/bitshares/");
			x("https://graphs.coinmarketcap.com/currencies/bitshares/", "Bitshares", "ten");
			$("#seven").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/bitshares/", "Bitshares", "seven");
			});
			$("#ten").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/bitshares/", "Bitshares", "ten");
			});
			$("#thirty").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/bitshares/", "Bitshares", "thirty");
			});
			$("#year").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/bitshares/", "Bitshares", "year");
			});
			
		}
		
		if (value == 23) {
			$("#lineChart").show();
			fetchValues("https://api.coinmarketcap.com/v1/ticker/peercoin/");
			x("https://graphs.coinmarketcap.com/currencies/peercoin/", "Peercoin", "ten");
			$("#seven").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/peercoin/", "Peercoin", "seven");
			});
			$("#ten").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/peercoin/", "Peercoin", "ten");
			});
			$("#thirty").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/peercoin/", "Peercoin", "thirty");
			});
			$("#year").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/peercoin/", "Peercoin", "year");
			});
			
		}
		
		if (value == 24) {
			$("#lineChart").show();
			fetchValues("https://api.coinmarketcap.com/v1/ticker/siacoin/");
			x("https://graphs.coinmarketcap.com/currencies/siacoin/", "Siacoin", "ten");
			$("#seven").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/siacoin/", "Siacoin", "seven");
			});
			$("#ten").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/siacoin/", "Siacoin", "ten");
			});
			$("#thirty").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/siacoin/", "Siacoin", "thirty");
			});
			$("#year").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/siacoin/", "Siacoin", "year");
			});
			
		}
		
		if (value == 25) {
			$("#lineChart").show();
			fetchValues("https://api.coinmarketcap.com/v1/ticker/creditbit/");
			x("https://graphs.coinmarketcap.com/currencies/creditbit/", "Creditbit", "ten");
			$("#seven").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/creditbit/", "Creditbit", "seven");
			});
			$("#ten").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/creditbit/", "Creditbit", "ten");
			});
			$("#thirty").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/creditbit/", "Creditbit", "thirty");
			});
			$("#year").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/creditbit/", "Creditbit", "year");
			});
			
			
		}
		
		if (value == 26) {
			$("#lineChart").show();
			fetchValues("https://api.coinmarketcap.com/v1/ticker/emercoin/");
			x("https://graphs.coinmarketcap.com/currencies/emercoin/", "Emercoin", "ten");
			$("#seven").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/emercoin/", "Emercoin", "seven");
			});
			$("#ten").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/emercoin/", "Emercoin", "ten");
			});
			$("#thirty").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/emercoin/", "Emercoin", "thirty");
			});
			$("#year").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/emercoin/", "Emercoin", "year");
			});
			
		}
		
		if (value == 27) {
			$("#lineChart").show();
			fetchValues("https://api.coinmarketcap.com/v1/ticker/komodo/");
			x("https://graphs.coinmarketcap.com/currencies/komodo/", "Komodo", "ten");
			$("#seven").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/komodo/", "Komodo", "seven");
			});
			$("#ten").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/komodo/", "Komodo", "ten");
			});
			$("#thirty").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/komodo/", "Komodo", "thirty");
			});
			$("#year").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/komodo/", "Komodo", "year");
			});
			
		}
		
		if (value == 28) {
			$("#lineChart").show();
			fetchValues("https://api.coinmarketcap.com/v1/ticker/nxt/");
			x("https://graphs.coinmarketcap.com/currencies/nxt/", "Nxt", "ten");
			$("#seven").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/nxt/", "Nxt", "seven");
			});
			$("#ten").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/nxt/", "Nxt", "ten");
			});
			$("#thirty").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/nxt/", "Nxt", "thirty");
			});
			$("#year").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/nxt/", "Nxt", "year");
			});
			
		}
		
		if (value == 29) {
			$("#lineChart").show();
			fetchValues("https://api.coinmarketcap.com/v1/ticker/zcoin/");
			x("https://graphs.coinmarketcap.com/currencies/zcoin/", "Zcoin", "ten");
			$("#seven").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/zcoin/", "Zcoin", "seven");
			});
			$("#ten").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/zcoin/", "Zcoin", "ten");
			});
			$("#thirty").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/zcoin/", "Zcoin", "thirty");
			});
			$("#year").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/zcoin/", "Zcoin", "year");
			});
			
		}
		
		if (value == 30) {
			$("#lineChart").show();
			fetchValues("https://api.coinmarketcap.com/v1/ticker/nexus/");
			x("https://graphs.coinmarketcap.com/currencies/nexus/", "Nexus", "ten");
			$("#seven").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/nexus/", "Nexus", "seven");
			});
			$("#ten").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/nexus/", "Nexus", "ten");
			});
			$("#thirty").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/nexus/", "Nexus", "thirty");
			});
			$("#year").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/nexus/", "Nexus", "year");
			});
			
		}
		
		if (value == 31) {
			$("#lineChart").show();
			fetchValues("https://api.coinmarketcap.com/v1/ticker/syscoin/");
			x("https://graphs.coinmarketcap.com/currencies/syscoin/", "Syscoin", "ten");
			$("#seven").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/syscoin/", "Syscoin", "seven");
			});
			$("#ten").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/syscoin/", "Syscoin", "ten");
			});
			$("#thirty").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/syscoin/", "Syscoin", "thirty");
			});
			$("#year").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/syscoin/", "Syscoin", "year");
			});
			
		}
		
		if (value == 32) {
			$("#lineChart").show();
			fetchValues("https://api.coinmarketcap.com/v1/ticker/namecoin/");
			x("https://graphs.coinmarketcap.com/currencies/namecoin/", "Namecoin", "ten");
			$("#seven").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/namecoin/", "Namecoin", "seven");
			});
			$("#ten").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/namecoin/", "Namecoin", "ten");
			});
			$("#thirty").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/namecoin/", "Namecoin", "thirty");
			});
			$("#year").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/namecoin/", "Namecoin", "year");
			});
			
		}
		
		if (value == 33) {
			$("#lineChart").show();
			fetchValues("https://api.coinmarketcap.com/v1/ticker/bitcrystals/");
			x("https://graphs.coinmarketcap.com/currencies/bitcrystals/", "Bitcrystals", "ten");
			$("#seven").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/bitcrystals/", "Bitcrystals", "seven");
			});
			$("#ten").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/bitcrystals/", "Bitcrystals", "ten");
			});
			$("#thirty").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/bitcrystals/", "Bitcrystals", "thirty");
			});
			$("#year").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/bitcrystals/", "Bitcrystals", "year");
			});
			
		}
		
		if (value == 34) {
			$("#lineChart").show();
			fetchValues("https://api.coinmarketcap.com/v1/ticker/gulden/");
			x("https://graphs.coinmarketcap.com/currencies/gulden/", "Gulden", "ten");
			$("#seven").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/gulden/", "Gulden", "seven");
			});
			$("#ten").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/gulden/", "Gulden", "ten");
			});
			$("#thirty").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/gulden/", "Gulden", "thirty");
			});
			$("#year").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/gulden/", "Gulden", "year");
			});
			
		}
		
		if (value == 35) {
			$("#lineChart").show();
			fetchValues("https://api.coinmarketcap.com/v1/ticker/byteball/");
			x("https://graphs.coinmarketcap.com/currencies/byteball/", "Byteball", "ten");
			$("#seven").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/byteball/", "Byteball", "seven");
			});
			$("#ten").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/byteball/", "Byteball", "ten");
			});
			$("#thirty").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/byteball/", "Byteball", "thirty");
			});
			$("#year").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/byteball/", "Byteball", "year");
			});
			
		}
		
		if (value == 36) {
			$("#lineChart").show();
			fetchValues("https://api.coinmarketcap.com/v1/ticker/shadowcash/");
			x("https://graphs.coinmarketcap.com/currencies/shadowcash/", "Shadowcash", "ten");
			$("#seven").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/shadowcash/", "Shadowcash", "seven");
			});
			$("#ten").click(function(){if(value == $('#myselect').val())
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/shadowcash/", "Shadowcash", "ten");
			});
			$("#thirty").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/shadowcash/", "Shadowcash", "thirty");
			});
			$("#year").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/shadowcash/", "Shadowcash", "year");
			});
			
		}
		
		if (value == 37) {
			$("#lineChart").show();
			fetchValues("https://api.coinmarketcap.com/v1/ticker/bitcoindark/");
			x("https://graphs.coinmarketcap.com/currencies/bitcoindark/", "Bitcoindark", "ten");
			$("#seven").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/bitcoindark/", "Bitcoindark", "seven");
			});
			$("#ten").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/bitcoindark/", "Bitcoindark", "ten");
			});
			$("#thirty").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/bitcoindark/", "Bitcoindark", "thirty");
			});
			$("#year").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/bitcoindark/", "Bitcoindark", "year");
			});
			
		}
		
		if (value == 38) {
			$("#lineChart").show();
			fetchValues("https://api.coinmarketcap.com/v1/ticker/antshares/");
			x("https://graphs.coinmarketcap.com/currencies/antshares/", "Antshares", "ten");
			$("#seven").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/antshares/", "Antshares", "seven");
			});
			$("#ten").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/antshares/", "Antshares", "ten");
			});
			$("#thirty").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/antshares/", "Antshares", "thirty");
			});
			$("#year").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/antshares/", "Antshares", "year");
			});
			
		}
		
		if (value == 39) {
			$("#lineChart").show();
			fetchValues("https://api.coinmarketcap.com/v1/ticker/counterparty/");
			x("https://graphs.coinmarketcap.com/currencies/counterparty/", "Counterparty", "ten");
			$("#seven").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/counterparty/", "Counterparty", "seven");
			});
			$("#ten").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/counterparty/", "Counterparty", "ten");
			});
			$("#thirty").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/counterparty/", "Counterparty", "thirty");
			});
			$("#year").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/counterparty/", "Counterparty", "year");
			});
			
		}
		
		if (value == 40) {
			$("#lineChart").show();
			fetchValues("https://api.coinmarketcap.com/v1/ticker/iocoin/");
			x("https://graphs.coinmarketcap.com/currencies/iocoin/", "I/O Coin", "ten");
			$("#seven").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/iocoin/", "I/O Coin", "seven");
			});
			$("#ten").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/iocoin/", "I/O Coin", "ten");
			});
			$("#thirty").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/iocoin/", "I/O Coin", "thirty");
			});
			$("#year").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/iocoin/", "I/O Coin", "year");
			});
			
		}
		
		if (value == 41) {
			$("#lineChart").show();
			fetchValues("https://api.coinmarketcap.com/v1/ticker/potcoin/");
			x("https://graphs.coinmarketcap.com/currencies/potcoin/", "Potcoin", "ten");
			$("#seven").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/potcoin/", "Potcoin", "seven");
			});
			$("#ten").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/potcoin/", "Potcoin", "ten");
			});
			$("#thirty").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/potcoin/", "Potcoin", "thirty");
			});
			$("#year").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/potcoin/", "Potcoin", "year");
			});
			
		}
		
		if (value == 42) {
			$("#lineChart").show();
			fetchValues("https://api.coinmarketcap.com/v1/ticker/ark/");
			x("https://graphs.coinmarketcap.com/currencies/ark/", "Ark", "ten");
			$("#seven").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/ark/", "Ark", "seven");
			});
			$("#ten").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/ark/", "Ark", "ten");
			});
			$("#thirty").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/ark/", "Ark", "thirty");
			});
			$("#year").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/ark/", "Ark", "year");
			});
			
		}
		
		if (value == 43) {
			$("#lineChart").show();
			fetchValues("https://api.coinmarketcap.com/v1/ticker/rubycoin/");
			x("https://graphs.coinmarketcap.com/currencies/rubycoin/", "Rubycoin", "ten");
			$("#seven").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/rubycoin/", "Rubycoin", "seven");
			});
			$("#ten").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/rubycoin/", "Rubycoin", "ten");
			});
			$("#thirty").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/rubycoin/", "Rubycoin", "thirty");
			});
			$("#year").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/rubycoin/", "Rubycoin", "year");
			});
			
		}
		
		if (value == 44) {
			$("#lineChart").show();
			fetchValues("https://api.coinmarketcap.com/v1/ticker/DigiByte/");
			x("https://graphs.coinmarketcap.com/currencies/DigiByte/", "DigiByte", "ten");
			$("#seven").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/DigiByte/", "DigiByte", "seven");
			});
			$("#ten").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/DigiByte/", "DigiByte", "ten");
			});
			$("#thirty").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/DigiByte/", "DigiByte", "thirty");
			});
			$("#year").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/DigiByte/", "DigiByte", "year");
			});
			
		}
		
		if (value == 45) {
			$("#lineChart").show();
			fetchValues("https://api.coinmarketcap.com/v1/ticker/nexium/");
			x("https://graphs.coinmarketcap.com/currencies/nexium/", "Nexium", "ten");
			$("#seven").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/nexium/", "Nexium", "seven");
			});
			$("#ten").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/nexium/", "Nexium", "ten");
			});
			$("#thirty").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/nexium/", "Nexium", "thirty");
			});
			$("#year").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/nexium/", "Nexium", "year");
			});
			
		}
		
		if (value == 46) {
			$("#lineChart").show();
			fetchValues("https://api.coinmarketcap.com/v1/ticker/blackcoin/");
			x("https://graphs.coinmarketcap.com/currencies/blackcoin/", "BlackCoin", "ten");
			$("#seven").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/blackcoin/", "BlackCoin", "seven");
			});
			$("#ten").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/blackcoin/", "BlackCoin", "ten");
			});
			$("#thirty").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/blackcoin/", "BlackCoin", "thirty");
			});
			$("#year").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/blackcoin/", "BlackCoin", "year");
			});
			
		}
		
		if (value == 47) {
			$("#lineChart").show();
			fetchValues("https://api.coinmarketcap.com/v1/ticker/nav-coin/");
			x("https://graphs.coinmarketcap.com/currencies/nav-coin/", "NavCoin", "ten");
			$("#seven").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/nav-coin/", "NavCoin", "seven");
			});
			$("#ten").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/nav-coin/", "NavCoin", "ten");
			});
			$("#thirty").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/nav-coin/", "NavCoin", "thirty");
			});
			$("#year").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/nav-coin/", "NavCoin", "year");
			});
			
		}
		
		if (value == 48) {
			$("#lineChart").show();
			fetchValues("https://api.coinmarketcap.com/v1/ticker/nav-coin/");
			x("https://graphs.coinmarketcap.com/currencies/nav-coin/", "NavCoin", "ten");
			$("#seven").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/nav-coin/", "NavCoin", "seven");
			});
			$("#ten").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/nav-coin/", "NavCoin", "ten");
			});
			$("#thirty").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/nav-coin/", "NavCoin", "thirty");
			});
			$("#year").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/nav-coin/", "NavCoin", "year");
			});
			
		}
		
		if (value == 49) {
			$("#lineChart").show();
			fetchValues("https://api.coinmarketcap.com/v1/ticker/ubiq/");
			x("https://graphs.coinmarketcap.com/currencies/ubiq/", "Ubiq", "ten");
			$("#seven").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/ubiq/", "Ubiq", "seven");
			});
			$("#ten").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/ubiq/", "Ubiq", "ten");
			});
			$("#thirty").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/ubiq/", "Ubiq", "thirty");
			});
			$("#year").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/ubiq/", "Ubiq", "year");
			});
			
		}
		
		if (value == 50) {
			$("#lineChart").show();
			fetchValues("https://api.coinmarketcap.com/v1/ticker/ybcoin/");
			x("https://graphs.coinmarketcap.com/currencies/ybcoin/", "YbCoin", "ten");
			$("#seven").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/ybcoin/", "YbCoin", "seven");
			});
			$("#ten").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/ybcoin/", "YbCoin", "ten");
			});
			$("#thirty").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/ybcoin/", "YbCoin", "thirty");
			});
			$("#year").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/ybcoin/", "YbCoin", "year");
			});
			
		}
		
		if (value == 51) {
			$("#lineChart").show();
			fetchValues("https://api.coinmarketcap.com/v1/ticker/bitbay/");
			x("https://graphs.coinmarketcap.com/currencies/bitbay/", "BitBay", "ten");
			$("#seven").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/bitbay/", "BitBay", "seven");
			});
			$("#ten").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/bitbay/", "BitBay", "ten");
			});
			$("#thirty").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/bitbay/", "BitBay", "thirty");
			});
			$("#year").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/bitbay/", "BitBay", "year");
			});
			
		}
		
		if (value == 52) {
			$("#lineChart").show();
			fetchValues("https://api.coinmarketcap.com/v1/ticker/arcticcoin/");
			x("https://graphs.coinmarketcap.com/currencies/arcticcoin/", "ArticCoin", "ten");
			$("#seven").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/arcticcoin/", "ArticCoin", "seven");
			});
			$("#ten").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/arcticcoin/", "ArticCoin", "ten");
			});
			$("#thirty").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/arcticcoin/", "ArticCoin", "thirty");
			});
			$("#year").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/arcticcoin/", "ArticCoin", "year");
			});
			
		}
		
		if (value == 53) {
			$("#lineChart").show();
			fetchValues("https://api.coinmarketcap.com/v1/ticker/gridcoin/");
			x("https://graphs.coinmarketcap.com/currencies/gridcoin/", "GridCoin", "ten");
			$("#seven").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/gridcoin/", "GridCoin", "seven");
			});
			$("#ten").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/gridcoin/", "GridCoin", "ten");
			});
			$("#thirty").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/gridcoin/", "GridCoin", "thirty");
			});
			$("#year").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/gridcoin/", "GridCoin", "year");
			});
			
		}
		
		if (value == 54) {
			$("#lineChart").show();
			fetchValues("https://api.coinmarketcap.com/v1/ticker/novacoin/");
			x("https://graphs.coinmarketcap.com/currencies/novacoin/", "NovaCoin", "ten");
			$("#seven").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/novacoin/", "NovaCoin", "seven");
			});
			$("#ten").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/novacoin/", "NovaCoin", "ten");
			});
			$("#thirty").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/novacoin/", "NovaCoin", "thirty");
			});
			$("#year").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/novacoin/", "NovaCoin", "year");
			});
			
		}
		
		if (value == 55) {
			$("#lineChart").show();
			fetchValues("https://api.coinmarketcap.com/v1/ticker/viacoin/");
			x("https://graphs.coinmarketcap.com/currencies/viacoin/", "ViaCoin", "ten");
			$("#seven").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/viacoin/", "ViaCoin", "seven");
			});
			$("#ten").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/viacoin/", "ViaCoin", "ten");
			});
			$("#thirty").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/viacoin/", "ViaCoin", "thirty");
			});
			$("#year").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/viacoin/", "ViaCoin", "year");
			});
			
		}
		
		if (value == 56) {
			$("#lineChart").show();
			fetchValues("https://api.coinmarketcap.com/v1/ticker/library-credit/");
			x("https://graphs.coinmarketcap.com/currencies/library-credit/", "Library-Credit", "ten");
			$("#seven").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/library-credit/", "Library-Credit", "seven");
			});
			$("#ten").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/library-credit/", "Library-Credit", "ten");
			});
			$("#thirty").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/library-credit/", "Library-Credit", "thirty");
			});
			$("#year").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/library-credit/", "Library-Credit", "year");
			});
			
		}
		
		if (value == 57) {
			$("#lineChart").show();
			fetchValues("https://api.coinmarketcap.com/v1/ticker/golem-network-tokens/");
			x("https://graphs.coinmarketcap.com/currencies/golem-network-tokens/", "Golem", "ten");
			$("#seven").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/golem-network-tokens/", "Golem", "seven");
			});
			$("#ten").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/golem-network-tokens/", "Golem", "ten");
			});
			$("#thirty").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/golem-network-tokens/", "Golem", "thirty");
			});
			$("#year").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/golem-network-tokens/", "Golem", "year");
			});
			
		}
		
		if (value == 58) {
			$("#lineChart").show();
			fetchValues("https://api.coinmarketcap.com/v1/ticker/rlc/");
			x("https://graphs.coinmarketcap.com/currencies/rlc/", "iEx.ec", "ten");
			$("#seven").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/rlc/", "iEx.ec", "seven");
			});
			$("#ten").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/rlc/", "iEx.ec", "ten");
			});
			$("#thirty").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/rlc/", "iEx.ec", "thirty");
			});
			$("#year").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/rlc/", "iEx.ec", "year");
			});
			
		}
		
			if (value == 59) {
			$("#lineChart").show();
			fetchValues("https://api.coinmarketcap.com/v1/ticker/trust/");
			x("https://graphs.coinmarketcap.com/currencies/trust/", "TrustCoin", "ten");
			$("#seven").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/trust/", "TrustCoin", "seven");
			});
			$("#ten").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/trust/", "TrustCoin", "ten");
			});
			$("#thirty").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/trust/", "TrustCoin", "thirty");
			});
			$("#year").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/trust/", "TrustCoin", "year");
			});
			
		}
		
			if (value == 60) {
			$("#lineChart").show();
			fetchValues("https://api.coinmarketcap.com/v1/ticker/tokencard/");
			x("https://graphs.coinmarketcap.com/currencies/tokencard/", "TokenCard", "ten");
			$("#seven").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/tokencard/", "TokenCard", "seven");
			});
			$("#ten").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/tokencard/", "TokenCard", "ten");
			});
			$("#thirty").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/tokencard/", "TokenCard", "thirty");
			});
			$("#year").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/tokencard/", "TokenCard", "year");
			});
			
		}
		
			if (value == 61) {
			$("#lineChart").show();
			fetchValues("https://api.coinmarketcap.com/v1/ticker/wings/");
			x("https://graphs.coinmarketcap.com/currencies/wings/", "Wings", "ten");
			$("#seven").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/wings/", "Wings", "seven");
			});
			$("#ten").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/wings/", "Wings", "ten");
			});
			$("#thirty").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/wings/", "Wings", "thirty");
			});
			$("#year").click(function(){
				if(value == $('#myselect').val())
				x("https://graphs.coinmarketcap.com/currencies/wings/", "Wings", "year");
			});
			
		}
		
		if (value == 62) {
			$("#lineChart").show();
			x("https://graphs.coinmarketcap.com/currencies/monero/", "Monero", "ten");
		}
		
		if (value == 63) {
			$("#lineChart").show();
			x("https://graphs.coinmarketcap.com/currencies/monero/", "Monero");
		}
		
		if (value == 64) {
			$("#lineChart").show();
			x("https://graphs.coinmarketcap.com/currencies/monero/", "Monero");
		}
		
		if (value == 65) {
			$("#lineChart").show();
			x("https://graphs.coinmarketcap.com/currencies/monero/", "Monero");
		}
		
		if (value == 66) {
			$("#lineChart").show();
			x("https://graphs.coinmarketcap.com/currencies/monero/", "Monero");
		}
		
		if (value == 67) {
			$("#lineChart").show();
			x("https://graphs.coinmarketcap.com/currencies/monero/", "Monero");
		}
		
		if (value == 68) {
			$("#lineChart").show();
			x("https://graphs.coinmarketcap.com/currencies/monero/", "Monero");
		}
		
		if (value == 69) {
			$("#lineChart").show();
			x("https://graphs.coinmarketcap.com/currencies/monero/", "Monero");
		}
		
		if (value == 70) {
			$("#lineChart").show();
			x("https://graphs.coinmarketcap.com/currencies/monero/", "Monero");
		}
		
		if (value == 71) {
			$("#lineChart").show();
			x("https://graphs.coinmarketcap.com/currencies/monero/", "Monero");
		}
		
		if (value == 72) {
			$("#lineChart").show();
			x("https://graphs.coinmarketcap.com/currencies/monero/", "Monero");
		}
		
		if (value == 73) {
			$("#lineChart").show();
			x("https://graphs.coinmarketcap.com/currencies/monero/", "Monero");
		}
		
		if (value == 74) {
			$("#lineChart").show();
			x("https://graphs.coinmarketcap.com/currencies/monero/", "Monero");
		}
		
		if (value == 75) {
			$("#lineChart").show();
			x("https://graphs.coinmarketcap.com/currencies/monero/", "Monero");
		}
		
		if (value == 76) {
			$("#lineChart").show();
			x("https://graphs.coinmarketcap.com/currencies/monero/", "Monero");
		}
		
	}));

});