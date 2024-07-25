import React from 'react'
import { GeneralInput, ProductHead } from '../components'
import { ThemeStore, useContext } from '../store';
import DatePicker from 'react-datepicker';
import { setBool, setFloat } from '../utils';

export default function DetailPage() {
  const { inputValue, setInputValue } = useContext(ThemeStore);

  return (
    <>
      <ProductHead val={inputValue} />
      <div className="p-4 border-2 border-gray-300 rounded-b-lg">
        <div className='w-full flex flex-col'>
          <GeneralInput
            title="Ürün Kodu"
            description="Ürünün kodun."
            required={true}
          >
            <input
              type="text"
              name="product_code"
              placeholder='813b8897-eec2-4c4b-bb2c-6f8531f62aeb'
              value={inputValue.product_code}
              onChange={(e) => setInputValue({ ...inputValue, product_code: e.target.value })}
              className='block w-1/2 rounded-md border-0 px-2 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 outline-none"'
            />
          </GeneralInput>
          <GeneralInput
            title="Miktar"
            description='Ürünün kaç adet olacağını belieler. Bu miktar 0 olarak girilirse , "ürüm sotokta yok " ibareleriyle listelenecektir. Eğer üründe seçenek varsa , seçeneklerin stopğu ürün stoğundan büyük olamaz.'
            required={true}
          >
            <div className="flex items-center gap-2">
              <input type="number"
                value={inputValue.quantity}
                step="0.1"
                min={0}
                onChange={(e) => setInputValue({ ...inputValue, quantity: setFloat(e.target.value) })}
                className='block w-[80px] rounded-md border-0 px-2 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 outline-none' />
              <select name="productCode" id="productCode" value={inputValue.quantity_type} onChange={(e) => setInputValue({ ...inputValue, quantity_type: e.target.value })} className='block w-[calc(50%-85px)] rounded-md border-0 px-3 py-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 outline-none'>
                <option value="adet" defaultChecked>Adet</option>
                <option value="kilogram">Kilogram</option>
              </select>
            </div>
          </GeneralInput>
          <GeneralInput
            title="Sepet Ekstra İndirim %"
            description='Ürün sepet ekstra indirimde seçeneklerle fiyat girilmiş ise indirim seçenek fiyatlarına da uygulanacaktır.'
            required={true}
          >
            <select name="productCode" id="productCode" value={inputValue.cart_discount} onChange={(e) => setInputValue({ ...inputValue, cart_discount: e.target.value })} className='block rounded-md border-0 px-3 py-4 text-gray-400 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 outline-none'>
              <option value="0" defaultChecked>0</option>
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
            </select>
          </GeneralInput>
          <GeneralInput
            title="Vergi Oranı %"
            description='Ürün vergi oranı.'
            type="text"
            required={true}
          >
            <select name="productCode" id="productCode" value={inputValue.tax_rate} onChange={(e) => setInputValue({ ...inputValue, tax_rate: e.target.value })} className='block w-1/2 rounded-md border-0 px-3 py-4 text-gray-400 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 outline-none'>
              <option value="18" defaultChecked>18</option>
              <option value="9">9</option>
              <option value="10">10</option>
              <option value="20">20</option>
            </select>
          </GeneralInput>
          <GeneralInput
            title="Satış Fiyatı"
            description='Ürünün satış fiyatı'
            required={true}
          >
            <div className="flex flex-col items-center gap-2 w-full bg-gray-100 p-3 rounded-md">
              <div className="flex items-center gap-2 w-full border-b border-gray-300 py-3">
                <input type="number" step="0.1" min={0} value={inputValue.sale_price_try} onChange={(e) => setInputValue({ ...inputValue, sale_price_try: setFloat(e.target.value) })} className='block w-[180px]  border-0 px-2 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 outline-none' />
                <span className='text-[23px]'>
                  &#8378;
                </span>
              </div>
              <div className="flex items-center gap-2 w-full border-b border-gray-300 py-3">
                <input type="number" step="0.1" min={0} value={inputValue.sale_price_usd} onChange={(e) => setInputValue({ ...inputValue, sale_price_usd: setFloat(e.target.value) })} className='block w-[180px]  border-0 px-2 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 outline-none' />
                <span className='text-[23px]'>
                  &#36;
                </span>
              </div>
              <div className="flex items-center gap-2 w-full py-3">
                <input type="number" step="0.1" min={0} value={inputValue.sale_price_eur} onChange={(e) => setInputValue({ ...inputValue, sale_price_eur: setFloat(e.target.value) })} className='block w-[180px]  border-0 px-2 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 outline-none' />
                <span className='text-[23px]'>
                  &#8364;
                </span>
              </div>
            </div>
          </GeneralInput>
          <GeneralInput
            title="2. Satış Fiyatı"
            description=''
            type="text"
            required={true}
          >
            <div className="flex items-center gap-2 w-full bg-gray-100 p-3 rounded-md">
              <input type="number" step="0.1" min={0} value={inputValue.second_sale_price} onChange={(e) => setInputValue({ ...inputValue, second_sale_price: setFloat(e.target.value) })} className='block w-[180px] border-0 px-2 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 outline-none' />
              <span className='text-[23px]'>
                &#8378;
              </span>
            </div>
          </GeneralInput>
          <GeneralInput
            title="Stoktan Düş"
            description='Ürün satıldıktan sonra ürün miktarı eksilir.'
            type="text"
            required={true}
          >
            <select name="productCode" id="productCode" value={inputValue.deduct_from_stock} onChange={(e) => setInputValue({ ...inputValue, deduct_from_stock: setBool(e.target.value) })} className='block w-1/2 rounded-md border-0 px-3 py-4 text-gray-400 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 outline-none'>
              <option value="true" defaultChecked>-Evet-</option>
              <option value="false">-Hayir-</option>
            </select>
          </GeneralInput>
          <GeneralInput
            title="Durum"
            description='Ürünleri aktif ya da pasif edin'
            type="text"
            required={true}
          >
            <select name="productCode" id="productCode" value={inputValue.status} onChange={(e) => setInputValue({ ...inputValue, status: e.target.value })} className='block w-1/2 rounded-md border-0 px-3 py-4 text-gray-400 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 outline-none'>
              <option value="active" defaultChecked>-Açık-</option>
              <option value="inactive">-Kapalı-</option>
            </select>
          </GeneralInput>
          <GeneralInput
            title="Özellik Bölümü"
            description='Ürünlerin özellik tabını gösterin ya da göstermeyin.'
            type="text"
            required={true}
          >
            <select value={inputValue.show_features} onChange={(e) => setInputValue({ ...inputValue, show_features: setBool(e.target.value) })} className='block w-1/2 rounded-md border-0 px-3 py-4 text-gray-400 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 outline-none'>
              <option value="true" defaultChecked>-Göster-</option>
              <option value="false">-Gizle-</option>
            </select>
          </GeneralInput>
          <GeneralInput
            title="Yeni Ürün Geçerlilik Süresi"
            description=''
            required={true}
          >
            <DatePicker
              className='block w-[100%!important] rounded-md border-0 px-3 py-4 text-gray-400 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 outline-none'
              minDate={new Date()}
              dateFormat="dd-MM-yyyy"
              selected={inputValue.product_validity_periods}
              onChange={(date) => setInputValue({ ...inputValue, product_validity_periods: date.toISOString().split('T')[0] })}
            />
          </GeneralInput>
          <GeneralInput
            title="Sıralama"
            description=''
            required={true}
          >
            <input type="number" min={0} step="1" value={inputValue.sort_order} onChange={(e) => setInputValue({ ...inputValue, sort_order: setFloat(e.target.value) })} className='block w-1/2 rounded-md border-0 px-2 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 outline-none' />
          </GeneralInput>
          <GeneralInput
            title="Anasayfada Göster"
            description='Anasayfa sırasına ayarlamak için sayı giriniz 0’dan büyük sayı girerseniz anasayfada gösterir ve o sırayı alır. 0 girerseniz anasayfada göstermez.'
            required={true}
          >
            <input min={0} step="1" value={inputValue.show_on_home} onChange={(e) => setInputValue({ ...inputValue, show_on_home: e.target.value })} className='block w-1/2 rounded-md border-0 px-2 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 outline-none' />
          </GeneralInput>
          <GeneralInput
            title="Yeni Ürün"
            description=''
            required={true}
          >
            <select value={inputValue.is_new} onChange={(e) => setInputValue({ ...inputValue, is_new: setBool(e.target.value) })} className='block w-1/2 rounded-md border-0 px-3 py-4 text-gray-400 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 outline-none'>
              <option value="true">-Evet-</option>
              <option value="false" >-Hayir-</option>
            </select>
          </GeneralInput>
          <GeneralInput
            title="Taksit"
            description=''
            required={true}
          >

            <select value={inputValue.installment} onChange={(e) => setInputValue({ ...inputValue, installment: setBool(e.target.value) })} className='block w-1/2 rounded-md border-0 px-3 py-4 text-gray-400 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 outline-none'>
              <option value="true">-Evet-</option>
              <option value="false">-Hayir-</option>
            </select>

          </GeneralInput>
          <GeneralInput
            title="Garanti Süresi"
            description='Ürün için verilen ay cinsinden garanti süresi.'
            required={true}
          >
            <input type="text" value={inputValue.guarantee_period} onChange={(e) => setInputValue({ ...inputValue, guarantee_period: e.target.value })} className='block w-1/2 rounded-md border-0 px-2 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 outline-none' />
          </GeneralInput>

        </div>
      </div>
    </>
  )
}
