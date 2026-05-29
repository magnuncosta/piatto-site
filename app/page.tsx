import Header       from '@/components/Header'
import Hero         from '@/components/Hero'
import Stats        from '@/components/Stats'
import Portfolio    from '@/components/Portfolio'
import Services     from '@/components/Services'
import About        from '@/components/About'
import Process      from '@/components/Process'
import Testimonials from '@/components/Testimonials'
import ContactCTA   from '@/components/ContactCTA'
import Footer       from '@/components/Footer'
import WhatsAppBtn  from '@/components/WhatsAppBtn'

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Stats />
        <Portfolio />
        <Services />
        <About />
        <Process />
        <Testimonials />
        <ContactCTA />
      </main>
      <Footer />
      <WhatsAppBtn />
    </>
  )
}
