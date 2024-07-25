import React, { useState, useEffect } from 'react';
import { setFloat } from '../utils';
import Swal from 'sweetalert2';
import DatePicker from 'react-datepicker';
import { ThemeStore, useContext } from '../store';
import { useParams } from 'react-router-dom';

const Discount = () => {
    const { id } = useParams();
    const { inputValue, setInputValue } = useContext(ThemeStore);
    const [discounts, setDiscounts] = useState([]);
    const today = new Date().toISOString().split('T')[0];  
    
    useEffect(() => {
        setDiscounts(inputValue.edit?.discounts);
    }, [inputValue.edit?.discounts]);

    const addDiscount = () => {
        const newIndex = parseInt(discounts.reduce((maxId, discount) => {
            return discount.id > maxId ? discount.id : maxId;
        }, 0)) + 1;
        setInputValue((prev) => ({
            ...prev,
            edit: {
                ...prev.edit,
                discounts: [...prev.edit.discounts, {
                    id: newIndex,
                    product_id: id,
                    customer_group: 'Musteri',
                    priority: 0,
                    discount_price_usd: '0.00',
                    discount_type_usd: 'Fiyat',
                    discount_price_try: '0.00',
                    discount_price_eur: '0.00',
                    discount_type_eur: 'Fiyat',
                    discount_type_try: 'Fiyat',
                    start_date: today,
                    end_date: today
                }]
            }
        }));
        
    };

    const removeDiscount = (id) => {
        if (discounts.length > 1) {
            setInputValue((prev) => ({
                ...prev,
                edit: {
                    ...prev.edit,
                    discounts: prev.edit.discounts.filter((item) => item.id !== id)
                }
            }));
        } else {
            Swal.fire({
                title: 'Hata Oluştu!',
                icon: 'error',
                text: 'En az bir indirim olmalıdır.',
                confirmButtonText: 'Tamam'
            });
        }
    };
    

    const handleDiscountChange = (id, field, value) => {
        setInputValue((prev) => ({
            ...prev,
            edit: {
                ...prev.edit,
                discounts: prev.edit.discounts.map((item) =>
                    item.id === id ? { ...item, [field]: value } : item
                )
            }
        }));
    };
    
    const handleDateChange = (id, field, date) => {
        setInputValue((prev) => ({
            ...prev,
            edit: {
                ...prev.edit,
                discounts: prev.edit.discounts.map((item) =>
                    item.id === id ? { ...item, [field]: date.toISOString().split('T')[0] } : item
                )
            }
        }));
    };
    
    const parseDate = (dateStr) => {
        const parsedDate = new Date(dateStr);
        return isNaN(parsedDate.getTime()) ? null : parsedDate;
    };

    return (
        <div className="p-4 border-2 border-gray-300 rounded-b-lg">
            <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                    <thead className="text-lg text-gray-700 uppercase border-b border-gray-400">
                        <tr>
                            <th scope="col" className="text-center px-6 py-3">Müşteri Grubu</th>
                            <th scope="col" className="text-center px-6 py-3">Öncelik</th>
                            <th scope="col" className="text-center px-6 py-3">Yüzde İndirim Oranı veya İndirimli Fiyatı</th>
                            <th scope="col" className="text-center px-6 py-3">Başlangıç Tarihi</th>
                            <th scope="col" className="text-center px-6 py-3">Bitiş Tarihi</th>
                            <th scope="col" className="px-6 py-3"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {discounts?.map((discount, index) => (
                            <tr key={index} className="bg-white border-b">
                                <td className="px-6 py-4">
                                    <select value={discount.customer_group} className="table-input" onChange={(e) => handleDiscountChange(discount.id, 'customer_group', e.target.value)}>
                                        <option value="Musteri" defaultChecked>Müşteri</option>
                                        <option value="Musteri_2">Müşteri 2</option>
                                        <option value="Musteri_3">Müşteri 3</option>
                                    </select>
                                </td>
                                <td className="px-6 py-4 text-center">
                                    <input type="number" step="1"  value={discount.priority} className="table-input" onChange={(e) => handleDiscountChange(discount.id, 'priority', e.target.value)} />
                                </td>
                                <td className="px-6 py-4">
                                    
                                        <div className="flex flex-col items-center w-full mb-2">
                                            <div className="flex items-center gap-2 w-full">
                                                <input type="number" step="0.1" className='table-input w-full' min="0" 
                                                value={discount.discount_price_usd}
                                                onChange={(e) => handleDiscountChange(discount.id, 'discount_price_usd', setFloat(e.target.value))}
                                                 />
                                                <span className="text-[23px]"> &#36;</span>
                                            </div>
                                            <select className="table-input w-full" value={discount.discount_type_usd} onChange={(e) => handleDiscountChange(discount.id, 'discount_type_usd', e.target.value)} >
                                                <option value="Fiyat">Fiyat</option>
                                                <option value="Oran">Oran</option>
                                            </select>
                                        </div>                                    
                                        <div className="flex flex-col items-center w-full mb-2">
                                            <div className="flex items-center gap-2 w-full">
                                                <input type="number" step="0.1" className='table-input w-full' min="0" value={discount.discount_price_try}  onChange={(e) => handleDiscountChange(discount.id, 'discount_price_try', setFloat(e.target.value))} />
                                                <span className="text-[23px]"> &#8378; </span>
                                            </div>
                                            <select className="table-input w-full" value={discount.discount_type_try} onChange={(e) => handleDiscountChange(discount.id, 'discount_type_try', e.target.value)}>
                                                <option value="Fiyat">Fiyat</option>
                                                <option value="Oran">Oran</option>
                                            </select>
                                        </div>
                                        <div className="flex flex-col items-center w-full">
                                            <div className="flex items-center gap-2 w-full">
                                                <input type="number" step="0.1" className='table-input w-full' min="0" value={discount.discount_price_eur} onChange={(e) => handleDiscountChange(discount.id, 'discount_price_eur', setFloat(e.target.value))} />
                                                <span className="text-[23px]"> &#8364;</span> 
                                            </div>
                                            <select className="table-input w-full" value={discount.discount_type_eur} onChange={(e) => handleDiscountChange(discount.id, 'discount_type_eur', e.target.value)}>
                                                <option value="Fiyat">Fiyat</option>
                                                <option value="Oran">Oran</option>
                                            </select>
                                        </div>
                                </td>
                                <td className="px-6 py-4 text-center">
                                    <DatePicker
                                        className='table-input'
                                        minDate={new Date()}
                                        dateFormat="dd-MM-yyyy"
                                        selected={parseDate(discount.start_date)}
                                        onChange={(date) => handleDateChange(discount.id, 'start_date', date)}
                                    />
                                </td>
                                <td className="px-6 py-4 text-center">
                                    <DatePicker
                                        className='table-input'
                                        minDate={new Date()}
                                        dateFormat="dd-MM-yyyy"
                                        selected={parseDate(discount.end_date)}
                                        onChange={(date) => handleDateChange(discount.id, 'end_date', date)}
                                    />
                                </td>
                                <td className="px-6 py-4 text-center">
                                    <button
                                        className="text-red-500 border-red-500 border rounded-sm p-3 text-sm"
                                        onClick={() => removeDiscount(discount.id)}
                                    >
                                        Kaldır
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="text-end w-full mt-2">
                <button className="text-green-500 border-green-500 border rounded-sm p-3 text-sm" onClick={addDiscount}>
                    İndirim Ekle
                </button>
            </div>
        </div>
    );
};

export default Discount;
