import React, { useEffect } from 'react'
import { useLocation , useNavigate } from 'react-router-dom';
import   { ThemeStore, useContext } from '../store';
export default function Location() {
    const { setInputValue } = useContext(ThemeStore);
    let location = useLocation();
    const history = useNavigate();
    const regex = /\/edit\/\d+$/;
    useEffect(() => {
        if(!location.pathname.startsWith('/edit')){
            setInputValue((prev) => ({...prev, edit: null}));
        }
        if(regex.test(location.pathname)){
            history(`${location.pathname}/general`, { replace: true });
        }
    }, [location.pathname])
    return (
        <></>
    )
}


