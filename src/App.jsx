import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Contact from './components/Contact'

function App() {
  const [data, setData] = useState(null)

  useEffect(() => {
    fetch('/src/data/portfolio.json')
      .then(res => res.json())
      .then(setData)
      .catch(err => console.error('Error loading portfolio data:', err))
  }, [])

  if (!data) return <div className="flex items-center justify-center min-h-screen">Loading...</div>

  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero data={data.hero} />
      <About data={data.about} />
      <Skills data={data.skills} />
      <Projects data={data.projects} />
      <Contact data={data.contact} />
    </div>
  )
}

export default App
