<?php

defined('BASEPATH') or exit('No direct script access allowed');

class Api extends CI_Controller
{

    public function __construct()
    {
        parent::__construct();
        // CORS
        header("Access-Control-Allow-Origin: *");
        header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
        header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept, Authorization");

        $this->load->model('Product_model');
        $this->load->library('input_validation');
        $this->load->helper(array('form', 'url'));
        $this->load->library('form_validation');
        $this->load->library('upload');
        $this->output->set_content_type('application/json');
    }

    // get all products

    public function get_products()
    {
        // get products
        $products = $this->Product_model->get_products();
        if (empty($products)) {
            $this->output->set_status_header(201);
            $this->output->set_output(json_encode([
                'success' => false,
                'message' => 'No products found'
            ]));
        }
        
        // response
        $this->output->set_output(json_encode([
            'success' => true,
            'products' => $products
        ]));
    }

    // get product by id

    public function get_product($id = NULL)
    {
        if ($id !== NULL && is_numeric($id)) {
            // get single product
            $product = $this->Product_model->get_product_by_id($id);
            $this->output->set_status_header(201);

            // response
            if ($product === false) {
                $this->output->set_output(json_encode([
                    'success' => false,
                    'message' => 'Product not found'
                ]));
            } else{
                $this->output->set_output(json_encode([
                    'success' => true,
                    'product' => $product
                ]));
            }
            
        }
    }

    // add product

    public function add_product()
    {
        $fields = $this->input->post();
        $this->input_validation->is_valid($fields);

        // upload images

        $main_image = isset($_FILES['main_image']) ? $_FILES['main_image'] : null;
        $sub_images = isset($_FILES['sub_images']) ? $_FILES['sub_images'] : null;
        $upload_path = '/uploads/products/';

        $image_config = array(
            'upload_path' => '.' . $upload_path,
            'allowed_types' => 'gif|jpg|png|jpeg',
            'max_size' => '4096'
        );
        if (!is_dir($image_config['upload_path'])) {
            mkdir($image_config['upload_path'], 0755, true);
        }

        $images = [];

        // upload main image
        if ($main_image) {
            $this->load->library('upload', $image_config);
            $this->upload->initialize($image_config);

            if (!$this->upload->do_upload('main_image')) {
                $this->output->set_status_header(201);
                $this->output->set_output(json_encode([
                    'success' => false,
                    'message' => 'Failed to upload main image ' . $this->upload->display_errors()
                ]));
            }

            $image = $this->upload->data();
            $images['main_image'] = $image['file_name'];
        }

        // upload sub images
        if ($sub_images) {
            $images['sub_images'] = [];

            foreach ($sub_images['name'] as $key => $value) {
                $_FILES['sub_image']['name'] = $sub_images['name'][$key];
                $_FILES['sub_image']['type'] = $sub_images['type'][$key];
                $_FILES['sub_image']['tmp_name'] = $sub_images['tmp_name'][$key];
                $_FILES['sub_image']['error'] = $sub_images['error'][$key];
                $_FILES['sub_image']['size'] = $sub_images['size'][$key];

                $this->upload->initialize($image_config);

                if (!$this->upload->do_upload('sub_image')) {
                    $this->output->set_status_header(200);
                    $this->output->set_output(json_encode([
                        'success' => false,
                        'message' => $this->upload->display_errors()
                    ]));
                    return false;
                }

                $image = $this->upload->data();
                array_push($images['sub_images'], $image['file_name']);
            }
        }

        
        // upload discount

        if (isset($fields['discounts']) && is_array($fields['discounts']) && !empty($fields['discounts'])) {
            foreach ($fields['discounts'] as $index => $item) {
                if (empty($item['customer_group'])) {
                    $err = ' Customer Group is required.';
                    $this->form_validation->set_message('fields[discounts][' . $index . '][customer_group]', $err);
                }
                if (!is_numeric($item['priority'])) {
                    $err = ' Priority must be a number.';
                    $this->form_validation->set_message('fields[discounts][' . $index . '][priority]', $err);
                }
                if (empty($item['startDate']) || !strtotime($item['startDate'])) {
                    $err = ' Start Date is required and must be a valid date.';
                    $this->form_validation->set_message('fields[discounts][' . $index . '][startDate]', $err);
                }
                if (empty($item['endDate']) || !strtotime($item['endDate'])) {
                    $err = ' End Date is required and must be a valid date.';
                    $this->form_validation->set_message('fields[discounts][' . $index . '][endDate]', $err);
                }
                if (strtotime($item['startDate']) >= strtotime($item['endDate'])) {
                    $err = ' End Date must be greater than Start Date.';
                    $this->form_validation->set_message('fields[discounts][' . $index . '][endDate]', $err);
                }
            }

        }

        // validate form errors check
        if ($this->form_validation->run() == FALSE) {
            $this->output->set_status_header(201);
            $this->output->set_output(json_encode([
                'success' => false,
                'message' => $this->form_validation->error_array()
            ]));
        } else {

            // insert product

            if(isset($fields['main_image']) && !empty($fields['main_image'])){
                $img = $upload_path . $images['main_image'];
            }else {
                $img = null;
            }
            $product_id = $this->Product_model->add_product($fields , $img);
            if (isset($images['sub_images']) && !empty($images['sub_images'])) {
                $this->Product_model->add_product_image($product_id, $upload_path, $images['sub_images']);
            }
            if (isset($fields['discounts']) && !empty($fields['discounts'])) {
                $this->Product_model->add_product_discounts($product_id, $fields['discounts']);
            }
            // response
            $this->output->set_status_header(201);
            $this->output->set_output(json_encode([
                'success' => true,
                'message' => 'Product created',
            ]));
        }
    }


    // update product by id

    public function update_product($id)
    {
        $fields = $this->input->post();

        // validate form
        $this->input_validation->is_valid($fields);

        // validate discounts
        if (isset($fields['discounts']) && is_array($fields['discounts']) && !empty($fields['discounts'])) {
            
            foreach ($fields['discounts'] as $index => $item) {
                if (empty($item['customer_group'])) {
                    $err = ' Customer Group is required.';
                    $this->form_validation->set_message('fields[discounts][' . $index . '][customer_group]', $err);
                }
                if (!is_numeric($item['priority'])) {
                    $err = ' Priority must be a number.';
                    $this->form_validation->set_message('fields[discounts][' . $index . '][priority]', $err);
                }
                if (empty($item['start_date']) || !strtotime($item['start_date'])) {
                    $err = ' Start Date is required and must be a valid date.';
                    $this->form_validation->set_message('fields[discounts][' . $index . '][start_date]', $err);
                }
                if (empty($item['end_date']) || !strtotime($item['end_date'])) {
                    $err = ' End Date is required and must be a valid date.';
                    $this->form_validation->set_message('fields[discounts][' . $index . '][endDate]', $err);
                }
                if (strtotime($item['start_date']) >= strtotime($item['end_date'])) {
                    $err = ' End Date must be greater than Start Date.';
                    $this->form_validation->set_message('fields[discounts][' . $index . '][endDate]', $err);
                }
            }

        }

        // validate form errors check
        if ($this->form_validation->run() == FALSE) {
            $this->output->set_status_header(201);
            $this->output->set_output(json_encode([
                'success' => false,
                'message' => $this->form_validation->error_array()
            ]));
        } else {            
            
            // update product
            $this->Product_model->update_product($id , $fields);
            if(isset($fields['discounts']) && !empty($fields['discounts'])){
                // update discounts
                $this->Product_model->update_discounts($fields['discounts']);
            }
            
            // response
            $this->output->set_status_header(201);
            $this->output->set_output(json_encode([
                'success' => true,
                'message' => 'Product updated ' . $id,
            ]));
        }

    }

    public function delete_products() {
        // get data
        $data = json_decode($this->input->raw_input_stream, true);
        $ids = [];
    
        try {
            // validate data
            if (!isset($data['id']) || !is_array($data['id'])) {
                throw new Exception('Invalid input format. "ids" should be an array.');
            }
            // validate ids
            foreach ($data['id'] as $id) {
                if (!is_int($id)) {
                    throw new Exception('Invalid id format. IDs should be integers.');
                }
                $ids[] = intval($id);
            }
            
            // delete products
            $ck = $this->Product_model->delete_products($ids);

            // response
            if($ck){
                $this->output->set_status_header(200);
                $this->output->set_output(json_encode([
                    'success' => true,
                    'message' => 'Products deleted',
                    'ids' => $ids,
                ]));
            }else{
                $this->output->set_status_header(400);
                $this->output->set_output(json_encode([
                    'success' => false,
                    'message' => 'Error while deleting products and related data.',
                ]));
            }
        } catch (Exception $e) {
            $this->output->set_status_header(201);
            $this->output->set_output(json_encode([
                'success' => false,
                'message' => 'Error: ' . $e->getMessage(),
            ]));
        }
    }
    
}
