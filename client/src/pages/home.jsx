import { useState, useEffect } from 'react';
import { deleteData } from '../utils';
import { NavLink } from 'react-router-dom';
const Home = () => {
  const [data, setData] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/products`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setData(data.products.map(item => ({ ...item, selected: false })));
        }
      })
  }, [])
  // checkbox click
  const handleCheckbox = (id) => {
    const newData = data.map(item => {
      if (item.id === id) {
        return { ...item, selected: !item.selected }
      }
      return item;
    })
    setData(newData);
  }

  // select all checkbox
  const handleSelectAll = (e) => {
    e.preventDefault();
    setSelectAll(!selectAll)
    setData(data.map(item => ({ ...item, selected: !selectAll })))

  }

  // delete all
  const handleDeleteChoices = (e) => {
    e.preventDefault();
    let newData = data.filter(item => item.selected).map(item => parseInt(item.id))
    deleteData(newData)
  }

  // delete one
  const handleDeleteOne = (e, id) => {
    e.preventDefault();
    deleteData([parseInt(id)])
  }

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 w-[155px]">
              <button onClick={handleSelectAll} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Hepsini {selectAll ?  'Çıkar' : 'Seç' }
              </button>
            </th>
            <th scope="col" className="px-6 py-3"> Ürün Resmi </th>
            <th scope="col" className="px-6 py-3"> Ürün Adı </th>
            <th scope="col" className="px-6 py-3"> Ürün Kodu </th>
            <th scope="col" className="px-6 py-3"> Ürün Fiyatı </th>
            <th scope="col" className="px-6 py-3 w-[155px] text-center">
              {data.filter(item => item.selected).length >= 2 && (
                <button onClick={handleDeleteChoices} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                  Ürünleri Sil
                </button>
              )}
            </th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 && data.map((item) => (
            <tr key={item.id} className="bg-white border-b hover:bg-gray-50">
              <td className='px-6 py-4 text-center max-w-'>
                <input checked={item.selected} onChange={() => handleCheckbox(item.id)} type="checkbox" id={item.id} />
              </td>
              <td className="px-6 py-4 ">
              {item.main_image ? (<img src={`${process.env.REACT_APP_SUB_URL}${item.main_image}`} alt="product" className="w-20 h-20 rounded" /> ):
              (<i className="ri-camera-off-line text-[75px] rounded inline-flex items-center"></i>)}
              </td>
              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                {item.title}
              </td>
              <td className="px-6 py-4">
                {item.product_code}
              </td>
              <td className="px-6 py-4">
                {item?.sale_price_try} ₺ , {item.sale_price_eur} € , {item.sale_price_usd} $
              </td>
              <td className="px-6 py-4 text-right inline-flex gap-2">
                <button onClick={(e) => handleDeleteOne(e, item.id)} className="border-red-500 hover:bg-red-700 hover:text-white delay-100 transform text-red-700 font-medium text-[16px] py-2 px-4 rounded border">
                  <i className="ri-delete-bin-2-line mr-2 "></i>
                  Sil
                </button>
                <NavLink to={`/edit/${item.id}`} className="border-blue-500 hover:bg-blue-700 hover:text-white delay-100 transform text-blue-700 font-medium text-[16px] py-2 px-4 rounded border">
                  <i className="ri-edit-2-line mr-2 "></i>
                  Düzenle
                </NavLink>
              </td>
            </tr>))}
        </tbody>
      </table>
    </div>
  );
}

export default Home;
