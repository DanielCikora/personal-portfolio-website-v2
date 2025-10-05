import Navigation from '@/components/layout/Navigation';
import Hero from '@/components/layout/Hero';
import Services from '@/components/layout/Services';
import Footer from '@/components/layout/Footer';

export default function Home() {
 return (
  <>
   <header>
    <Navigation />
   </header>
   <main>
    <Hero />
    <Services />
   </main>
   <footer>
    <Footer />
   </footer>
  </>
 );
}
