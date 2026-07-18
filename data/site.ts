export const signatureCoffees = [
  ['01', 'Vanilla Cloud', 'House vanilla, oat milk, double espresso', 'Colombia', '$5.75'],
  ['02', 'Slow Pour', 'Rotating single origin, hand-poured to order', 'Ethiopia', '$6.50'],
  ['03', 'Cortado', 'Equal parts espresso and textured milk', 'Guatemala', '$4.50'],
  ['04', 'Cardamom Cold Brew', 'Eighteen-hour steep, whole cardamom pod', 'Kenya', '$6.00'],
  ['05', 'French Press for Two', 'Four-minute steep, served at the table', 'Rwanda', '$9.00'],
];

export type MenuItem = { name: string; description: string; price: string; tint: string };
export const menu: Record<string, MenuItem[]> = {
  Coffee: [
    { name: 'Pour-Over', description: 'Rotating single origin', price: '$6.50', tint: '#e9e3d6' },
    { name: 'Espresso', description: 'Double, Colombian blend', price: '$4.00', tint: '#e3d9cf' },
    { name: 'Cortado', description: 'Equal parts espresso and milk', price: '$4.50', tint: '#eaded2' },
    { name: 'Vanilla Cloud Latte', description: 'House vanilla, oat milk', price: '$5.75', tint: '#f0e7d8' },
    { name: 'French Press', description: 'Serves two, four-minute steep', price: '$9.00', tint: '#e6ddcb' },
    { name: 'Cold Brew', description: 'Eighteen hour steep', price: '$5.50', tint: '#dfe2d4' },
  ],
  Tea: [
    { name: 'Jasmine Silver Needle', description: 'White tea, hand-picked', price: '$5.00', tint: '#e8ece1' },
    { name: 'Cascara Cherry', description: 'Coffee-cherry tea', price: '$4.75', tint: '#ecdfdc' },
    { name: 'Chamomile Honey', description: 'With local wildflower honey', price: '$4.50', tint: '#f1e9cf' },
  ],
  Pastries: [
    { name: 'Fig & Brown Butter Bun', description: 'Seasonal, laminated dough', price: '$6.00', tint: '#ecdcc9' },
    { name: 'Almond Croissant', description: 'Twice-baked, frangipane', price: '$5.50', tint: '#eedcc6' },
    { name: 'Sourdough Toast', description: 'Cultured butter, sea salt', price: '$5.00', tint: '#e9e0d0' },
  ],
  Desserts: [
    { name: 'Vanilla Bean Tart', description: 'Madagascar vanilla custard', price: '$7.00', tint: '#f0e6d0' },
    { name: 'Espresso Tiramisu', description: 'Layered, mascarpone', price: '$8.00', tint: '#e3d6c8' },
  ],
  Seasonal: [
    { name: 'Geisha Panama Filter', description: 'Limited lot, 40 bags', price: '$9.50', tint: '#e6e0d0' },
    { name: 'Cardamom Cold Brew', description: 'Whole pod, 18-hr steep', price: '$6.00', tint: '#dfe2d4' },
  ],
};

export const gallery = [
  ['https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=900&auto=format&fit=crop', 'The sorting table'],
  ['https://images.unsplash.com/photo-1447933601403-0c6688de566e?q=80&w=900&auto=format&fit=crop', 'Morning light'],
  ['https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=900&auto=format&fit=crop', 'The arch window'],
  ['https://images.unsplash.com/photo-1442512595331-e89e73853f31?q=80&w=900&auto=format&fit=crop', 'Pastry counter'],
  ['https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=900&auto=format&fit=crop', 'The roastery'],
  ['https://images.unsplash.com/photo-1521017432531-fbd92d768814?q=80&w=900&auto=format&fit=crop', 'Slow afternoon'],
];
