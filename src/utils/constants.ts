// Constants used throughout the application

export const INDUSTRIES = [
  { id: 'retail', name: 'Retail & E-commerce', icon: 'ShoppingBag' },
  { id: 'healthcare', name: 'Healthcare', icon: 'Heart' },
  { id: 'finance', name: 'Finance & Banking', icon: 'DollarSign' },
  { id: 'education', name: 'Education', icon: 'GraduationCap' },
  { id: 'hospitality', name: 'Hospitality', icon: 'Building' },
  { id: 'logistics', name: 'Logistics & Transport', icon: 'Truck' },
] as const;

export const CAPABILITIES = [
  {
    id: 'ai-solutions',
    title: 'AI Solutions',
    description: 'Intelligent automation, machine learning models, and AI-powered applications for modern businesses.',
    icon: 'Brain',
  },
  {
    id: 'ecommerce-mobile',
    title: 'E-Commerce Mobile App',
    description: 'Feature-rich mobile commerce solutions with seamless payment integration and user experience.',
    icon: 'ShoppingCart',
  },
  {
    id: 'android-apps',
    title: 'Android Apps',
    description: 'Native Android applications optimized for performance and user engagement.',
    icon: 'Smartphone',
  },
  {
    id: 'ios-apps',
    title: 'iOS Apps',
    description: 'Premium iOS applications designed for the Apple ecosystem with elegant interfaces.',
    icon: 'Apple',
  },
  {
    id: 'multi-vendor',
    title: 'Multi Vendor Application',
    description: 'Comprehensive marketplace platforms enabling multiple vendors to sell products and services.',
    icon: 'Store',
  },
  {
    id: 'web-apps',
    title: 'High Resolution Website & Web Apps',
    description: 'Responsive, high-performance web applications and websites with stunning visuals.',
    icon: 'Globe',
  },
] as const;

