<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Upload extends CI_Controller {

    public function __construct() {
        parent::__construct();
        $this->load->helper(array('form', 'url'));
    }

    public function upload_image() {
        if ($_FILES['image']['name']) {
            $config['upload_path'] = './uploads/';
            $config['allowed_types'] = 'gif|jpg|png';
            $config['max_size'] = 1000;
            $config['max_width'] = 1024;
            $config['max_height'] = 768;

            $this->load->library('upload', $config);

            if (!$this->upload->do_upload('image')) {
                $error = array('error' => $this->upload->display_errors());
                echo json_encode($error);
            } else {
                $data = array('upload_data' => $this->upload->data());
                echo json_encode($data);
            }
        } else {
            echo json_encode(array('error' => 'No file selected'));
        }
    }
}
