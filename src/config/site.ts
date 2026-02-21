// Site configuration
export const SITE = {
  title: 'Tech Logic Vibe - Custom Software Development Company',
  description: 'Leading software development company delivering cutting-edge mobile apps, web applications, AI solutions, and e-commerce platforms. Transform your business with our expert development team.',
  url: 'https://www.techlogicvibe.com',
  author: 'Tech Logic Vibe',
  legalBusinessName: 'SABI TECH',
  founders: 'Rukzana',
  keywords: 'software development, mobile app development, web development, AI solutions, machine learning, e-commerce development, custom software, iOS apps, Android apps, React Native, cloud solutions',
  ogImage: '/og-image.svg',
  twitterHandle: '@techlogicvibe',
  email: 'info@techlogicvibe.com',
  phone: '+91 7200650707',
  address: 'Rose Avenue, Coimbatore, Tamil Nadu, India',
  foundingYear: '2020',
  companyType: 'Software Development Company',
} as const;

export const NAVIGATION = [
  { name: 'Home', href: '/' },
  { name: 'Products', href: '/capabilities' },
  { name: 'Use Cases', href: '/use-cases' },
  { name: 'Our Work', href: '/facilities' },
  { name: 'Get Started', href: '/rfq' },
  { name: 'Documentation', href: '/documentation' },
  { name: 'About Us', href: '/about' },
  { name: 'Contact', href: '/contact' },
] as const;

export const SOCIAL_LINKS = {
  linkedin: 'https://linkedin.com/company/techlogicvibe',
  twitter: 'https://twitter.com/techlogicvibe',
  facebook: 'https://facebook.com/techlogicvibe',
  github: 'https://github.com/techlogicvibe',
  instagram: 'https://instagram.com/techlogicvibe',
} as const;

// SEO Keywords by page
export const SEO_KEYWORDS = {
  home: 'software development company, custom software development, mobile app development, web development services, AI solutions, machine learning development',
  capabilities: 'AI solutions, e-commerce development, mobile app development, iOS development, Android development, web applications, multi-vendor marketplace, custom software',
  useCases: 'software development case studies, mobile app projects, web application examples, AI implementation, e-commerce success stories',
  portfolio: 'software portfolio, mobile app showcase, web development projects, healthcare apps, fintech solutions, e-learning platforms',
  rfq: 'request software quote, hire developers, software development inquiry, custom app development cost, web development services',
  documentation: 'software documentation, API documentation, technical guides, development resources, integration guides',
} as const;

// Structured Data for Schema.org
export const SCHEMA_ORG = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareCompany',
  name: 'SABI TECH',
  alternateName: 'Tech Logic Vibe',
  url: 'https://techlogicvibe.com',
  logo: 'https://techlogicvibe.com/logo.svg',
  description: 'Leading software development company specializing in AI solutions, mobile apps, web applications, and e-commerce platforms.',
  email: 'info@techlogicvibe.com',
  telephone: '+917200650707',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Rose Avenue',
    addressLocality: 'Coimbatore',
    addressRegion: 'Tamil Nadu',
    addressCountry: 'IN',
  },
  sameAs: [
    'https://linkedin.com/company/techlogicvibe',
    'https://twitter.com/techlogicvibe',
    'https://facebook.com/techlogicvibe',
    'https://github.com/techlogicvibe',
  ],
  foundingDate: '2020',
  slogan: 'Innovative Solutions, Logical Execution',
  founder: [
    {
      '@type': 'Person',
      name: 'Rukzana',
      jobTitle: 'Co-Founder & CEO',
    },
  ],
  areaServed: {
    '@type': 'Country',
    name: 'Worldwide',
  },
  knowsAbout: [
    'Software Development',
    'Mobile App Development',
    'Web Application Development',
    'Artificial Intelligence',
    'Machine Learning',
    'E-Commerce Solutions',
    'Cloud Computing',
    'iOS Development',
    'Android Development',
  ],
  makesOffer: [
    {
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: 'AI Solutions & Machine Learning',
        description: 'Custom AI and ML solutions including predictive analytics, NLP, and intelligent automation',
      },
    },
    {
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: 'Mobile App Development',
        description: 'Native iOS and Android app development with React Native expertise',
      },
    },
    {
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: 'E-Commerce Development',
        description: 'Multi-vendor marketplace platforms and custom e-commerce solutions',
      },
    },
    {
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: 'Web Application Development',
        description: 'High-performance, responsive web applications using modern frameworks',
      },
    },
  ],
} as const;

