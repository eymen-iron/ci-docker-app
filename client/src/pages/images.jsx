import React, { useRef, useState } from "react";
import { ThemeStore, useContext } from '../store';
import { isEmpty, sendData } from '../utils';
import Swal from "sweetalert2";
import { ProductHead, ProductLayout } from '../components';
import { NavLink } from "react-router-dom";

export default function Images() {
    const { inputValue, setInputValue } = useContext(ThemeStore);
    const focusInput = useRef(null);
    const imagesRef = useRef(null);
    const [mainImage, setMainImage] = useState('');
    const [images, setImages] = useState([]);

    const handleMainImageChange = (e) => {
        e.preventDefault();
        const file = e.target.files[0];
        if (file) {
            const fileType = file.name.split('.').pop();
            if (['jpg', 'png', 'jpeg', 'gif', 'svg'].includes(fileType.toLowerCase())) {
                const fileReader = new FileReader();
                fileReader.readAsDataURL(file);
                fileReader.onloadend = () => {
                    setMainImage(fileReader.result);
                    setInputValue(prevState => ({
                        ...prevState,
                        main_image: file
                    }));
                };
            } else {
                Swal.fire({
                    title: 'Hata Oluştu!',
                    icon: 'error',
                    text: 'Lütfen resim dosyası seçiniz.',
                    confirmButtonText: 'Tamam'
                });
            }
        }
    };

    const handleImageChange = (e) => {
        e.preventDefault();
        const files = Array.from(e.target.files);
        files.forEach(file => {
            const fileType = file.name.split('.').pop();
            if (['jpg', 'png', 'jpeg', 'gif', 'svg'].includes(fileType.toLowerCase())) {
                const fileReader = new FileReader();
                fileReader.readAsDataURL(file);
                fileReader.onloadend = () => {
                    setImages(prev => [...prev, fileReader.result]);
                    setInputValue(prevState => {
                        const updatedSubImages = prevState.sub_images.filter(item => !isEmpty(item)); // Boş olmayan öğeleri filtrele
                        return {
                            ...prevState,
                            sub_images: [...updatedSubImages, file] // Güncellenmiş alt resim listesini döndür
                        };
                    });
                };
            } else {
                Swal.fire({
                    title: 'Hata Oluştu!',
                    icon: 'error',
                    text: 'Lütfen resim dosyası seçiniz.',
                    confirmButtonText: 'Tamam'
                });
            }
        });
    };

    return (
        <>
            <ProductHead val={inputValue} />
            <div className="p-4 border-2 border-gray-300 rounded-b-lg">
                <div className="py-4 border-t border-gray-300 flex flex-col">
                    <div className="flex items-center gap-3 max-w-[600px]">
                        <input ref={focusInput} type="file" className="hidden" onChange={handleMainImageChange} />
                        <div className="images_content cursor-pointer" onClick={() => focusInput.current.click()}>
                            <h4>Ürün Ana Resim</h4>
                            <p className="text-gray-500 text-sm">
                                Ürüne ana resim eklemek için tıklayın.<br />
                                Ürüne resim eklerken kare resim girmelisiniz, önerilen boyut 800px genişlik, 800px yükseklik.<br />
                                Ürün resim eklerken maksimum resim boyutu 1MB ve genişlik 768px, yükseklik 1024px olmalıdır.
                            </p>
                        </div>
                        <div className="images_img flex flex-col gap-3 items-center">
                            <button className="w-[140px] h-[140px] inline-flex items-center justify-center" onClick={() => focusInput.current.click()}>
                                {mainImage ? <img src={mainImage} alt="ürün ana resim" className="w-[140px] h-[140px]" /> : <i className="ri-camera-line text-gray-200 font-medium text-[140px]"></i>}
                            </button>
                            <button className="p-2 text-red-500 border border-red-500 rounded-sm w-[100px]" onClick={() => setMainImage('')}>
                                Temizle
                            </button>
                        </div>
                    </div>
                    <span className="text-lg font-semibold mt-8 w-full text-left border-b border-gray-600 pb-4">
                        Resimler
                    </span>
                </div>
                <div className="w-full flex flex-col items-center lg:justify-center justify-start">
                    <input ref={imagesRef} type="file" className="hidden" onChange={handleImageChange} multiple />
                    <div className="flex items-center gap-3 w-full lg:w-[600px] justify-center">
                        {images.length > 0 && images.map((image, index) => (
                            <img key={index} src={image} alt={`ürün ekstra resim ${index}`} className="w-[140px] h-[140px]" />
                        ))}
                    </div>
                    <button className="p-2 text-green-500 border border-green-500 rounded-sm w-[100px]" onClick={() => imagesRef.current.click()}>
                        Resim Ekle
                    </button>
                </div>
            </div>
        </>
    );
}
