import React, { useRef, useState, useEffect } from "react";
import { ThemeStore, useContext } from '../store';
import Swal from "sweetalert2";

export default function Images() {
    const { inputValue, setInputValue } = useContext(ThemeStore);
    const focusInput = useRef(null);
    const imagesRef = useRef(null);
    const [mainImage, setMainImage] = useState('');
    const [images, setImages] = useState([]);

    useEffect(() => {
        if (inputValue.edit?.main_image) {
            setMainImage(inputValue.edit?.main_image);
        }
        if (inputValue.edit?.sub_images) {
            setImages(inputValue.edit?.sub_images);
        }
    }, []);

    const handleImageChange = (e) => {
        e.preventDefault();
        Swal.fire({
            title: 'Hata Oluştu!',
            icon: 'error',
            text: 'Şuanda resim ekleme özelliği devre dışıdır.',
            confirmButtonText: 'Tamam'
        });
    }

    return (
        <div className="p-4 border-2 border-gray-300 rounded-b-lg">
            <div className="py-4 border-t border-gray-300 flex flex-col">
                <div className="flex items-center gap-3 max-w-[600px]">
                    <input ref={focusInput} type="file" className="hidden" onChange={handleImageChange} />
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
                            {mainImage ? <img src={process.env.REACT_APP_SUB_URL + mainImage} alt="ürün ana resim" className="w-[140px] h-[140px]" /> : <i className="ri-camera-line text-gray-200 font-medium text-[140px]"></i>}
                        </button>
                        <button className="p-2 text-red-500 border border-red-500 rounded-sm w-[100px]" onClick={handleImageChange}>
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
    );
}
