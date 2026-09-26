import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import Main from './components/Main/Main'
import Menu from './components/Menu/Menu'
import Home from './Pages/HOME/Home'
import { dishes } from './data'
import './App.css'

function App() {
  const cat = "Main"
  const dish = dishes.filter((i)=> i.category===cat)
  // console.log(dish)
  // console.log(dishes)
  return (
    <BrowserRouter>
      <div className="app-container">
        <Header/>
        <Main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
          </Routes>
        </Main>
        <Footer/>
      </div>
    </BrowserRouter>
  )
}

export default App
