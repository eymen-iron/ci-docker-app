
import { GeneralInput} from '../components';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { ThemeStore, useContext } from '../store';

export default function GeneralPage() {
    const { inputValue, setInputValue } = useContext(ThemeStore);
    const handleDescriptionChange = (value) => {
        setInputValue(prevState => ({
            ...prevState,
            edit: { ...prevState.edit, description: value }
        }));
    };

    return (
        <>
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
                            value={inputValue.edit?.title}
                            defaultValue={inputValue.edit?.title}
                            onChange={(e) => setInputValue({ ...inputValue, edit: { ...inputValue.edit, title: e.target.value }})}
                            className='block w-1/2 rounded-md border-0 px-2 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 outline-none'
                        />
                    </GeneralInput>
                    <GeneralInput
                        title="Ürün Ek Bilgi Başlığı"
                    >
                        <input
                            type="text"
                            value={inputValue.edit?.extra_info_title}
                            defaultValue={inputValue.edit?.extra_info_title}
                            onChange={(e) => setInputValue({ ...inputValue, edit: { ...inputValue.edit, extra_info_title: e.target.value }})}
                            className='block w-1/2 rounded-md border-0 px-2 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 outline-none'
                        />
                    </GeneralInput>
                    <GeneralInput
                        title="Ürün Ek Bilgi Açıklaması"
                    >
                        <input
                            type="text"
                            value={inputValue.edit?.extra_info_description}
                            defaultValue={inputValue.edit?.extra_info_description}
                            onChange={(e) => setInputValue({ ...inputValue, edit: { ...inputValue.edit, extra_info_description: e.target.value }})}
                            className='block w-1/2 rounded-md border-0 px-2 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 outline-none'
                        />
                    </GeneralInput>
                    <GeneralInput
                        title="Meta Title"
                    >
                        <input
                            type="text"
                            value={inputValue.edit?.meta_title}
                            defaultValue={inputValue.edit?.meta_title}
                            onChange={(e) => setInputValue({ ...inputValue, edit: { ...inputValue.edit, meta_title: e.target.value }})}
                            className='block w-1/2 rounded-md border-0 px-2 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 outline-none'
                        />
                    </GeneralInput>
                    <GeneralInput
                        title="Meta Keywords"
                    >
                        <input
                            type="text"
                            value={inputValue.edit?.meta_keywords}
                            defaultValue={inputValue.edit?.meta_keywords}
                            onChange={(e) => setInputValue({ ...inputValue, edit: { ...inputValue.edit, meta_keywords: e.target.value }})}
                            className='block w-1/2 rounded-md border-0 px-2 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 outline-none'
                        />
                    </GeneralInput>
                    <GeneralInput
                        title="Meta Description"
                    >
                        <input
                            type="text"
                            name='meta_description'
                            value={inputValue.edit?.meta_description}
                            defaultValue={inputValue.edit?.meta_description}
                            onChange={(e) => setInputValue({ ...inputValue, edit: { ...inputValue.edit, meta_description: e.target.value }})}
                            className='block w-1/2 rounded-md border-0 px-2 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 outline-none'
                        />
                    </GeneralInput>
                    <GeneralInput
                        title="Seo Adresi"
                        description="Seo adresi girilmesi zorunlu değildir, girilen seo adresi geçerli olur. Girilmez ise otomatik olarak Başlık kısmını referans olarak oluşturulur."
                    >
                        <input
                            type="text"
                            value={inputValue.edit?.seo_url}
                            defaultValue={inputValue.edit?.seo_url}
                            onChange={(e) => setInputValue({ ...inputValue, edit: { ...inputValue.edit, seo_url: e.target.value }})}
                            className='block w-1/2 rounded-md border-0 px-2 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 outline-none'
                        />
                    </GeneralInput>
                    <GeneralInput
                        title="Ürün Açıklama"
                    >
                        <div className="w-full h-[400px]">
                            <ReactQuill theme="snow" 
                            value={inputValue.edit?.description} 
                            defaultValue={inputValue.edit?.description}
                            onChange={handleDescriptionChange} 
                            className='w-full h-[350px]' 
                        />
                        </div>
                    </GeneralInput>
                    <GeneralInput
                        title="Video Embed Kodu"
                        description="Vimeo - Google Video - Youtube tarzı vıdeo sıtelerının embed kodu"
                    >
                        <input
                            type="text"
                            value={inputValue.edit?.video_embed_code}
                            defaultValue={inputValue.edit?.video_embed_code}
                            onChange={(e) => setInputValue({ ...inputValue, edit: { ...inputValue.edit, video_embed_code: e.target.value }})}
                            className='block w-1/2 rounded-md border-0 px-2 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 outline-none'
                        />
                    </GeneralInput>
                </div>
            </div>
        </>
    )
}
