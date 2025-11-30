import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)
import { FaReact, FaNodeJs, FaDatabase, FaGitAlt } from 'react-icons/fa'
import { SiTailwindcss, SiMongodb, SiExpress, SiJavascript } from 'react-icons/si'

const Skills = ({ data }) => {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const skillsGridRef = useRef(null)
  const categoriesRef = useRef(null)

  const defaultSkills = [
    { name: 'React', icon: FaReact, color: '#61DAFB' },
    { name: 'Node.js', icon: FaNodeJs, color: '#339933' },
    { name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E' },
    { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#06B6D4' },
    { name: 'MongoDB', icon: SiMongodb, color: '#47A248' },
    { name: 'Express', icon: SiExpress, color: '#000000' },
    { name: 'Database', icon: FaDatabase, color: '#4479A1' },
    { name: 'Git', icon: FaGitAlt, color: '#F05032' }
  ]

  // data is already the skills object from portfolio.json
  const skills = Array.isArray(data) ? data : defaultSkills

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top 80%',
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
      })

      gsap.from(skillsGridRef.current.children, {
        scrollTrigger: {
          trigger: skillsGridRef.current,
          start: 'top 80%',
        },
        scale: 0,
        opacity: 0,
        rotation: 180,
        duration: 0.8,
        stagger: 0.1,
        ease: 'back.out(1.7)'
      })

      if (categoriesRef.current) {
        gsap.from(categoriesRef.current.children, {
          scrollTrigger: {
            trigger: categoriesRef.current,
            start: 'top 80%',
          },
          y: 50,
          opacity: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power3.out'
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [data])

  const handleSkillHover = (e) => {
    gsap.to(e.currentTarget, {
      scale: 1.15,
      rotation: 5,
      duration: 0.3,
      ease: 'power2.out'
    })
  }

  const handleSkillLeave = (e) => {
    gsap.to(e.currentTarget, {
      scale: 1,
      rotation: 0,
      duration: 0.3,
      ease: 'power2.out'
    })
  }

  return (
    <section ref={sectionRef} id="skills" className="relative py-10 px-4 overflow-hidden">
      <div className="section-divider"></div>
      
      {/* Background decorative elements */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div>
          <h2 ref={titleRef} className="text-5xl md:text-7xl font-black text-center mb-6">
            My <span className="text-gradient glow-text">Skills</span>
          </h2>
          <p className="text-center text-gray-300 text-xl mb-20 max-w-2xl mx-auto">
            Technologies and tools I use to bring ideas to life
          </p>

          {/* Main Skills Grid - Larger, more prominent */}
          <div ref={skillsGridRef} className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-6 md:gap-8 mb-24">
            {skills.map((skill, index) => (
              <div
                key={index}
                onMouseEnter={handleSkillHover}
                onMouseLeave={handleSkillLeave}
                className="group relative"
              >
                {/* Glow effect background */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-purple-600/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Card */}
                <div className="relative h-full p-8 bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm rounded-3xl border-2 border-cyan-500/20 group-hover:border-cyan-400/60 transition-all duration-300 cursor-pointer">
                  {/* Icon container with circular background */}
                  <div className="mb-6 flex justify-center">
                    <div className="relative w-24 h-24 flex items-center justify-center">
                      {/* Rotating border */}
                      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 opacity-0 group-hover:opacity-100 group-hover:animate-spin transition-opacity duration-300" style={{ animationDuration: '3s' }}></div>
                      
                      {/* Inner circle */}
                      <div className="absolute inset-1 rounded-full bg-gradient-to-br from-slate-800 to-slate-900"></div>
                      
                      {/* Icon */}
                      <div className="relative text-5xl transform group-hover:scale-110 transition-transform duration-300">
                        {skill.icon ? (
                          <skill.icon style={{ color: skill.color }} className="drop-shadow-lg" />
                        ) : (
                          <FaReact className="text-cyan-400 drop-shadow-lg" />
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* Skill name */}
                  <h3 className="text-center text-lg font-bold text-gray-200 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-purple-600 transition-all duration-300">
                    {skill.name}
                  </h3>
                  
                  {/* Decorative corner accents */}
                  <div className="absolute top-3 right-3 w-2 h-2 bg-cyan-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="absolute bottom-3 left-3 w-2 h-2 bg-purple-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
              </div>
            ))}
          </div>

          {/* Categories Section - Enhanced Design */}
          {data?.categories && (
            <div ref={categoriesRef} className="grid md:grid-cols-3 gap-8">
              {data.categories.map((category, index) => (
                <div 
                  key={index} 
                  className="group relative p-10 bg-gradient-to-br from-slate-800/60 to-slate-900/60 backdrop-blur-sm rounded-3xl border-2 border-cyan-500/20 hover:border-cyan-400/60 transition-all duration-300 card-glow"
                >
                  {/* Category icon/number */}
                  <div className="absolute -top-6 left-8 w-12 h-12 flex items-center justify-center bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl shadow-lg shadow-cyan-500/50 font-black text-xl">
                    {index + 1}
                  </div>
                  
                  <h3 className="text-2xl font-black text-gradient mb-8 mt-2">
                    {category.title}
                  </h3>
                  
                  <ul className="space-y-4">
                    {category.items.map((item, i) => (
                      <li key={i} className="flex items-center text-gray-200 text-lg group/item">
                        <div className="relative mr-4">
                          {/* Animated dot */}
                          <span className="w-3 h-3 bg-gradient-to-r from-cyan-400 to-purple-600 rounded-full block shadow-lg shadow-cyan-500/50"></span>
                          <span className="absolute inset-0 w-3 h-3 bg-gradient-to-r from-cyan-400 to-purple-600 rounded-full animate-ping opacity-75"></span>
                        </div>
                        <span className="group-hover/item:text-cyan-400 transition-colors duration-200">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                  
                  {/* Decorative gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 to-purple-600/0 group-hover:from-cyan-500/5 group-hover:to-purple-600/5 rounded-3xl transition-all duration-300 pointer-events-none"></div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default Skills
