var App = function() {

	var initCharts = function() {
		$('#container').highcharts({
			chart: {
				type: 'spline',
				animation: Highcharts.svg, // don't animate in old IE
				marginRight: 10,
				events: {
					load: function () {

						// set up the updating of the chart each second
						/*var series = this.series[0];
						setInterval(function () {
							var x = (new Date()).getTime(), // current time
								y = Math.random();
							series.addPoint([x, y], true, true);
						}, 1000);*/
					}
				}
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
		});
	};

	var updateChart = function(data) {
		var chart = $('#container').highcharts();
		chart.series[0].addPoint([
			parseInt(data.x),
			parseInt(data.y)
		]);
	};

	var initResetChart = function(data) {
		var resetBtn = $('#reset-chart');
		if (resetBtn.length > 0) {
			resetBtn.on('click', function(e){
				e.preventDefault();
				$('#container').highcharts({
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
				});
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