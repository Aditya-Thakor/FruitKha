import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home/Home';
import Shop from './pages/Shop/Shop';
import About from './pages/About/About';
import Contact from './pages/Contact/Contact';
import Collection from './pages/Collection/Collection';
import News from './pages/News/News';
import Layout from './pages/Layout/Layout';
import ProductPage from './pages/Shop/productPage/ProductPage';
import NotFound from './pages/404/NotFound';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';

import AdminLayout from './pages/Admin/AdminLayout';
import AdminDashboard from './pages/Admin/AdminDashboard';
import AdminProducts from './pages/Admin/AdminProducts';
import AdminUsers from './pages/Admin/AdminUsers';

function App() {

  //  npm i react-router-dom 
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout/>}>
            <Route path='' element={<Home/>} />
            <Route path='/shop' element={<Shop/>} ></Route>
            <Route path='/shop/:ft' element={<NotFound/>} ></Route>
            <Route path='/about' element={<About/>} />
            <Route path='/contact' element={<Contact/>} />
            <Route path='/collection' element={<Collection/>} />
            <Route path='/news' element={<News/>} />
            <Route path='/products/product/:pdt' element={<ProductPage/>} />
            <Route path='/login' element={<Login/>} />
            <Route path='/register' element={<Register/>} />
        </Route>

        {/* Admin Panel */}
        <Route path='/admin' element={<AdminLayout/>}>
          <Route index element={<AdminDashboard/>} />
          <Route path='products' element={<AdminProducts/>} />
          <Route path='users' element={<AdminUsers/>} />
        </Route>

        <Route path='/:page' element={<NotFound/>} />  
        <Route path='*' element={<NotFound/>}   /> 

        {/* <Route path='/' element={<Home/>} />
        <Route path='/shop' element={<Shop/>} />
        <Route path='/about' element={<About/>} />
        <Route path='/contact' element={<Contact/>} />
        <Route path='/collection' element={<Collection/>} />
        <Route path='/news' element={<News/>} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
