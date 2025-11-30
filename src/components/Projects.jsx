import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa'

const Projects = ({ data }) => {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const projectsGridRef = useRef(null)

  const defaultProjects = [
    {
      title: 'E-Commerce Platform',
      description: 'Full-stack e-commerce solution with payment integration',
      tech: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      github: '#',
      live: '#'
    },
    {
      title: 'Task Management App',
      description: 'Collaborative task management with real-time updates',
      tech: ['React', 'Firebase', 'Tailwind CSS'],
      github: '#',
      live: '#'
    },
    {
      title: 'Social Media Dashboard',
      description: 'Analytics dashboard for social media metrics',
      tech: ['React', 'Chart.js', 'Express', 'PostgreSQL'],
      github: '#',
      live: '#'
    }
  ]

  const projects = data?.projects || defaultProjects

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

      gsap.from(projectsGridRef.current.children, {
        scrollTrigger: {
          trigger: projectsGridRef.current,
          start: 'top 80%',
        },
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out'
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [data])

  const handleProjectHover = (e) => {
    gsap.to(e.currentTarget, {
      y: -15,
      duration: 0.4,
      ease: 'power2.out'
    })
  }

  const handleProjectLeave = (e) => {
    gsap.to(e.currentTarget, {
      y: 0,
      duration: 0.4,
      ease: 'power2.out'
    })
  }

  const handleLinkHover = (e) => {
    gsap.to(e.currentTarget, {
      scale: 1.1,
      duration: 0.2,
      ease: 'power2.out'
    })
  }

  const handleLinkLeave = (e) => {
    gsap.to(e.currentTarget, {
      scale: 1,
      duration: 0.2,
      ease: 'power2.out'
    })
  }

  return (
    <section ref={sectionRef} id="projects" className="relative py-32 px-4">
      <div className="section-divider mb-20"></div>
      
      <div className="max-w-7xl mx-auto">
        <div>
          <h2 ref={titleRef} className="text-5xl md:text-6xl font-black text-center mb-20">
            Featured <span className="text-gradient glow-text">Projects</span>
          </h2>

          <div ref={projectsGridRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {projects.map((project, index) => (
              <div
                key={index}
                onMouseEnter={handleProjectHover}
                onMouseLeave={handleProjectLeave}
                className="relative bg-gradient-to-br from-cyan-500/5 to-purple-600/5 rounded-2xl overflow-hidden border border-cyan-500/20 hover:border-cyan-400 transition-all group cursor-pointer card-glow"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 to-purple-600/0 group-hover:from-cyan-500/10 group-hover:to-purple-600/10 transition-all"></div>
                
                <div className="relative h-56 bg-gradient-to-br from-cyan-500/20 to-purple-600/20 flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSg2LDE4MiwyMTIsMC4xKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30"></div>
                  <div className="text-7xl group-hover:scale-110 transition-transform duration-500 relative z-10">
                    💻
                  </div>
                </div>

                <div className="relative p-8">
                  <h3 className="text-2xl font-black mb-3 text-gray-100 group-hover:text-gradient transition-all">
                    {project.title}
                  </h3>
                  <p className="text-gray-300 mb-6 leading-relaxed">{project.description}</p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((tech, i) => (
                      <span
                        key={i}
                        className="px-4 py-1.5 bg-gradient-to-r from-cyan-500/20 to-purple-600/20 border border-cyan-500/30 text-cyan-300 text-sm font-semibold rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-6">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      onMouseEnter={handleLinkHover}
                      onMouseLeave={handleLinkLeave}
                      className="flex items-center gap-2 text-gray-300 hover:text-cyan-400 transition-colors font-semibold"
                    >
                      <FaGithub className="text-xl" /> Code
                    </a>
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      onMouseEnter={handleLinkHover}
                      onMouseLeave={handleLinkLeave}
                      className="flex items-center gap-2 text-gray-300 hover:text-cyan-400 transition-colors font-semibold"
                    >
                      <FaExternalLinkAlt className="text-xl" /> Live
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Projects
