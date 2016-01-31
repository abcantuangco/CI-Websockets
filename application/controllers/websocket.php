<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Websocket extends CI_Controller {

	public function index()
	{
		$this->load->view('common/header');
		$this->load->view('content');
		$this->load->view('common/footer');
	}
}

/* End of file websocket.php */
/* Location: ./application/controllers/websocket.php */