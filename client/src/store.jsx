

import { createContext , useContext , useState , useEffect } from "react";

const ThemeStore = createContext();

const ThemeContextProvider = ({children}) => {
  

    const [inputValue, setInputValue] = useState({
        "title": "",
        "extra_info_title": "",
        "extra_info_description": "",
        "meta_title": "",
        "meta_keywords": "",
        "meta_description": "",
        "seo_url": "",
        "description": "",
        "video_embed_code": "",
        "product_code": "",
        "quantity": 0,
        "quantity_type": "adet",
        "cart_discount": 0,
        "tax_rate": 18,
        "sale_price_usd": 0.00,
        "sale_price_try": 0.00,
        "sale_price_eur": 0.00,
        "second_sale_price": 0.00,
        "deduct_from_stock": true,
        "status": "active",
        "show_features": true,
        "product_validity_periods": "2024-12-17",
        "sort_order": 0,
        "show_on_homepage": 0,
        "is_new": true,
        "installment": true,
        "guarantee_period": "12 ay",
        "main_image": null,
        "sub_images": [], 
        "discounts": [],
        "edit": null
    });
    
    useEffect(() => {
        if (typeof window !== 'undefined') {
          const savedInputValue = JSON.parse(window.localStorage.getItem("product-input"));
          if (savedInputValue !== null) {
            setInputValue(savedInputValue);
          }
        }
      }, []);

      
    
      useEffect(() => {
        if (typeof window !== 'undefined') {
          window.localStorage.setItem("product-input", JSON.stringify(inputValue));
        }
      }, [inputValue]);


      const data = {
        inputValue,
        setInputValue
    }


    return (
        <ThemeStore.Provider value={data}>
            {children}
        </ThemeStore.Provider>
    );
};


export {
    ThemeStore , 
    ThemeContextProvider , 
    useContext
}