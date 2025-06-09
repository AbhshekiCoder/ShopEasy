import {Routes, Route} from 'react-router-dom'
import Navbar from './Components/Navbar'
import Home from './Pages/Home'
import Footer from './Components/Footer'
import Products from './Pages/Products'
import Cart from './Pages/Cart'
import Success from './order/Success'
import Cancel from './order/Cancel'
export default function App() {
  return (
    <> 
    <div className='flex flex-col min-h-screen'> 

    
    <Navbar/>
    <Routes>
      <Route path="/" element={<Home/>}></Route>
      <Route path='/products' element={<Products/>}></Route>
      <Route path='/cart' element={<Cart/>}></Route>
      <Route path='/success' element={<Success/>}></Route>
      <Route path='/cancel' element={<Cancel/>}></Route>

    </Routes>
    <Footer/>
    </div>
    </>
  )
}
