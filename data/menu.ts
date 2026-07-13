export interface MenuItem {
  id: string;
  title: string;
  description: string;
  price: string;
  origin: string;
  icon: string;
}

export const menuItems: MenuItem[] = [
  {
    id: 'espresso',
    title: 'Espresso',
    description: 'Double shot of our house blend. Rich, smooth, with notes of dark chocolate and caramel.',
    price: '$4.50',
    origin: 'Signature',
    icon: 'M24 4 L24 40 M18 22 Q24 16 30 22',
  },
  {
    id: 'pour-over',
    title: 'Pour-Over',
    description: 'Single-origin Colombian, slow-poured to highlight bright citrus and honey sweetness.',
    price: '$6.00',
    origin: 'Colombia',
    icon: 'M16 16 L32 32 M32 16 L16 32',
  },
  {
    id: 'flat-white',
    title: 'Flat White',
    description: 'Double ristretto with micro-foamed whole milk. Silky, bold, perfectly balanced.',
    price: '$5.50',
    origin: 'Ethiopia',
    icon: 'M18 30 L20 26 L28 30 L30 26',
  },
  {
    id: 'cold-brew',
    title: 'Cold Brew',
    description: 'Steeped for 20 hours. Smooth, low-acid, with deep molasses and cocoa notes.',
    price: '$5.00',
    origin: 'Sumatra',
    icon: 'M12 16 L36 16 L32 40 L16 40 Z',
  },
  {
    id: 'matcha',
    title: 'Matcha Latte',
    description: 'Ceremonial-grade Japanese matcha, whisked with steamed oat milk. Earthy, sweet, vibrant.',
    price: '$6.50',
    origin: 'Seasonal',
    icon: 'M16 20 C16 12 32 12 32 20 L30 38 L18 38 Z',
  },
  {
    id: 'signature-latte',
    title: 'Signature Latte',
    description: 'Our espresso + house-made vanilla syrup + silky oat milk. Topped with cinnamon.',
    price: '$5.75',
    origin: 'House Recipe',
    icon: 'M22 18 L26 22 M26 18 L22 22',
  },
];
