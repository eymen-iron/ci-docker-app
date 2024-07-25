

import { NavLink, } from "react-router-dom";
import { sendData, cancelData } from '../utils';

export default function ProductHead({ val }) {
    return (
        <>
            <div className="flex items-center gap-2 justify-end">
                <button onClick={(e) => sendData(e, val)} className="text-[16px] border-2 rounded-md border-green-500 px-4 py-2 text-green-500 text-sm inline-flex items-center justify-center gap-1">
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
                    to="/add/general">Genel</NavLink>
                <NavLink
                    className={({ isActive }) => `menus__item ${isActive ? 'active' : ''}`}
                    to="/add/detail">Detay</NavLink>
                <NavLink
                    className={({ isActive }) => `menus__item ${isActive ? 'active' : ''}`}
                    to="/add/images">Fotoğraflar</NavLink>
                <NavLink
                    className={({ isActive }) => `menus__item ${isActive ? 'active' : ''}`}
                    to="/add/discount">
                    İndirim
                </NavLink>
            </div>
        </>
    )
}
