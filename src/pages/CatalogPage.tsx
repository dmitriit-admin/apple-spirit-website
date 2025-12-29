import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import CatalogSection from '@/components/sections/CatalogSection';

export default function CatalogPage() {
  const [searchParams] = useSearchParams();
  const categoryFromUrl = searchParams.get('category');

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
    <div className="pt-8">
      <CatalogSection initialCategory={categoryFromUrl || 'all'} />
    </div>
  );
}
