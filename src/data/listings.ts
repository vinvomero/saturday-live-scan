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
  'santa-clara-saturday-walk-in-live-scan': [
    {
      name: 'The UPS Store #2762',
      address: '5255 Stevens Creek Blvd., Santa Clara, CA 95051',
    },
    {
      name: 'The UPS Store #6844',
      address: '1231 Franklin Mall, Santa Clara, CA 95050',
    },
    {
      name: 'Certifix Live Scan dbw AD West Mail Center',
      address: '59 Washington Street, Santa Clara, CA 95050',
    },
    {
      name: 'Postal Annex #14024',
      address: '2010 El Camino Real, Santa Clara, CA 95050',
    },
    {
      name: 'The UPS Store #4636',
      address: '2784 Homestead Road, Santa Clara, CA 95051',
    },
    {
      name: 'The Connector Fashion Lane',
      address: '2907 El Camino Real, Santa Clara, CA 95051',
    },
  ],
  'daly-city-saturday-walk-in-live-scan': [
    {
      name: 'The UPS Store #6096',
      address: '6748 Mission Street, Daly City, CA 94014',
    },
    {
      name: 'Ship Daly City',
      address: '100 Los Olivos Avenue, Daly City, CA 94014',
    },
    {
      name: 'Certifix Live Scan dbw The UPS Store #0966',
      address: '235 Westlake Center, Daly City, CA 94115',
    },
    {
      name: 'Post Point Hub',
      address: '6844 Mission Street, Daly City, CA 94014',
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
