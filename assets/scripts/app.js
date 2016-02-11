var App = function() {

	var initCharts = function() {
		var options = {
			chart: {
				type: 'bar',
				animation: Highcharts.svg, // don't animate in old IE
				marginRight: 10
			},
			title: {
				text: ''
			},
			xAxis: {
				type: 'integer',
				tickPixelInterval: 150
			},
			yAxis: {
				title: {
					text: 'Value'
				},
				plotLines: [{
					value: 0,
					width: 1,
					color: '#808080'
				}]
			},
			tooltip: {
				formatter: function () {
					return '<b>' + '(' + this.x + ', ' + this.y + ')' + '</b>';
				}
			},
			legend: {
				enabled: false
			},
			exporting: {
				enabled: false
			},
			series: [{
				name: 'Random data',
				data: (function () {
					// generate an array of random data
					var data = [];
						data.push({
							x: 0,
							y: 0
						});
					return data;
				}())
			}]
		};
		$('#container').highcharts(options);
	};

	var updateChart = function(data) {
		var chart = $('#container').highcharts();
		chart.series[0].addPoint([
			parseInt(data.x),
			parseInt(data.y)
		]);
	};

	var initResetChart = function(data) {
		var container = $('#container'),
			resetBtn = $('#reset-chart'),
			chart = container.highcharts(),
			series = chart.series[0],
			options = {
				chart: {
					type: 'bar',
					animation: Highcharts.svg, // don't animate in old IE
					marginRight: 10
				},
				title: {
					text: ''
				},
				xAxis: {
					type: 'integer',
					tickPixelInterval: 150
				},
				tooltip: {
					formatter: function () {
						return '<b>' + '(' + this.x + ', ' + this.y + ')' + '</b>';
					}
				},
				legend: {
					enabled: false
				},
				exporting: {
					enabled: false
				},
				series: [{
					name: 'Random data',
					data: (function () {
						// generate an array of random data
						var data = [];
							data.push({
								x: 0,
								y: 0
							});
						return data;
					}())
				}]
			};
		if (resetBtn.length > 0) {
			resetBtn.on('click', function(e){
				e.preventDefault();
				console.log(chart.series);
				if (chart.series !== undefined) {
					series.remove(true);
					chart = container.highcharts(options);
				}
			});
		}
	};

	var initHighcharts = function() {
		Highcharts.setOptions({
			global: {
				useUTC: false
			}
		});
	};

	var handleDataForm = function() {
		var $form = $('form#data-form');

		$form.submit(function(e) {
			e.preventDefault();
			$.ajax({
				url: BASE_URL + 'index.php/websocket/receive_data',
				method: 'POST',
				data: $form.serialize(),
				dataType: 'json',
				beforeSend: function (xhr) {
					xhr.overrideMimeType("text/plain; charset=x-user-defined");
				},
				success: function (data) {
					if (data.code === '200') {
						updateChart(data);
					}
					console.log(data);
				},
				error: function (xhr, status, errorThrown) {
					console.log(xhr);
					console.log(status);
					console.log(errorThrown);
				}
			});
		});
	};


	return {
		init: function() {
			initHighcharts();
			initCharts();
			initResetChart();
			handleDataForm();
		}
	};
}();

$(document).ready(function(){
	App.init();
});