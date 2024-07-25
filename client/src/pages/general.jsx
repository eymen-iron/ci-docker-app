
import { GeneralInput, ProductHead} from '../components';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { ThemeStore, useContext } from '../store';

export default function GeneralPage() {
    const { inputValue, setInputValue } = useContext(ThemeStore);
    const handleDescriptionChange = (value) => {
        setInputValue(prevState => ({
            ...prevState,
            description: value
        }));
    };

    return (
        <>
            <ProductHead val={inputValue} />
            <div className="p-4 border-2 border-gray-300 rounded-b-lg">
                <div className='w-full flex flex-col'>
                    <GeneralInput
                        title="Ürün Başlık"
                        description=""
                        required={true}
                    >
                        <input
                            type="text"
                            name="title"
                            value={inputValue.title}
                            onChange={(e) => setInputValue({ ...inputValue, title: e.target.value })}
                            className='block w-1/2 rounded-md border-0 px-2 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 outline-none'
                        />
                    </GeneralInput>
                    <GeneralInput
                        title="Ürün Ek Bilgi Başlığı"
                    >
                        <input
                            type="text"
                            name="extra_info_title"
                            value={inputValue.extra_info_title}
                            onChange={(e) => setInputValue({ ...inputValue, extra_info_title: e.target.value })}
                            className='block w-1/2 rounded-md border-0 px-2 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 outline-none'
                        />
                    </GeneralInput>
                    <GeneralInput
                        title="Ürün Ek Bilgi Açıklaması"
                    >
                        <input
                            type="text"
                            name="extra_info_description"
                            value={inputValue.extra_info_description}
                            onChange={(e) => setInputValue({ ...inputValue, extra_info_description: e.target.value })}
                            className='block w-1/2 rounded-md border-0 px-2 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 outline-none'
                        />
                    </GeneralInput>
                    <GeneralInput
                        title="Meta Title"
                    >
                        <input
                            type="text"
                            name="mtea_title"
                            value={inputValue.meta_title}
                            onChange={(e) => setInputValue({ ...inputValue, meta_title: e.target.value })}
                            className='block w-1/2 rounded-md border-0 px-2 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 outline-none'
                        />
                    </GeneralInput>
                    <GeneralInput
                        title="Meta Keywords"
                    >
                        <input
                            type="text"
                            name='meta_keywords'
                            value={inputValue.meta_keywords}
                            onChange={(e) => setInputValue({ ...inputValue, meta_keywords: e.target.value })}
                            className='block w-1/2 rounded-md border-0 px-2 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 outline-none'
                        />
                    </GeneralInput>
                    <GeneralInput
                        title="Meta Description"
                    >
                        <input
                            type="text"
                            name='meta_description'
                            value={inputValue.meta_description}
                            onChange={(e) => setInputValue({ ...inputValue, meta_description: e.target.value })}
                            className='block w-1/2 rounded-md border-0 px-2 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 outline-none'
                        />
                    </GeneralInput>
                    <GeneralInput
                        title="Seo Adresi"
                        description="Seo adresi girilmesi zorunlu değildir, girilen seo adresi geçerli olur. Girilmez ise otomatik olarak Başlık kısmını referans olarak oluşturulur."
                    >
                        <input
                            type="text"
                            name='seo_url'
                            value={inputValue.seo_url}
                            onChange={(e) => setInputValue({ ...inputValue, seo_url: e.target.value })}
                            className='block w-1/2 rounded-md border-0 px-2 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 outline-none'
                        />
                    </GeneralInput>
                    <GeneralInput
                        title="Ürün Açıklama"
                    >
                        <div className="w-full h-[400px]">
                            <ReactQuill theme="snow" value={inputValue.description} className='w-full h-[350px]' onChange={handleDescriptionChange} />
                        </div>
                    </GeneralInput>
                    <GeneralInput
                        title="Video Embed Kodu"
                        description="Vimeo - Google Video - Youtube tarzı vıdeo sıtelerının embed kodu"
                    >
                        <input
                            type="text"
                            name="video_embed_code"
                            value={inputValue.video_embed_code}
                            onChange={(e) => setInputValue({ ...inputValue, video_embed_code: e.target.value })}
                            className='block w-1/2 rounded-md border-0 px-2 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 outline-none'
                        />
                    </GeneralInput>
                </div>
            </div>
        </>
    )
}
