export type ShopListing = {
  name: string;
  address: string;
};

export const listingsBySlug: Record<string, ShopListing[]> = {
  'oakland-saturday-walk-in-live-scan': [
    {
      name: 'LPG Live Scan (The Loss Prevention Group, Inc.)',
      address: '524 7th Street, Oakland, CA 94607',
    },
    {
      name: 'Certifix @ The UPS Store #3270',
      address: '4096 Piedmont Ave, Oakland, CA 94611',
    },
    {
      name: 'Allscan Live Scan Fingerprinting Service',
      address: '409 13th Street, 6th Floor, Oakland, CA 94612',
    },
    {
      name: 'Copy USA',
      address: '3423 Fruitvale Ave, Oakland, CA 94602',
    },
    {
      name: 'The UPS Store #1821',
      address: '360 Grand Ave, Oakland, CA 94610',
    },
    {
      name: 'The UPS Store #7098',
      address: '4100 Redwood Road #20A, Oakland, CA 94619',
    },
    {
      name: 'The UPS Store #0243',
      address: '6114 La Salle Ave, Oakland, CA 94611',
    },
  ],
  'berkeley-saturday-walk-in-live-scan': [
    {
      name: 'Omkar Enterprises LLC dba The UPS Store #6706',
      address: '1400 Shattuck Avenue Ste. #12, Berkeley, CA 94708',
    },
    {
      name: 'P.O. Pack',
      address: '1700 Shattuck Avenue, Berkeley, CA 94709',
    },
    {
      name: 'Mail Boxes Plus',
      address: '2930 Domingo Avenue, Berkeley, CA 94705',
    },
    {
      name: 'The UPS Store #6089',
      address: '2512 Telegraph Avenue, Berkeley, CA 94704',
    },
    {
      name: 'A1 Photo Lab',
      address: '1629 University Avenue, Berkeley, CA 94710',
    },
  ],
};

export function itemListJsonLd(listings: ShopListing[]): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: listings.map((shop, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Place',
        name: shop.name,
        address: shop.address,
      },
    })),
  };
}
