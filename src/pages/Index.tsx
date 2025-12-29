import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import ContentSections from '@/components/ContentSections';
import Footer from '@/components/Footer';

function Index() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-16">
        <HeroSection />
        <ContentSections />
      </main>
      <Footer />
    </div>
  );
}

export default Index;
