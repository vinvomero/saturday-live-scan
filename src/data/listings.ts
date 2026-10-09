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
  'south-san-francisco-saturday-walk-in-live-scan': [
    {
      name: 'The UPS Store #1468',
      address: '2268 Westborough Blvd, Suite #302, South San Francisco, CA 94080',
    },
  ],
  'dublin-saturday-walk-in-live-scan': [
    {
      name: 'Suraj Notary and Live Scan',
      address: '2883 East Castle Pines Terrace, Dublin, CA 94568',
    },
    {
      name: 'The UPS Store #0953',
      address: '7172 Regional Street, Dublin, CA 94568',
    },
  ],
  'vallejo-saturday-walk-in-live-scan': [
    {
      name: 'The UPS Store #1129',
      address: '3505 Sonoma Blvd, Suite 20, Vallejo, CA 94591',
    },
    {
      name: 'The UPS Store #1523',
      address: '55 Springstowne Center, Vallejo, CA 94591',
    },
    {
      name: 'Glen Cove Mailbox Center',
      address: '164 Robles Way, Vallejo, CA 94591',
    },
  ],
  'fairfield-saturday-walk-in-live-scan': [
    {
      name: 'The UPS Store #2110',
      address: '2401 Waterman Blvd, Suite A4, Fairfield, CA 94534',
    },
    {
      name: 'The UPS Store #3954',
      address: '5055 Business Center Drive, Suite 108, Fairfield, CA 94534',
    },
    {
      name: 'Specialty Tax',
      address: '737 Jefferson Street, Fairfield, CA 94533',
    },
  ],
  'alameda-saturday-walk-in-live-scan': [
    {
      name: 'The UPS Store #0447',
      address: '875 Island Drive, Suite A, Alameda, CA 94502',
    },
    {
      name: 'Certifix Live Scan dbw The UPS Store #0578',
      address: '909 Marina Village Pkwy, Alameda, CA 94501',
    },
    {
      name: 'The UPS Store #5898',
      address: '2601 Blanding Ave, Suite C, Alameda, CA 94501',
    },
  ],
  'pittsburg-saturday-walk-in-live-scan': [
    {
      name: 'The UPS Store #7269',
      address: '4322 Century Blvd, Pittsburg, CA 94565',
    },
    {
      name: 'SKSS Enterprises, Inc. dba The UPS Store # 5984',
      address: '2120 Railroad Avenue, Suite #103, Pittsburg, CA 94565',
    },
    {
      name: 'The UPS Store #1064',
      address: '640 Bailey Road, Pittsburg, CA 94565',
    },
  ],
  'santa-rosa-saturday-walk-in-live-scan': [
    {
      name: 'The UPS Store #2189',
      address: '122 Calistoga Road, Santa Rosa, CA 95409',
    },
    {
      name: 'Gil\'s Business Tax Services, INC.',
      address: '1534 Sebastopol Road, Santa Rosa, CA 95407',
    },
    {
      name: 'The UPS Store 7577',
      address: '711 STONY POINT RD. STE 7, Santa Rosa, CA 95407',
    },
    {
      name: 'The UPS Store # 5804',
      address: '1415 Fulton Road, Suite 205, Santa Rosa, CA 95403',
    },
    {
      name: 'The UPS Store #4739',
      address: '2360 Mendocino Avenue, #A2, Santa Rosa, CA 95403',
    },
    {
      name: 'The UPS Store #6261',
      address: '2661-A Santa Rosa Avenue, Santa Rosa, CA 95407',
    },
    {
      name: 'Postal Plus, Inc.',
      address: '422 Larkfield Center, Santa Rosa, CA 95403',
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
