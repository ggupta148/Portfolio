import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { FaGithub, FaLinkedin, FaTwitter, FaCode } from 'react-icons/fa'

const Hero = ({ data }) => {
  const heroRef = useRef(null)
  const titleRef = useRef(null)
  const subtitleRef = useRef(null)
  const descRef = useRef(null)
  const socialsRef = useRef(null)
  const buttonsRef = useRef(null)
  const scrollRef = useRef(null)
  const particlesRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Create floating particles
      const particleCount = 50
      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div')
        particle.className = 'particle'
        const size = Math.random() * 4 + 1
        particle.style.width = `${size}px`
        particle.style.height = `${size}px`
        particle.style.left = `${Math.random() * 100}%`
        particle.style.top = `${Math.random() * 100}%`
        particle.style.background = Math.random() > 0.5 ? '#06b6d4' : '#8b5cf6'
        particlesRef.current.appendChild(particle)

        gsap.to(particle, {
          y: `${Math.random() * 200 - 100}`,
          x: `${Math.random() * 200 - 100}`,
          opacity: Math.random() * 0.5 + 0.2,
          duration: Math.random() * 3 + 2,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut'
        })
      }

      const tl = gsap.timeline()
      
      tl.from(titleRef.current, {
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: 'power4.out'
      })
      .from(subtitleRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
      }, '-=0.6')
      .from(descRef.current, {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
      }, '-=0.5')
      .from(socialsRef.current.children, {
        scale: 0,
        opacity: 0,
        rotation: 360,
        duration: 0.6,
        stagger: 0.1,
        ease: 'back.out(2)'
      }, '-=0.4')
      .from(buttonsRef.current.children, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out'
      }, '-=0.3')

      gsap.to(scrollRef.current, {
        y: 15,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut'
      })
    }, heroRef)

    return () => ctx.revert()
  }, [])

  const handleSocialHover = (e) => {
    gsap.to(e.currentTarget, {
      scale: 1.2,
      rotation: 5,
      duration: 0.3,
      ease: 'power2.out'
    })
  }

  const handleSocialLeave = (e) => {
    gsap.to(e.currentTarget, {
      scale: 1,
      rotation: 0,
      duration: 0.3,
      ease: 'power2.out'
    })
  }

  const handleButtonHover = (e) => {
    gsap.to(e.currentTarget, {
      scale: 1.05,
      duration: 0.3,
      ease: 'power2.out'
    })
  }

  const handleButtonLeave = (e) => {
    gsap.to(e.currentTarget, {
      scale: 1,
      duration: 0.3,
      ease: 'power2.out'
    })
  }

  return (
    <section ref={heroRef} id="home" className="relative min-h-screen flex items-center justify-center px-4 pt-16 overflow-hidden">
      {/* Animated background orbs */}
      <div className="orb w-96 h-96 bg-cyan-500 top-20 -left-48 animate-pulse"></div>
      <div className="orb w-96 h-96 bg-purple-600 bottom-20 -right-48 animate-pulse" style={{ animationDelay: '1s' }}></div>
      
      {/* Particles container */}
      <div ref={particlesRef} className="absolute inset-0 pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto text-center relative z-10">
        <div>
          {/* Decorative icon */}
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-gradient-to-br from-cyan-500/10 to-purple-600/10 rounded-2xl border border-cyan-500/20">
              <FaCode className="text-5xl text-cyan-400" />
            </div>
          </div>

          <h1 ref={titleRef} className="text-6xl md:text-8xl font-black mb-6 leading-tight">
            Hi, I'm <span className="text-gradient glow-text">{data?.name || 'Your Name'}</span>
          </h1>
          
          <p ref={subtitleRef} className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-300 to-purple-400 bg-clip-text text-transparent mb-8">
            {data?.title || 'Full Stack Web Developer'}
          </p>

          <p ref={descRef} className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            {data?.description || 'Building amazing web experiences with modern technologies'}
          </p>

          <div ref={socialsRef} className="flex justify-center gap-6 mb-12">
            {[
              { icon: FaGithub, url: data?.social?.github },
              { icon: FaLinkedin, url: data?.social?.linkedin },
              { icon: FaTwitter, url: data?.social?.twitter }
            ].map((social, index) => (
              <a
                key={index}
                href={social.url || '#'}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={handleSocialHover}
                onMouseLeave={handleSocialLeave}
                className="w-14 h-14 flex items-center justify-center rounded-full bg-gradient-to-br from-cyan-500/10 to-purple-600/10 border border-cyan-500/30 text-2xl text-cyan-400 hover:text-white hover:border-cyan-400 transition-all cursor-pointer card-glow"
              >
                <social.icon />
              </a>
            ))}
          </div>

          <div ref={buttonsRef} className="flex flex-wrap justify-center gap-4">
            <a
              href="#projects"
              onMouseEnter={handleButtonHover}
              onMouseLeave={handleButtonLeave}
              className="px-10 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full font-bold text-lg hover:shadow-2xl hover:shadow-cyan-500/50 transition-all cursor-pointer"
            >
              View My Work
            </a>
            <a
              href="#contact"
              onMouseEnter={handleButtonHover}
              onMouseLeave={handleButtonLeave}
              className="px-10 py-4 border-2 border-cyan-500 rounded-full font-bold text-lg hover:bg-cyan-500/10 hover:shadow-xl hover:shadow-cyan-500/30 transition-all cursor-pointer"
            >
              Contact Me
            </a>
          </div>
        </div>

        <div ref={scrollRef} className="absolute bottom-12 left-1/2 transform -translate-x-1/2">
          <div className="w-7 h-12 border-2 border-cyan-400 rounded-full flex justify-center shadow-lg shadow-cyan-500/30">
            <div className="w-1.5 h-3 bg-cyan-400 rounded-full mt-2 shadow-lg shadow-cyan-500/50" />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
