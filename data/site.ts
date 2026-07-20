export const signatureDrinks = [
  ['01', 'Ceremonial Matcha', 'Whisked to order, Uji origin, no added sugar', 'Kyoto, Japan', '$7.50'],
  ['02', 'Vanilla Mojito', 'White rum, fresh mint, lime, house vanilla syrup', 'House recipe', '$8.00'],
  ['03', 'Iced Matcha Latte', 'Cold-pressed matcha, oat milk, light sweetness', 'Nikko, Japan', '$6.50'],
  ['04', 'Mojito de Matcha', 'White rum, matcha, mint, lime, sparkling top', 'House recipe', '$9.00'],
  ['05', 'Matcha Cortado', 'Equal parts matcha concentrate and steamed milk', 'Uji, Japan', '$6.00'],
];

export type MenuItem = { name: string; description: string; price: string; tint: string };
export const menu: Record<string, MenuItem[]> = {
  Matcha: [
    { name: 'Ceremonial Matcha', description: 'Whisked to order, Uji origin, no added sugar', price: '$7.50', tint: '#e8ece1' },
    { name: 'Iced Matcha Latte', description: 'Cold-pressed matcha, oat milk, light sweetness', price: '$6.50', tint: '#dce4d3' },
    { name: 'Matcha Cortado', description: 'Equal parts matcha concentrate and steamed milk', price: '$6.00', tint: '#c8d4b8' },
    { name: 'Matcha Affogato', description: 'Matcha over house-made vanilla ice cream', price: '$7.00', tint: '#e0dcc8' },
    { name: 'Matcha Lemonade', description: 'Cold matcha, fresh lemon, light sweetener', price: '$5.50', tint: '#d8e8c8' },
  ],
  Mojitos: [
    { name: 'Vanilla Mojito', description: 'White rum, fresh mint, lime, house vanilla syrup', price: '$8.00', tint: '#d4e8d0' },
    { name: 'Mojito de Matcha', description: 'White rum, matcha, mint, lime, sparkling top', price: '$9.00', tint: '#c8d8b8' },
    { name: 'Strawberry Mojito', description: 'Muddled berries, mint, lime, white rum', price: '$8.50', tint: '#e8d0d0' },
    { name: 'Virgin Mojito', description: 'Mint, lime, soda, no alcohol', price: '$5.50', tint: '#d8ecd8' },
  ],
  Snacks: [
    { name: 'Matcha Mochi', description: 'Sweet rice cake, dusted with ceremonial matcha', price: '$4.50', tint: '#c8d4b8' },
    { name: 'Miso Butter Toast', description: 'Shiro miso, cultured butter, sesame, scallion', price: '$5.00', tint: '#e0d8c0' },
    { name: 'Edamame', description: 'Lightly salted, steamed, sea salt finish', price: '$3.50', tint: '#d0dcc0' },
  ],
  Sweets: [
    { name: 'Matcha Tiramisu', description: 'Layers of matcha and mascarpone, ladyfingers', price: '$8.00', tint: '#c8d4b8' },
    { name: 'Vanilla Matcha Cheesecake', description: 'Creamy, light sweetness, graham crust', price: '$7.50', tint: '#e0dcc8' },
    { name: 'Mango Matcha Parfait', description: 'Matcha, cream, mango, granola layers', price: '$7.00', tint: '#e8d8a0' },
  ],
  Seasonal: [
    { name: 'Cherry Blossom Matcha', description: 'Limited spring edition, floral notes', price: '$8.50', tint: '#e8d0d8' },
    { name: 'Mojito de Fruta', description: 'Rotating tropical fruit, muddled to order', price: '$9.00', tint: '#d0e8c0' },
    { name: 'Hojicha Latte', description: 'Roasted green tea, steamed milk, autumn', price: '$6.00', tint: '#d0c0a8' },
  ],
};

export const gallery = [
  ['https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=900&auto=format&fit=crop', 'The whisk'],
  ['https://images.unsplash.com/photo-1447933601403-0c6688de566e?q=80&w=900&auto=format&fit=crop', 'Morning pour'],
  ['https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=900&auto=format&fit=crop', 'The arch window'],
  ['https://images.unsplash.com/photo-1442512595331-e89e73853f31?q=80&w=900&auto=format&fit=crop', 'The mint bar'],
  ['https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=900&auto=format&fit=crop', 'Stone mill'],
  ['https://images.unsplash.com/photo-1521017432531-fbd92d768814?q=80&w=900&auto=format&fit=crop', 'Slow afternoon'],
];
