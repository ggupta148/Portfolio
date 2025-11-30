import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa'

gsap.registerPlugin(ScrollTrigger)

const Contact = ({ data }) => {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const infoRef = useRef(null)
  const formRef = useRef(null)
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    alert('Message sent! (This is a demo)')
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

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

      gsap.from(infoRef.current, {
        scrollTrigger: {
          trigger: infoRef.current,
          start: 'top 80%',
        },
        x: -100,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
      })

      gsap.from(formRef.current.children, {
        scrollTrigger: {
          trigger: formRef.current,
          start: 'top 80%',
        },
        x: 100,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out'
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [data])

  const handleContactHover = (e) => {
    gsap.to(e.currentTarget, {
      x: 10,
      duration: 0.3,
      ease: 'power2.out'
    })
  }

  const handleContactLeave = (e) => {
    gsap.to(e.currentTarget, {
      x: 0,
      duration: 0.3,
      ease: 'power2.out'
    })
  }

  return (
    <section ref={sectionRef} id="contact" className="relative py-32 px-4">
      <div className="section-divider mb-20"></div>
      
      <div className="max-w-6xl mx-auto">
        <div>
          <h2 ref={titleRef} className="text-5xl md:text-6xl font-black text-center mb-20">
            Get In <span className="text-gradient glow-text">Touch</span>
          </h2>

          <div className="grid md:grid-cols-2 gap-16">
            <div ref={infoRef}>
              <h3 className="text-3xl font-black mb-6 text-gradient">Let's work together!</h3>
              <p className="text-gray-200 text-xl mb-12 leading-relaxed">
                {data?.message || 'Feel free to reach out for collaborations or just a friendly hello'}
              </p>

              <div className="space-y-6">
                {[
                  { icon: FaEnvelope, label: 'Email', value: data?.email || 'your.email@example.com' },
                  { icon: FaPhone, label: 'Phone', value: data?.phone || '+1 234 567 8900' },
                  { icon: FaMapMarkerAlt, label: 'Location', value: data?.location || 'Your City, Country' }
                ].map((item, index) => (
                  <div
                    key={index}
                    onMouseEnter={handleContactHover}
                    onMouseLeave={handleContactLeave}
                    className="flex items-center gap-6 p-6 bg-gradient-to-br from-cyan-500/5 to-purple-600/5 rounded-2xl border border-cyan-500/20 cursor-pointer card-glow group"
                  >
                    <div className="w-14 h-14 flex items-center justify-center rounded-full bg-gradient-to-br from-cyan-500/20 to-purple-600/20 text-2xl text-cyan-400 group-hover:scale-110 transition-transform">
                      <item.icon />
                    </div>
                    <div>
                      <div className="text-sm text-gray-400 uppercase tracking-wider mb-1">{item.label}</div>
                      <div className="text-gray-200 font-semibold text-lg">{item.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-6 py-4 bg-gradient-to-br from-cyan-500/5 to-purple-600/5 border border-cyan-500/30 rounded-2xl focus:border-cyan-400 focus:outline-none transition-all text-gray-200 placeholder-gray-500"
                />
              </div>
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-6 py-4 bg-gradient-to-br from-cyan-500/5 to-purple-600/5 border border-cyan-500/30 rounded-2xl focus:border-cyan-400 focus:outline-none transition-all text-gray-200 placeholder-gray-500"
                />
              </div>
              <div>
                <textarea
                  name="message"
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="6"
                  className="w-full px-6 py-4 bg-gradient-to-br from-cyan-500/5 to-purple-600/5 border border-cyan-500/30 rounded-2xl focus:border-cyan-400 focus:outline-none transition-all text-gray-200 placeholder-gray-500 resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full px-10 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl font-bold text-lg hover:shadow-2xl hover:shadow-cyan-500/50 transition-all"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="text-center mt-20 text-gray-400">
        <p className="text-lg">© 2024 Portfolio. Built with React, GSAP & Tailwind CSS</p>
      </div>
    </section>
  )
}

export default Contact
