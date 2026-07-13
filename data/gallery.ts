export interface GalleryCard {
  id: string;
  title: string;
  description: string;
  span?: 'tall' | 'wide';
}

export const galleryCards: GalleryCard[] = [
  { id: 'roastery', title: 'The Roastery', description: 'Watch our roasters at work' },
  { id: 'bar', title: 'The Bar', description: 'Where every drink is crafted', span: 'tall' },
  { id: 'lounge', title: 'The Lounge', description: 'Relax and connect' },
  { id: 'patio', title: 'The Patio', description: 'Enjoy the fresh air' },
  { id: 'tasting', title: 'The Tasting Room', description: 'Cupping and tasting sessions', span: 'wide' },
  { id: 'library', title: 'The Library', description: 'Browse coffee literature' },
];
