import { BrowserRouter as Router, Routes, Route, NavLink  } from "react-router-dom";
import {
  Detail, Images, Discount, General, Home,
  EditDiscount, EditImages, EditDetail, EditGeneral,
  Edit
} from './pages';
import { Location } from './components';





function App() {
  return (
    <Router>
    <Location />
      <nav className="bg-white border-gray-200">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <NavLink to={"/"} className="flex items-center space-x-3 rtl:space-x-reverse">
            <img src="https://www.daynex.com.tr/upload/new_images/big-logo.png" className="h-14" alt="Logo" />
          </NavLink>
          <div className="hidden w-full md:block md:w-auto" id="navbar-default">
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white">
              <li className="flex items-center gap-2">
                <NavLink className="block py-2 px-3 text-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0" to="/add/general">
                  Ekle
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <section className="container mx-auto p-4">
      
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add/discount" element={<Discount />} />
          <Route path="/add/images" element={<Images />} />
          <Route path="/add/detail" element={<Detail />} />
          <Route path="/add/general" element={<General />} />
          <Route path="/edit/:id" element={<Edit />} >
            <Route path="discount" element={<EditDiscount />} />
            <Route path="images" element={<EditImages />} />
            <Route path="detail" element={<EditDetail />} />
            <Route path="general" element={<EditGeneral />} />
          </Route>
        </Routes>
      </section>
    </Router>
  );
}

export default App;


