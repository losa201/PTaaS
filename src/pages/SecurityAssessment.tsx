import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SecurityAssessment from '@/components/SecurityAssessment';

const SecurityAssessmentPage = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const industry = urlParams.get('industry') || 'general';

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <Header />
      
      <div className="pt-24 pb-16">
        <SecurityAssessment industry={industry} />
      </div>
      
      <Footer />
    </div>
  );
};

export default SecurityAssessmentPage;