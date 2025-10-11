import Navigation from '@/components/layout/Navigation';
import Hero from '@/components/layout/Hero';
import Services from '@/components/layout/Services';
import Footer from '@/components/layout/Footer';
import SlidingTransition from '@/components/ui/animations/SlidingTransition';

export default function Home() {
 return (
  <>
   <header>
    <Navigation />
   </header>
   <main>
    <Hero />
    <SlidingTransition />
    <Services />
   </main>
   <footer>
    <Footer />
   </footer>
  </>
 );
}
