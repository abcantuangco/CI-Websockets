<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Websocket extends CI_Controller {

	public function index()
	{
		$this->load->view('common/header');
		$this->load->view('content');
		$this->load->view('common/footer');
	}

	public function receive_data()
	{
		$data = $_POST;

		try {

			if (!isset($data['x']) || $data['x'] <= 0)
				throw new Exception("X must be greater than zero.", 401);

			if (!isset($data['y']) || $data['y'] <= 0)
				throw new Exception("Y must be greater than zero.", 401);

			$data['code'] = (string) 200;
			$response = $data;

		} catch (Exception $e) {
			$response = array('code' => (string) $e->getCode(),
				'message' => $e->getMessage());
		}

		$this->output
						->set_content_type('application/json')
						->set_output(json_encode( $response ));

	}
}

/* End of file websocket.php */
/* Location: ./application/controllers/websocket.php */