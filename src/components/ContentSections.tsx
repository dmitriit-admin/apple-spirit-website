import { useEffect } from 'react';
import CatalogSection from '@/components/sections/CatalogSection';
import InfoSections from '@/components/sections/InfoSections';
import ServiceSections from '@/components/sections/ServiceSections';
import ContactsSection from '@/components/sections/ContactsSection';

export default function ContentSections() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in-up');
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.fade-on-scroll').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <CatalogSection />
      <InfoSections />
      <ServiceSections />
      <ContactsSection />
    </>
  );
}
