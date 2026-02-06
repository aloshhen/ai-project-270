import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import {
  Home,
  Info,
  Mail,
  Menu,
  X,
  Send,
  CheckCircle,
  ChevronRight,
  Sparkles,
  Target,
  Heart,
  MapPin,
  Phone,
  Clock
} from 'lucide-react'

// SafeIcon component for Lucide icons
const SafeIcon = ({ name, size = 24, className = '', color }) => {
  const iconMap = {
    home: Home,
    info: Info,
    mail: Mail,
    menu: Menu,
    x: X,
    send: Send,
    'check-circle': CheckCircle,
    'chevron-right': ChevronRight,
    sparkles: Sparkles,
    target: Target,
    heart: Heart,
    'map-pin': MapPin,
    phone: Phone,
    clock: Clock
  }

  const IconComponent = iconMap[name] || Info

  return <IconComponent size={size} className={className} color={color} />
}

// Web3Forms Handler Hook
const useFormHandler = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isError, setIsError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e, accessKey) => {
    e.preventDefault()
    setIsSubmitting(true)
    setIsError(false)

    const formData = new FormData(e.target)
    formData.append('access_key', accessKey)

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
      })

      const data = await response.json()

      if (data.success) {
        setIsSuccess(true)
        e.target.reset()
      } else {
        setIsError(true)
        setErrorMessage(data.message || 'Something went wrong')
      }
    } catch (error) {
      setIsError(true)
      setErrorMessage('Network error. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const resetForm = () => {
    setIsSuccess(false)
    setIsError(false)
    setErrorMessage('')
  }

  return { isSubmitting, isSuccess, isError, errorMessage, handleSubmit, resetForm }
}

// Scroll reveal component
const ScrollReveal = ({ children, delay = 0 }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  )
}

// Navigation Component
const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navItems = [
    { id: 'home', label: 'Home', icon: 'home' },
    { id: 'about', label: 'About', icon: 'info' },
    { id: 'contact', label: 'Contact', icon: 'mail' }
  ]

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setIsMenuOpen(false)
    }
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-slate-950/90 backdrop-blur-xl border-b border-slate-800/50">
      <nav className="container mx-auto max-w-7xl px-4 md:px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-xl flex items-center justify-center">
              <SafeIcon name="sparkles" size={20} className="text-white" />
            </div>
            <span className="text-xl font-bold text-white tracking-tight">Brand</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors font-medium"
              >
                <SafeIcon name={item.icon} size={18} />
                {item.label}
              </button>
            ))}
            <button
              onClick={() => scrollToSection('contact')}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-lg font-semibold transition-all transform hover:scale-105"
            >
              Get Started
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden w-10 h-10 flex items-center justify-center text-white"
          >
            {isMenuOpen ? <SafeIcon name="x" size={24} /> : <SafeIcon name="menu" size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden"
            >
              <div className="py-4 space-y-3 border-t border-slate-800/50 mt-4">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="flex items-center gap-3 w-full text-left text-slate-400 hover:text-white transition-colors py-2 font-medium"
                  >
                    <SafeIcon name={item.icon} size={20} />
                    {item.label}
                  </button>
                ))}
                <button
                  onClick={() => scrollToSection('contact')}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors mt-2"
                >
                  Get Started
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  )
}

// Hero Section
const HeroSection = () => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-600/20 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto max-w-7xl px-4 md:px-6 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/30 rounded-full px-4 py-2 mb-8">
              <SafeIcon name="sparkles" size={16} className="text-indigo-400" />
              <span className="text-indigo-300 text-sm font-medium">Welcome to the future</span>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 tracking-tight leading-tight">
              Create Something{' '}
              <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-indigo-400 bg-clip-text text-transparent">
                Amazing
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
              We build beautiful digital experiences that captivate your audience and drive results. Transform your vision into reality.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-xl text-lg font-bold transition-all transform hover:scale-105 flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30"
              >
                Start Your Journey
                <SafeIcon name="chevron-right" size={20} />
              </button>
              <button
                onClick={() => document.getElementById('about').scrollIntoView({ behavior: 'smooth' })}
                className="bg-slate-800/50 hover:bg-slate-800 text-white px-8 py-4 rounded-xl text-lg font-bold transition-all backdrop-blur-sm border border-slate-700 hover:border-slate-600"
              >
                Learn More
              </button>
            </div>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 max-w-4xl mx-auto"
        >
          {[
            { value: '10+', label: 'Years Experience' },
            { value: '500+', label: 'Projects Done' },
            { value: '100+', label: 'Happy Clients' },
            { value: '24/7', label: 'Support' }
          ].map((stat, index) => (
            <div key={index} className="text-center p-4 bg-slate-900/50 rounded-2xl border border-slate-800">
              <div className="text-3xl md:text-4xl font-black text-indigo-400 mb-1">{stat.value}</div>
              <div className="text-slate-500 text-sm">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// About Section
const AboutSection = () => {
  const features = [
    {
      icon: 'target',
      title: 'Our Mission',
      description: 'To deliver exceptional digital solutions that empower businesses to thrive in the modern world.'
    },
    {
      icon: 'heart',
      title: 'Our Values',
      description: 'We believe in transparency, innovation, and putting our clients first in everything we do.'
    },
    {
      icon: 'sparkles',
      title: 'Our Approach',
      description: 'Combining creativity with technical excellence to create products that truly stand out.'
    }
  ]

  return (
    <section id="about" className="py-24 md:py-32 relative overflow-hidden">
      <div className="container mx-auto max-w-7xl px-4 md:px-6">
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="text-indigo-400 font-semibold uppercase tracking-wider text-sm">About Us</span>
            <h2 className="text-4xl md:text-6xl font-black text-white mt-4 mb-6 tracking-tight">
              Who We <span className="text-indigo-400">Are</span>
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              A passionate team of creators, developers, and strategists dedicated to building the future of digital experiences.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <ScrollReveal key={index} delay={index * 0.1}>
              <div className="group bg-gradient-to-br from-slate-900 to-slate-950 p-8 rounded-2xl border border-slate-800 hover:border-indigo-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/10 h-full">
                <div className="w-14 h-14 bg-indigo-500/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-indigo-500/20 transition-colors">
                  <SafeIcon name={feature.icon} size={28} className="text-indigo-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
                <p className="text-slate-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Image Section */}
        <ScrollReveal delay={0.3}>
          <div className="mt-16 bg-slate-900/50 rounded-3xl overflow-hidden border border-slate-800">
            <div className="grid md:grid-cols-2 gap-8 p-8 md:p-12 items-center">
              <div>
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
                  Why Choose Our Services?
                </h3>
                <ul className="space-y-4">
                  {[
                    'Cutting-edge technology and modern frameworks',
                    'Dedicated support throughout your journey',
                    'Scalable solutions for growing businesses',
                    'Affordable pricing with premium quality'
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3 text-slate-300">
                      <div className="w-6 h-6 bg-indigo-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <SafeIcon name="check-circle" size={14} className="text-indigo-400" />
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80"
                  alt="Team working"
                  className="rounded-2xl w-full h-64 md:h-80 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 to-transparent rounded-2xl" />
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}

// Contact Section
const ContactSection = () => {
  const { isSubmitting, isSuccess, isError, errorMessage, handleSubmit, resetForm } = useFormHandler()
  const ACCESS_KEY = 'YOUR_WEB3FORMS_ACCESS_KEY' // Replace with your Web3Forms Access Key from https://web3forms.com

  const contactInfo = [
    { icon: 'map-pin', label: 'Address', value: '123 Main Street, City, Country' },
    { icon: 'phone', label: 'Phone', value: '+1 (555) 123-4567' },
    { icon: 'clock', label: 'Hours', value: 'Mon - Fri: 9AM - 6PM' }
  ]

  return (
    <section id="contact" className="py-24 md:py-32 bg-slate-900/30 telegram-safe-bottom">
      <div className="container mx-auto max-w-7xl px-4 md:px-6">
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="text-indigo-400 font-semibold uppercase tracking-wider text-sm">Get In Touch</span>
            <h2 className="text-4xl md:text-6xl font-black text-white mt-4 mb-6 tracking-tight">
              Contact <span className="text-indigo-400">Us</span>
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Ready to start your project? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
          <ScrollReveal>
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">Let's Talk</h3>
                <p className="text-slate-400 leading-relaxed mb-8">
                  Whether you have a question about our services, pricing, or just want to say hello, our team is ready to answer all your questions.
                </p>
              </div>

              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-indigo-500/10 rounded-xl flex items-center justify-center">
                      <SafeIcon name={info.icon} size={24} className="text-indigo-400" />
                    </div>
                    <div>
                      <div className="text-slate-500 text-sm">{info.label}</div>
                      <div className="text-white font-semibold">{info.value}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Social Links */}
              <div className="pt-8 border-t border-slate-800">
                <p className="text-slate-500 mb-4">Follow us on social media</p>
                <div className="flex gap-4">
                  {['facebook', 'twitter', 'instagram', 'linkedin'].map((social) => (
                    <button
                      key={social}
                      className="w-10 h-10 bg-slate-800 hover:bg-indigo-600 rounded-lg flex items-center justify-center transition-colors"
                    >
                      <SafeIcon name={social} size={20} className="text-slate-300" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Contact Form */}
          <ScrollReveal delay={0.2}>
            <div className="bg-slate-900/50 p-8 rounded-2xl border border-slate-800">
              <AnimatePresence mode="wait">
                {!isSuccess ? (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    onSubmit={(e) => handleSubmit(e, ACCESS_KEY)}
                    className="space-y-6"
                  >
                    <div>
                      <label className="block text-slate-400 text-sm font-medium mb-2">Your Name</label>
                      <input
                        type="text"
                        name="name"
                        placeholder="John Doe"
                        required
                        className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-400 text-sm font-medium mb-2">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        placeholder="john@example.com"
                        required
                        className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-400 text-sm font-medium mb-2">Message</label>
                      <textarea
                        name="message"
                        placeholder="Tell us about your project..."
                        rows="4"
                        required
                        className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition-colors resize-none"
                      ></textarea>
                    </div>

                    {isError && (
                      <div className="text-red-400 text-sm bg-red-500/10 p-3 rounded-lg">
                        {errorMessage}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-700 disabled:cursor-not-allowed text-white px-8 py-4 rounded-xl font-bold transition-all transform hover:scale-[1.02] disabled:transform-none flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          Sending...
                        </>
                      ) : (
                        <>
                          <SafeIcon name="send" size={20} />
                          Send Message
                        </>
                      )}
                    </button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4, type: "spring" }}
                    className="text-center py-12"
                  >
                    <div className="bg-indigo-500/20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                      <SafeIcon name="check-circle" size={40} className="text-indigo-400" />
                    </div>
                    <h3 className="text-3xl font-bold text-white mb-4">
                      Message Sent!
                    </h3>
                    <p className="text-slate-400 mb-8">
                      Thank you for reaching out. We'll get back to you as soon as possible.
                    </p>
                    <button
                      onClick={resetForm}
                      className="text-indigo-400 hover:text-indigo-300 font-semibold transition-colors"
                    >
                      Send Another Message
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}

// Footer Component
const Footer = () => {
  return (
    <footer className="bg-slate-950 border-t border-slate-900 py-12">
      <div className="container mx-auto max-w-7xl px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-lg flex items-center justify-center">
              <SafeIcon name="sparkles" size={16} className="text-white" />
            </div>
            <span className="text-lg font-bold text-white">Brand</span>
          </div>

          <div className="flex gap-8 text-slate-500 text-sm">
            <button onClick={() => document.getElementById('home').scrollIntoView({ behavior: 'smooth' })} className="hover:text-white transition-colors">Home</button>
            <button onClick={() => document.getElementById('about').scrollIntoView({ behavior: 'smooth' })} className="hover:text-white transition-colors">About</button>
            <button onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })} className="hover:text-white transition-colors">Contact</button>
          </div>

          <div className="text-slate-600 text-sm">
            © 2024 Brand. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  )
}

// Main App Component
function App() {
  return (
    <div className="min-h-screen bg-slate-950 mobile-safe-container">
      <Navigation />
      <main>
        <HeroSection />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  )
}

export default App