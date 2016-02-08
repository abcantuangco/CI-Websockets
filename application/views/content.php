<div class="container">
	<div class="page-header">
		<h1>Websockets</h1>
	</div>
	<div class="container">
		<h3>Live Random Graph</h3>
		<div id="container" style="min-width: 310px; height: 400px; margin: 0 auto"></div>
		<span class="pull-right">
			<button type="button" class="btn btn-primary" id="reset-chart">Reset Chart</button>
		</span>
	</div>
	<div class="container">
		<h3>Data Form</h3>
		<div class="data-form">
			<form action="" id="data-form">
				<div class="form-group">
					<label for="x_input">X Value</label>
					<input type="text" class="form-control" name="x" id="x_input" placeholder="X Value">
				</div>
				<div class="form-group">
					<label for="x_input">Y Value</label>
					<input type="text" class="form-control" name="y" id="x_input" placeholder="Y Value">
				</div>
				<div class="form-group">
					<span class="pull-right">
						<button type="submit" class="btn btn-primary">Send Data</button>
					</span>
				</div>
			</form>
		</div>
	</div>
</div>