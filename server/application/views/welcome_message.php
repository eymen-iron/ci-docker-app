<?php
defined('BASEPATH') OR exit('No direct script access allowed');
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <title>Database Error</title>
    <style type="text/css">
        ::selection {
            background-color: #E13300;
            color: white;
        }

        ::-moz-selection {
            background-color: #E13300;
            color: white;
        }

        body {
            background-color: #fff;
            margin: 40px;
            font: 13px/20px normal Helvetica, Arial, sans-serif;
            color: #4F5155;
        }

        a {
            color: #003399;
            background-color: transparent;
            font-weight: normal;
        }

        h1 {
            color: #444;
            background-color: transparent;
            border-bottom: 1px solid #D0D0D0;
            font-size: 19px;
            font-weight: normal;
            margin: 0 0 14px 0;
            padding: 14px 15px 10px 15px;
        }

        code {
            font-family: Consolas, Monaco, Courier New, Courier, monospace;
            font-size: 12px;
            background-color: #f9f9f9;
            border: 1px solid #D0D0D0;
            color: #002166;
            display: block;
            margin: 14px 0 14px 0;
            padding: 12px 10px 12px 10px;
        }

        #container {
            margin: 10px;
            border: 1px solid #D0D0D0;
            box-shadow: 0 0 8px #D0D0D0;
        }

        p {
            margin: 12px 15px 12px 15px;
        }
    </style>
</head>

<body>
    <div id="container">
        <h1>A Database Error Occurred</h1>
        <p>Error Number: 1054</p>
        <p>Unknown column 'installment_period' in 'field list'</p>
        <p>INSERT INTO `products` (`title`, `extra_info_title`, `extra_info_description`, `meta_title`, `meta_keywords`,
            `meta_description`, `seo_url`, `description`, `video_embed_code`, `product_code`, `quantity`,
            `quantity_type`, `cart_discount`, `tax_rate`, `sale_price_usd`, `sale_price_try`, `sale_price_eur`,
            `second_sale_price`, `deduct_from_stock`, `status`, `show_features`, `product_validity_periods`,
            `sort_order`, `show_on_homepage`, `is_new`, `installment`, `installment_period`) VALUES ('Product Title',
            'Additional Info Title', 'Additional Info Description', 'Meta Title', 'Keyword1, Keyword2', 'Meta
            Description', 'product-seo-url', 'Product Description', '<iframe
                src=\"https://www.youtube.com/embed/video_id\"></iframe>', 'PROD123', '10', 'pieces', '5', '18',
            '49.99', '249.99', '44.99', '39.99', 'true', 'active', 'true', '2024-12-13', '10', '1', 'true', 'true', '6')
        </p>
        <p>Filename: models/Product_model.php</p>
        <p>Line Number: 77</p>
    </div>
</body>

</html>