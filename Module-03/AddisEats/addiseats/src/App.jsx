import { useState } from 'react'
import Header from './components/Header'
import Menu from './components/Menu'
import Footer from './components/Footer'
import { dishes } from './data'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const cat = "Main"
  const dish = dishes.filter((i)=> i.catagory===cat)
  // console.log(dish)
  // console.log(dishes)
  return (

    <>
      <Header/>
      <Menu/>
      <Footer/>
    </>
  )
}

export default App
