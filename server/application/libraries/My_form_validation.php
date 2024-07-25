<?php
defined('BASEPATH') or exit('No direct script access allowed');

class MY_form_validation extends CI_Form_validation
{

    public function __construct($rules = array())
    {
        parent::__construct($rules);
    }

    // custom validation rules
    public function valid_date($date)
    {
        // date format
        $d = DateTime::createFromFormat('Y-m-d', $date);

        // validate date
        if ($d === false || $d->format('Y-m-d') !== $date) {
            $this->CI->form_validation->set_message('valid_date', 'The {field} field must contain a valid date.');
            return false;
        }

        // validate date
        $today = date('Y-m-d');
        if (strtotime($date) <= strtotime($today)) {
            $this->CI->form_validation->set_message('valid_date', 'The {field} field must contain a date after today.');
            return false;
        }

        // response
        return true;
    }
    
}
