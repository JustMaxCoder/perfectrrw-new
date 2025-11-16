export const CATEGORIES = [
  {
    id: 'all',
    name: 'Wszystkie produkty',
    slug: 'all',
    description: 'Wszystkie produkty BHP',
  },
  {
    id: 'odziez-robocza',
    name: 'Odzież robocza',
    slug: 'odziez-robocza',
    description: 'Profesjonalna odzież robocza',
  },
  {
    id: 'obuwie',
    name: 'Obuwie BHP',
    slug: 'obuwie',
    description: 'Obuwie robocze S3, S1',
  },
  {
    id: 'rekawice',
    name: 'Rękawice',
    slug: 'rekawice',
    description: 'Rękawice ochronne',
  },
  {
    id: 'ochrona-glowy',
    name: 'Ochrona głowy',
    slug: 'ochrona-glowy',
    description: 'Kaski, hełmy ochronne',
  },
] as const;

export type CategoryId = typeof CATEGORIES[number]['id'];
