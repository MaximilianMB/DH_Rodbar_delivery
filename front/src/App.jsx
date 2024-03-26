import './App.css'
import { Category } from './components/Category'
import { ContentRight } from './components/ContentRight'
import { Footer } from './components/Footer'
import { LastProduct } from './components/LastProduct'
import { NotFound } from './components/NotFound'
import { Products } from "./components/Products"
import { SideBar } from './components/SideBar'
import { Routes, Route } from 'react-router-dom'
import { Users } from './components/Users'
function App() {
  return (
    <div className='contenedor-principal'>
      <div className='contenedor-1'>
        <SideBar />
      </div>
      <div className='contenedor-2'>
        <Routes>
          <Route path="/"  element={<ContentRight/>}/>
          <Route path="/lastProduct"  element={<LastProduct/>}/>
          <Route path="/category"  element={<Category/>}/>
          <Route path="/products"  element={<Products/>}/>
          <Route path="/users"  element={<Users/>}/>
          <Route path="*" element={<NotFound/>}/>
        </Routes>
        <Footer />
      </div>
    </div>
  )
}

export default App
