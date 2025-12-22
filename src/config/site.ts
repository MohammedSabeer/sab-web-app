// Site configuration
export const SITE = {
  title: 'TechSolutions',
  description: 'Leading software development company delivering cutting-edge mobile apps, web applications, and AI solutions tailored to your business needs.',
  url: 'https://yourdomain.com',
  author: 'TechSolutions',
} as const;

export const NAVIGATION = [
  { name: 'Home', href: '/' },
  { name: 'Products', href: '/capabilities' },
  { name: 'Use Cases', href: '/use-cases' },
  { name: 'Our Work', href: '/facilities' },
  { name: 'Get Started', href: '/rfq' },
  { name: 'Documentation', href: '/documentation' },
] as const;

export const SOCIAL_LINKS = {
  linkedin: 'https://linkedin.com/company/yourcompany',
  twitter: 'https://twitter.com/yourcompany',
  facebook: 'https://facebook.com/yourcompany',
} as const;

