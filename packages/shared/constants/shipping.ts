export const SHIPPING_OPTIONS = {
  standard: {
    id: 'standard',
    name: 'Dostawa standardowa',
    description: '2-3 dni robocze',
    price: 15,
  },
  express: {
    id: 'express',
    name: 'Dostawa ekspresowa',
    description: '24 godziny',
    price: 25,
  },
  pickup: {
    id: 'pickup',
    name: 'Odbiór osobisty',
    description: 'Za godzinę',
    price: 0,
  },
} as const;

export type ShippingOptionId = keyof typeof SHIPPING_OPTIONS;

export const FREE_SHIPPING_THRESHOLD = 99; // zł
