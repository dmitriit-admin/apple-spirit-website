import HeroSection from '@/sections/HeroSection';
import CategoriesSection from '@/sections/CategoriesSection';
import PromotionsSection from '@/sections/PromotionsSection';
import BlogSection from '@/sections/BlogSection';
import AboutSection from '@/sections/AboutSection';
import { useEffect } from 'react';

export default function HomePage() {
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
      <HeroSection />
      <CategoriesSection />
      <PromotionsSection />
      <BlogSection />
      <AboutSection />
    </>
  );
}