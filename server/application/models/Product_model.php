<?php
class Product_model extends CI_Model
{

    public function __construct()
    {
        $this->load->database();
    }


    // get product data by product id
    public function get_meta_by_product_id($id)
    {
        $query = $this->db->get_where('products', array('id' => $id));
        return $query->row_array();
    }

    // get product images (sub images) by product id
    public function get_images_by_product_id($id)
    {
        $this->db->select('*');
        $this->db->from('product_images');
        $this->db->where('product_id', $id);
        $query = $this->db->get();
        if ($query->num_rows() > 0) {
            return $query->result_array();
        } else {
            return array();
        }
    }

    // get product discounts by product id
    public function get_discount_by_product_id($id)
    {
        $this->db->select('*');
        $this->db->from('product_discounts');
        $this->db->where('product_id', $id);
        $query = $this->db->get();
        if ($query->num_rows() > 0) {
            return $query->result_array();
        } else {
            return array();
        }
    }

    // get all products meta data (title, description, etc.)
    public function get_products()
    {
        $query = $this->db->get('products');
        return $query->result_array();
    }

    // get single product all data (meta , imgs , etc.)
    public function get_product_by_id($id)
    {
        $product = $this->db->get_where('products', ['id' => $id])->row_array();
        if (!$product) {
            return false;
        }
        $meta = $this->get_meta_by_product_id($id);
        $images = $this->get_images_by_product_id($id);
        $discount = $this->get_discount_by_product_id($id);
        $data = array_merge(
            $meta,
            [
                'sub_images' => $images,
                'discounts' => $discount
            ]
        );
        return $data;
    }

    // add product
    public function add_product($data, $main_image)
    {
        $product = [
            "title",
            "extra_info_title",
            "extra_info_description",
            "meta_title",
            "meta_keywords",
            "meta_description",
            "seo_url",
            "description",
            "video_embed_code",
            "product_code",
            "quantity",
            "quantity_type",
            "cart_discount",
            "tax_rate",
            "sale_price_usd",
            "sale_price_try",
            "sale_price_eur",
            "second_sale_price",
            "deduct_from_stock",
            "status",
            "show_features",
            "product_validity_periods",
            "sort_order",
            "show_on_homepage",
            "is_new",
            "installment",
            "guarantee_period",
        ];


        $arr = [];
        // validate data if in fields
        foreach ($data as $key => $value) {
            if (in_array($key, $product)) {
                $arr[$key] = $value;
            }
        }
        // set main image
        if ($main_image && !is_array($main_image)) {
            $arr['main_image'] = $main_image;
        }

        $this->db->insert('products', $arr);
        $product_id = $this->db->insert_id();

        // return product id 
        return $product_id;
    }

    // add product discounts by product id
    public function add_product_discounts($product_id, $dc)
    {
        $discounts = [];
        // set discounts
        foreach ($dc as $discount) {
            $baseDiscount = [
                'product_id' => $product_id,
                'customer_group' => $discount['customer_group'],
                'priority' => $discount['priority'],
                'start_date' => $discount['startDate'],
                'end_date' => $discount['endDate'],
                'prices' => []
            ];
            // set discount prices
            foreach ($discount['discounts'] as $dc) {
                $amount = isset($dc['amount']) ? $dc['amount'] : 0.00;
                if ($dc['unit'] == 'dolar') {
                    $baseDiscount['prices'][] = [
                        'discount_price_usd' => $amount,
                        'discount_type_usd' => $dc['type']
                    ];
                } elseif ($dc['unit'] == 'tl') {
                    $baseDiscount['prices'][] = [
                        'discount_price_try' => $amount,
                        'discount_type_try' => $dc['type']
                    ];
                } elseif ($dc['unit'] == 'euro') {
                    $baseDiscount['prices'][] = [
                        'discount_price_eur' => $amount,
                        'discount_type_eur' => $dc['type']
                    ];
                }
            }
            $discounts[] = $baseDiscount;
        }

        // insert discounts
        foreach ($discounts as $discount) {
            $this->db->insert('product_discounts', [
                'product_id' => $product_id,
                'customer_group' => $discount['customer_group'],
                'priority' => $discount['priority'],
                'start_date' => $discount['start_date'],
                'end_date' => $discount['end_date'],
                'discount_price_usd' => null,
                'discount_type_usd' => null,
                'discount_price_try' => null,
                'discount_type_try' => null,
                'discount_price_eur' => null,
                'discount_type_eur' => null,
                'discount_type_try' => null,
            ]);
            $discount_id = $this->db->insert_id();
            foreach ($discount['prices'] as $price) {
                $updateData = [];
                if (isset($price['discount_price_usd'])) {
                    $updateData['discount_price_usd'] = $price['discount_price_usd'];
                    $updateData['discount_type_usd'] = $price['discount_type_usd'];
                }
                if (isset($price['discount_price_try'])) {
                    $updateData['discount_price_try'] = $price['discount_price_try'];
                    $updateData['discount_type_try'] = $price['discount_type_try'];
                }
                if (isset($price['discount_price_eur'])) {
                    $updateData['discount_price_eur'] = $price['discount_price_eur'];
                    $updateData['discount_type_eur'] = $price['discount_type_eur'];
                }

                if (!empty($updateData)) {
                    $this->db->where('id', $discount_id);
                    $this->db->update('product_discounts', $updateData);
                }
            }
        }
    }

    // add product images (sub images) by product id
    public function add_product_image($product_id, $path, $images)
    {
        foreach ($images as $image) {
            $this->db->insert('product_images', [
                'product_id' => $product_id,
                'image_url' => $path . $image
            ]);
        }
    }


    public function update_product($id, $data)
    {   
        $product = [
            "title",
            "extra_info_title",
            "extra_info_description",
            "meta_title",
            "meta_keywords",
            "meta_description",
            "seo_url",
            "description",
            "video_embed_code",
            "product_code",
            "quantity",
            "quantity_type",
            "cart_discount",
            "tax_rate",
            "sale_price_usd",
            "sale_price_try",
            "sale_price_eur",
            "second_sale_price",
            "deduct_from_stock",
            "status",
            "show_features",
            "product_validity_periods",
            "sort_order",
            "show_on_homepage",
            "is_new",
            "installment",
            "guarantee_period",
        ];


        $arr = [];
        foreach ($data as $key => $value) {
            if (in_array($key, $product)) {
                $arr[$key] = $value;
            }
        }

        $this->db->where('id', $id);
        return $this->db->update('products', $arr);
    }



    // update product discounts by product id
    public function update_discounts($discounts) {
        $incoming_ids = array_column($discounts, 'id');
        $product_ids = array_column($discounts, 'product_id');
    
        $this->db->where_in('product_id', $product_ids);
        $existing_discounts = $this->db->get('product_discounts')->result_array();
        $existing_ids = array_column($existing_discounts, 'id');
        
        $ids_to_delete = array_diff($existing_ids, $incoming_ids);
    
        foreach ($discounts as $discount) {
            // set discount values
            $discount_price_eur = isset($discount['discount_price_eur']) ? $discount['discount_price_eur'] : '0.00';
            $discount_price_usd = isset($discount['discount_price_usd']) ? $discount['discount_price_usd'] : '0.00';
            $discount_price_try = isset($discount['discount_price_try']) ? $discount['discount_price_try'] : '0.00';
            $discount_type_eur = isset($discount['discount_type_eur']) ? $discount['discount_type_eur'] : 'Fiyat';
            $discount_type_usd = isset($discount['discount_type_usd']) ? $discount['discount_type_usd'] : 'Fiyat';
            $discount_type_try = isset($discount['discount_type_try']) ? $discount['discount_type_try'] : 'Fiyat';
            $start_date = isset($discount['start_date']) ? $discount['start_date'] : null;
            $end_date = isset($discount['end_date']) ? $discount['end_date'] : null;
    
            
            if (isset($discount['id']) && in_array($discount['id'], $existing_ids)) {
                // update discount
                $this->db->where('id', $discount['id']);
                $this->db->update('product_discounts', [
                    'product_id' => $discount['product_id'],
                    'customer_group' => $discount['customer_group'],
                    'priority' => isset($discount['priority']) ? $discount['priority'] : '0',
                    'discount_price_usd' => $discount_price_usd,
                    'discount_type_usd' => $discount_type_usd,
                    'discount_price_try' => $discount_price_try,
                    'discount_price_eur' => $discount_price_eur,
                    'discount_type_eur' => $discount_type_eur,
                    'discount_type_try' => $discount_type_try,
                    'start_date' => $start_date,
                    'end_date' => $end_date
                ]);
            } else {
                // if discount id is not set, insert discount
                $this->db->insert('product_discounts', [
                    'product_id' => $discount['product_id'],
                    'customer_group' => $discount['customer_group'],
                    'priority' => isset($discount['priority']) ? $discount['priority'] : '0',
                    'discount_price_usd' => $discount_price_usd,
                    'discount_type_usd' => $discount_type_usd,
                    'discount_price_try' => $discount_price_try,
                    'discount_price_eur' => $discount_price_eur,
                    'discount_type_eur' => $discount_type_eur,
                    'discount_type_try' => $discount_type_try,
                    'start_date' => $start_date,
                    'end_date' => $end_date
                ]);
            }
        }
    
        // delete discounts that are not in the array
        if (!empty($ids_to_delete)) {
            $this->db->where_in('id', $ids_to_delete);
            $this->db->delete('product_discounts');
        }
    }
    
    
    

    // delete product or products by id (all data)
    // tables were connected with foreign key relationship
    public function delete_products($ids)
    {
        $this->db->trans_start();
        foreach ($ids as $id) {
            // delete product discounts
            $this->db->where('product_id', $id);
            $this->db->delete('product_discounts');
            // delete product images
            $this->db->where('product_id', $id);
            $this->db->delete('product_images');
            // delete product
            $this->db->where('id', $id);
            $this->db->delete('products');
        }

        // commit transaction
        $this->db->trans_complete();
        // transaction status check
        if ($this->db->trans_status() === FALSE) {
            throw new Exception('Error while deleting products and related data.');
            return false;
        }
        // response
        return true;
    }
}
