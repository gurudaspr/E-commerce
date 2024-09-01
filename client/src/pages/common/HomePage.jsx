import React from 'react'
import HeroSection from '../../components/common/heroSection/HeroSection'
import FeatureSection from '../../components/common/featureSection/FeatureSection'
import TestimonialsSection from '../../components/common/testimonialsSection/TestimonialsSection'
import FeaturedProductsSection from '../../components/common/featuredProductsSection/FeaturedProductSection'

const HomePage = () => {
  return (
    <>
    <HeroSection />
    <FeaturedProductsSection />
    <FeatureSection/>
    <TestimonialsSection/>
    </>
    )
}

export default HomePage