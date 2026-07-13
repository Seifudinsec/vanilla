export interface StoryPanel {
  id: string;
  number: string;
  label: string;
  title: string;
  description: string;
}

export const storyPanels: StoryPanel[] = [
  {
    id: 'bean',
    number: '01',
    label: 'The Bean',
    title: "Sourced from the world's finest growers",
    description:
      'We travel directly to small-batch farms in Ethiopia, Colombia, and Sumatra. Every bean is hand-selected, graded, and cupped before it earns a place in our roastery.',
  },
  {
    id: 'roast',
    number: '02',
    label: 'The Roast',
    title: 'Precision roasted in small batches',
    description:
      "Our custom drum roaster transforms green beans into liquid gold. Each batch is profiled to the bean's unique character — bringing out chocolate, floral, and bold notes.",
  },
  {
    id: 'pour',
    number: '03',
    label: 'The Pour',
    title: 'Every cup is a craft',
    description:
      'Our baristas are trained in the art of precision brewing. From the perfect espresso extraction to the delicate pour-over, every drink is made with intention.',
  },
];
