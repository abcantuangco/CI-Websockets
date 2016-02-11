<?php

use Ratchet\Server\IoServer;
use Ratchet\Http\HttpServer;
use Ratchet\WebSocket\WsServer;

	require __DIR__ . '/application/third_party/vendor/autoload.php';

	$server = IoServer::factory(
		new HttpServer(
		),
		8888
	);

	$server->run();