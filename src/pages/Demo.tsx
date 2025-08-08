import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AdvancedDemo from '@/components/AdvancedDemo';

const DemoPage = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const industry = urlParams.get('industry') || 'general';

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Header />
      
      <div className="pt-24 pb-16">
        <AdvancedDemo industry={industry} />
      </div>
      
      <Footer />
    </div>
  );
};

export default DemoPage;