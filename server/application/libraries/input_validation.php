<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Input_validation
{
    protected $CI;

    public function __construct()
    {
        $this->CI = &get_instance();
        $this->CI->load->library('form_validation');
        $this->CI->load->library('upload');
    }

    // form validation rules
    public function is_valid($fields)
    {
        $this->CI->form_validation->set_data($fields);

        // Validation rules
        // Product Info
        // page 1
        $this->CI->form_validation->set_rules('title', 'Title', 'required');
        $this->CI->form_validation->set_rules('extra_info_title', 'Info Title');
        $this->CI->form_validation->set_rules('extra_info_description', 'Info Description');
        $this->CI->form_validation->set_rules('meta_title', 'Meta Title');
        $this->CI->form_validation->set_rules('meta_keywords', 'Meta Keywords');
        $this->CI->form_validation->set_rules('meta_description', 'Meta Description');
        $this->CI->form_validation->set_rules('seo_url', 'SEO URL');
        $this->CI->form_validation->set_rules('description', 'Description');
        $this->CI->form_validation->set_rules('video_embed_code', 'Video Embed Code');
        // page 2
        $this->CI->form_validation->set_rules('product_code', 'Product Code', 'required');
        $this->CI->form_validation->set_rules('quantity', 'Quantity', 'required|integer');
        $this->CI->form_validation->set_rules('quantity_type', 'Quantity Type');
        $this->CI->form_validation->set_rules('cart_discount', 'Cart Discount', 'integer');
        $this->CI->form_validation->set_rules('tax_rate', 'Tax Rate', 'integer');
        $this->CI->form_validation->set_rules('sale_price_usd', 'Sale Price USD', 'numeric|decimal');
        $this->CI->form_validation->set_rules('sale_price_try', 'Sale Price TRY', 'required|numeric|decimal');
        $this->CI->form_validation->set_rules('sale_price_eur', 'Sale Price EUR', 'numeric|decimal');
        $this->CI->form_validation->set_rules('second_sale_price', 'Second Sale Price', 'required|decimal|numeric');
        $this->CI->form_validation->set_rules('deduct_from_stock', 'Deduct From Stock', 'required|in_list[true,false]');
        $this->CI->form_validation->set_rules('status', 'Status', 'required|in_list[active,inactive]');
        $this->CI->form_validation->set_rules('show_features', 'Show Features', 'required|in_list[true,false]');
        $this->CI->form_validation->set_rules('product_validity_periods','Validity Period','required|valid_date');
        $this->CI->form_validation->set_rules('sort_order', 'Sort Order', 'required|integer');
        $this->CI->form_validation->set_rules('show_on_homepage', 'Show On Homepage', 'required|integer');
        $this->CI->form_validation->set_rules('is_new', 'Is New', 'required|in_list[true,false]');
        $this->CI->form_validation->set_rules('installment', 'Installment', 'required|in_list[true,false]');
        $this->CI->form_validation->set_rules('guarantee_period', 'Installment Period', 'required');

        // form validation rules check
        if ($this->CI->form_validation->run() === FALSE) {
            $this->CI->output->set_status_header(200); 
            $this->CI->output->set_output(json_encode([
                'success' => false,
                'message' => $this->CI->form_validation->error_array()]
            ));
            return false;
        }

        // response
        return [
            'success' => true,
            'message' => 'Validation passed'
        ];
    }

    // form validation rules for discounts
    // i don't want to use 
    public function is_valid_product($fields){

        // set form data
        $this->CI->form_validation->set_data($fields);

        // form validation rules
        $this->CI->form_validation->set_rules('customer_group', 'Customer Group', 'required');
        $this->CI->form_validation->set_rules('priority', 'Priority', 'required|integer');
        $this->CI->form_validation->set_rules('start_date', 'Start Date', 'required|valid_date');
        $this->CI->form_validation->set_rules('end_date', 'End Date', 'required|valid_date');
        $start = DateTime::createFromFormat('Y-m-d', $fields['start_date']);
        $end = DateTime::createFromFormat('Y-m-d', $fields['end_date']);
    
        // validate end date
        if($start > $end){
            $this->CI->form_validation->set_message('valid_date', 'The end date must be greater than the start date.');
            return false;
        }

        // validate discounts
        foreach ($fields['discounts'] as $discount) {
            if($discount['unit'] == 'tl'){
                $this->CI->form_validation->set_rules("discounts[$discount][amount]", 'Amount', 'required|numeric');
                $this->CI->form_validation->set_rules("discounts[$discount][type]", 'Type', 'required');
                $this->CI->form_validation->set_rules("discounts[$discount][unit]", 'Unit', 'required');
            } else {
                $this->CI->form_validation->set_rules("discounts[$discount][amount]", 'Amount');
                $this->CI->form_validation->set_rules("discounts[$discount][type]", 'Type');
                $this->CI->form_validation->set_rules("discounts[$discount][unit]", 'Unit');
            }
        }

        // form validation rules check
        if ($this->CI->form_validation->run() === FALSE) {
            $this->CI->output->set_status_header(200); 
            $this->CI->output->set_output(json_encode([
                'success' => false,
                'message' => $this->CI->form_validation->error_array()]
            ));
            return false;
        }

        // response
        return true;
    }
    
}
