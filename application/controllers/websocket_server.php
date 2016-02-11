<?php 

require APPPATH . "third_party/php-websocket-server/websocket_server.class.php";

class Websocket_server extends WebSocketServer
{
	public $lastupdate = 0;

	public function onMessage($client,$msg)
	{
		return;
	}
	
	public function onConnect($client)
	{
		return;
	}
	
	public function onDisconnect($client)
	{
		return;
	}

	public function onTick($client)
	{

		if($this->lastupdate < time())
		{

			$this->lastupdate = time() + 10;

			//send false as 2ns param to send to all clients
			$client->broadcastData(json_encode((object) array('now' => date('c'))),false);

		}

	}

}

// Configuration variables
$host = 'localhost';
$port = 8888;

$wsServer = new Websocket_server($host,$port);
$wsServer->start();