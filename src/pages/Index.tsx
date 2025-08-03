import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Platform from '@/components/Platform';
import PTaaS from '@/components/PTaaS';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <Platform />
        <PTaaS />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
