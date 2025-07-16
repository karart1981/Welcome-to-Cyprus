import Hero from '@/components/hero/Hero'
import Partners from '@/components/autoSlider/AutoSlider';
import ServicesSection from '@/components/servicesSection/ServicesSection';
import { Suspense } from 'react';

export default function Home() {
  return (
    <>
    <Suspense fallback={<div>Loading Hero...</div>}>
        <Hero />
       <Partners />
       <ServicesSection />
    </Suspense>
    </>
  );
}
