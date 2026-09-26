import { useEffect, useState } from 'react'
import { loadSpecials } from '../../api'
import DishList from '../../components/DishList/DishList'
import { Link } from 'react-router-dom'
import "./Hero.css"

const Hero = () => {
  const [specials, setSpecials] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const ctrl = new AbortController();
    loadSpecials(ctrl.signal, setSpecials, setLoading, setError);
    return () => ctrl.abort();
  }, []);

  return (
    <>
    <hero>
      <section className="hero-banner">
        <p className="hero-kicker">Communal warmth · slow-cooked heritage</p>
        <h2>Mesob House at Addis Eats</h2>
        <p>Royal Doro Wat, clay-pot shiro, and gursha-ready platters delivered across Addis Ababa.</p>
        <Link to="/menu" className="hero-cta">See the full menu</Link>
      </section>
      <section className="hero-specials">
        <h3>Tonight’s specials</h3>
        {loading && <p>Loading the menu...</p>}
        {error && <p className="err">{error}</p>}
        {!loading && !error && <DishList dishes={specials} category="All" />}
      </section>
    </hero>
    </>
  )
}

export default Hero
