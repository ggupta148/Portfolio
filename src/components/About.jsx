import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const About = ({ data }) => {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const bioRef = useRef(null)
  const statsRef = useRef(null)

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

      gsap.from(bioRef.current.children, {
        scrollTrigger: {
          trigger: bioRef.current,
          start: 'top 80%',
        },
        x: -100,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out'
      })

      gsap.from(statsRef.current.children, {
        scrollTrigger: {
          trigger: statsRef.current,
          start: 'top 80%',
        },
        scale: 0,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'back.out(1.7)'
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [data])

  const handleStatHover = (e) => {
    gsap.to(e.currentTarget, {
      scale: 1.1,
      duration: 0.3,
      ease: 'power2.out'
    })
  }

  const handleStatLeave = (e) => {
    gsap.to(e.currentTarget, {
      scale: 1,
      duration: 0.3,
      ease: 'power2.out'
    })
  }

  return (
    <section ref={sectionRef} id="about" className="relative py-32 px-4">
      <div className="section-divider mb-20"></div>
      
      <div className="max-w-6xl mx-auto">
        <div>
          <h2 ref={titleRef} className="text-5xl md:text-6xl font-black text-center mb-16">
            About <span className="text-gradient glow-text">Me</span>
          </h2>

          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div ref={bioRef} className="space-y-6">
              <div className="p-8 bg-gradient-to-br from-cyan-500/5 to-purple-600/5 rounded-2xl border border-cyan-500/20 card-glow">
                <p className="text-gray-200 text-xl leading-relaxed">
                  {data?.bio || 'I am a passionate full stack web developer with expertise in building modern, scalable web applications. I love turning ideas into reality through clean code and intuitive user experiences.'}
                </p>
              </div>
              <div className="p-8 bg-gradient-to-br from-purple-600/5 to-cyan-500/5 rounded-2xl border border-purple-500/20 card-glow">
                <p className="text-gray-200 text-xl leading-relaxed">
                  {data?.bio2 || 'With a strong foundation in both frontend and backend technologies, I create end-to-end solutions that are performant, maintainable, and user-friendly.'}
                </p>
              </div>
            </div>

            <div ref={statsRef} className="grid grid-cols-2 gap-6">
              {(data?.stats || [
                { label: 'Years Experience', value: '3+' },
                { label: 'Projects Completed', value: '50+' },
                { label: 'Technologies', value: '20+' },
                { label: 'Happy Clients', value: '30+' }
              ]).map((stat, index) => (
                <div
                  key={index}
                  onMouseEnter={handleStatHover}
                  onMouseLeave={handleStatLeave}
                  className="relative p-8 bg-gradient-to-br from-cyan-500/10 to-purple-600/10 rounded-2xl text-center border border-cyan-500/30 hover:border-cyan-400 transition-all cursor-pointer card-glow overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 to-purple-600/0 group-hover:from-cyan-500/20 group-hover:to-purple-600/20 transition-all"></div>
                  <div className="relative z-10">
                    <div className="text-5xl font-black text-gradient mb-3">{stat.value}</div>
                    <div className="text-gray-300 font-semibold text-sm uppercase tracking-wider">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
