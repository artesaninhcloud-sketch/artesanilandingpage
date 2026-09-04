import { CartProvider } from './context/CartContext'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { FeatureStrip } from './components/FeatureStrip'
import { ProductGrid } from './components/ProductGrid'
import { About } from './components/About'
import { HowItWorks } from './components/HowItWorks'
import { Testimonials } from './components/Testimonials'
import { Location } from './components/Location'
import { Faq } from './components/Faq'
import { Footer } from './components/Footer'
import { CartDrawer } from './components/CartDrawer'
import { WhatsAppButton } from './components/WhatsAppButton'
import { MobileCartBar } from './components/MobileCartBar'
import { Toast } from './components/Toast'

function App() {
  return (
    <CartProvider>
      <a className="skip-link" href="#conteudo">
        Ir para o conteúdo
      </a>
      <Header />
      <main id="conteudo">
        <Hero />
        <FeatureStrip />
        <ProductGrid />
        <About />
        <HowItWorks />
        <Testimonials />
        <Location />
        <Faq />
      </main>
      <Footer />
      <CartDrawer />
      <WhatsAppButton />
      <MobileCartBar />
      <Toast />
    </CartProvider>
  )
}

export default App
