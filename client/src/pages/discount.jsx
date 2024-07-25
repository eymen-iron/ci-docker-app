import React, { useState, useEffect } from 'react';
import { setFloat } from '../utils';
import Swal from 'sweetalert2';
import DatePicker from 'react-datepicker';
import { ThemeStore, useContext } from '../store';
import { ProductHead } from '../components';

const Discount = () => {
    const { inputValue, setInputValue } = useContext(ThemeStore);

    const [discounts, setDiscounts] = useState([]);

    useEffect(() => {
        if (inputValue.discounts.length > 0) {
            setDiscounts(inputValue.discounts);
        }
    }, []);

    useEffect(() => {
        setInputValue((inputValue) => ({ ...inputValue, discounts: discounts }));
    }, [discounts]);

    const addDiscount = () => {
        const newIndex = discounts.length + 1;
        setDiscounts([...discounts, {
            index: newIndex,
            customer_group: '',
            priority: '',
            discounts: [
                { amount: 0.00, type: 'Fiyat', unit: 'dolar' },
                { amount: 0.00, type: 'Fiyat', unit: 'tl' },
                { amount: 0.00, type: 'Fiyat', unit: 'euro' }
            ],
            startDate: '',
            endDate: ''
        }]);
    };

    const removeDiscount = (index) => {
        if (discounts.length > 1) {
            setDiscounts(prevDiscounts => prevDiscounts.filter((item) => item.index !== index));
        } else {
            Swal.fire({
                title: 'Hata Oluştu!',
                icon: 'error',
                text: 'En az bir indirim olmalıdır.',
                confirmButtonText: 'Tamam'
            });
        }

    };

    const handleDiscountChange = (id, unit, value) => {
        setDiscounts(prevDiscounts =>
            prevDiscounts.map(discount => {
                if (discount.index === id) {
                    return {
                        ...discount,
                        discounts: discount.discounts.map(item =>
                            item.unit === unit ? { ...item, amount: setFloat(value) } : item
                        )
                    };
                }
                return discount;
            })
        );
    };

    const handleTypeChange = (id, unit, newType) => {
        setDiscounts(prevDiscounts =>
            prevDiscounts.map(discount => {
                if (discount.index === id) {
                    return {
                        ...discount,
                        discounts: discount.discounts.map(item =>
                            item.unit === unit ? { ...item, type: newType } : item
                        )
                    };
                }
                return discount;
            })
        );
    };

    const handleDateChange = (index, name, date) => {
        setDiscounts(prevDiscounts =>
            prevDiscounts.map(discount => {
                if (discount.index === index) {
                    return {
                        ...discount,
                        [name]: date.toISOString().split('T')[0],
                    };
                }
                return discount;
            })
        );
    };


    return (
        <>
            <ProductHead val={inputValue} />
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
                            {discounts.map((discount, index) => (
                                <tr key={index} className="bg-white border-b">
                                    <td className="px-6 py-4">
                                        <select value={discount.customer_group} className="table-input" onChange={(e) => setDiscounts((discounts) => discounts.map((item, idx) => idx === index ? { ...item, customer_group: e.target.value } : item))}>
                                            <option value="Musteri">Müşteri</option>
                                            <option value="Musteri_2">Müşteri 2</option>
                                            <option value="Musteri_3">Müşteri 3</option>
                                        </select>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <input type="text" value={discount.priority} className="table-input" onChange={(e) => setDiscounts((discounts) => discounts.map((item, idx) => idx === index ? { ...item, priority: e.target.value } : item))} />
                                    </td>
                                    <td className="px-6 py-4">
                                        {discount.discounts.map((item, idx) => (
                                            <div key={idx} className="flex flex-col items-center w-full mb-2">
                                                <div className="flex items-center gap-2 w-full">
                                                    <input type="number" step="0.1" className='table-input' min="0" value={item.amount} onChange={(e) => handleDiscountChange(discount.index, item.unit, e.target.value)} />
                                                    {item.unit === 'dolar' ? <span className="text-[23px]"> &#36;</span> : null}
                                                    {item.unit === 'euro' ? <span className="text-[23px]"> &#8364;</span> : null}
                                                    {item.unit === 'tl' ? <span className="text-[23px]"> &#8378; </span> : null}
                                                </div>
                                                <select className="table-input w-full" value={item.type} onChange={(e) => handleTypeChange(discount.index, item.unit, e.target.value)}>
                                                    <option value="Fiyat">Fiyat</option>
                                                    <option value="Oran">Oran</option>
                                                </select>
                                            </div>
                                        ))}
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <DatePicker
                                            className='table-input'
                                            minDate={new Date()}
                                            dateFormat="dd-MM-yyyy"
                                            selected={discount.startDate ? discount.startDate : new Date()}
                                            onChange={(date) => handleDateChange(discount.index, 'startDate', date)}
                                        />
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <DatePicker
                                            className='table-input'
                                            minDate={new Date()}
                                            dateFormat="dd-MM-yyyy"
                                            selected={discount.endDate ? discount.endDate : new Date()}
                                            onChange={(date) => handleDateChange(discount.index, 'endDate', date)}
                                        />
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <button
                                            className="text-red-500 border-red-500 border rounded-sm p-3 text-sm"
                                            onClick={() => removeDiscount(discount.index)}
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
                    <button
                        className="text-green-500 border-green-500 border rounded-sm p-3 text-sm"
                        onClick={addDiscount}
                    >
                        İndirim Ekle
                    </button>
                </div>
            </div>
        </>
    );
};

export default Discount;
