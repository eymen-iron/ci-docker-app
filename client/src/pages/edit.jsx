

import 'react-quill/dist/quill.snow.css';
import { ThemeStore, useContext } from '../store';
import { useParams, NavLink, Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { cancelData, updateData } from '../utils';

export default function GeneralPage() {
    const { id } = useParams();
    const { inputValue, setInputValue } = useContext(ThemeStore);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/product/${id}`)
            .then(res => res.data)
            .then(data => {
                if (data.success) {
                    setInputValue((prev) => ({
                        ...prev,
                        edit: {
                            ...data.product,
                            deduct_from_stock: data.product?.deduct_from_stock === "1" ? true : false,
                            show_features: data.product?.show_features === "1" ? true : false,
                            is_new: data.product?.is_new === "1" ? true : false,
                            installment: data.product?.installment === "1" ? true : false
                        }
                    }));

                } else {
                    Swal.fire({
                        title: 'Hata Oluştu!',
                        icon: 'error',
                        text: 'Bu ürün bulunamadı',
                        confirmButtonText: 'Tamam'
                    }).then(() => {
                        if (window !== undefined) {
                            window.location.href = '/';
                        }
                    });
                }
            });
    }, []);

    const handleUpdate = async () => {
        updateData(id, inputValue.edit);
    }
    

    return (
        <>
            <div className="flex items-center gap-2 justify-end">
                <button onClick={handleUpdate} className="text-[16px] border-2 rounded-md border-green-500 px-4 py-2 text-green-500 text-sm inline-flex items-center justify-center gap-1">
                    <i className="ri-save-line"></i>
                    <span>Kaydet</span>
                </button>
                <button onClick={cancelData} className="text-[16px] border-2 rounded-md border-red-500 px-4 py-2 text-red-500 text-sm inline-flex items-center justify-center gap-1">
                    <i className="ri-close-large-line"></i>
                    <span>İptal</span>
                </button>
            </div>
            <div className="menus">
                <NavLink
                    className={({ isActive }) => `menus__item ${isActive ? 'active' : ''}`}
                    to={`/edit/${id}/general`}>Genel</NavLink>
                <NavLink
                    className={({ isActive }) => `menus__item ${isActive ? 'active' : ''}`}
                    to={`/edit/${id}/detail`}>Detay</NavLink>
                <NavLink
                    className={({ isActive }) => `menus__item ${isActive ? 'active' : ''}`}
                    to={`/edit/${id}/images`}>Fotoğraflar</NavLink>
                <NavLink
                    className={({ isActive }) => `menus__item ${isActive ? 'active' : ''}`}
                    to={`/edit/${id}/discount`}>
                    İndirim
                </NavLink>
            </div>
            <Outlet />
        </>
    )
}
