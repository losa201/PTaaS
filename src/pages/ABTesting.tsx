import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ABTestingFramework from '@/components/ABTestingFramework';

const ABTestingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900">
      <Header />
      
      <div className="pt-24 pb-16">
        <ABTestingFramework />
      </div>
      
      <Footer />
    </div>
  );
};

export default ABTestingPage;