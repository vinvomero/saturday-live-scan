export type FaqItem = {
  q: string;
  a: string;
};

export const homeFaq: FaqItem[] = [
  {
    q: 'What is this site?',
    a: 'California Live Scan shops that the DOJ list marks as Saturday walk-in, city by city. Confirm hours and fees with the shop before you go. Nobody listed here was called.',
  },
  {
    q: 'Do I need an appointment for Saturday Live Scan in California?',
    a: 'This site only lists shops the DOJ list marks as Saturday walk-in. Appointments may still jump the line. Confirm hours before you go. For Oakland shops, see Saturday walk-in Live Scan in Oakland: https://vinvomero.github.io/saturday-live-scan/oakland-saturday-walk-in-live-scan/ For Berkeley shops, see Saturday walk-in Live Scan in Berkeley: https://vinvomero.github.io/saturday-live-scan/berkeley-saturday-walk-in-live-scan/',
  },
  {
    q: 'What do I bring?',
    a: 'A California Request for Live Scan Service form (BCIA 8016) from the requesting agency, and unexpired photo ID. A blank 8016 from the internet is usually rejected.',
  },
  {
    q: 'Why not just use the DOJ list?',
    a: 'DOJ says the public list can be stale and tells you to confirm hours and fees before you go. Nobody listed here was called. This site filters to Saturday walk-in rows.',
  },
  {
    q: 'Is this for TSA PreCheck?',
    a: 'No. TSA PreCheck / IdentoGO is a different vendor.',
  },
  {
    q: 'Do results come back to me?',
    a: 'No. Results go to the requesting agency, not to you. Keep the yellow copy / ATI number.',
  },
];

export const oaklandFaq: FaqItem[] = [
  {
    q: 'Can I walk in Saturday in Oakland without an appointment?',
    a: 'Yes for the 7 DOJ Saturday walk-in rows. “Walk-in & appt” means appointments may still jump the line. UPS #7098 is a public conflict — treat as appointment-until-proven. Confirm hours before you go. Nobody was called.',
  },
  {
    q: 'What do I bring?',
    a: 'A California Request for Live Scan Service form (BCIA 8016) from the requesting agency, and unexpired photo ID. The requesting agency fills the ORI / OCA / job title. A blank 8016 from the internet is usually rejected.',
  },
  {
    q: 'How much does it cost?',
    a: 'The rolling fee in the table plus the agency DOJ/FBI processing fee. Some agencies put a billing number on the form so you only pay rolling. There is no honest single total. Do not budget from the 2012 Applicant Fingerprint Processing Fees PDF.',
  },
  {
    q: 'Cash or card?',
    a: 'It varies. Several shops are cash/card; some add a card surcharge. Certifix @ The UPS Store #3270 lists $45 cash / $47 card plus government fees. DOJ says to check for payment restrictions. Confirm with the shop before you go.',
  },
  {
    q: 'Are UPS store hours the fingerprint hours?',
    a: 'No. UPS pages advertise “open 7 days.” That is shipping. Live Scan Saturday hours are the DOJ column.',
  },
  {
    q: 'Why isn’t Certifix Oakland HQ on this list?',
    a: 'It is weekday walk-in only on the DOJ list (accessed 2026-08-29).',
  },
  {
    q: 'Do I get the results?',
    a: 'No. Results go to the requesting agency, not to you. Keep the yellow copy / ATI number.',
  },
];

export const berkeleyFaq: FaqItem[] = [
  {
    q: 'Can I walk in Saturday in Berkeley without an appointment?',
    a: 'Yes for the 5 DOJ Saturday walk-in rows. “Walk-in & appt” means appointments may still jump the line. P.O. Pack and A1 are walk-in-only on Saturday (DOJ does not list appointments). A1 is a public conflict on hours/fee — use the DOJ column (10:15 am – 1:45 pm, $28). Confirm hours before you go. Nobody was called.',
  },
  {
    q: 'What do I bring?',
    a: 'A California Request for Live Scan Service form (BCIA 8016) from the requesting agency, and unexpired photo ID. The requesting agency fills the ORI / OCA / job title. A blank 8016 from the internet is usually rejected.',
  },
  {
    q: 'How much does it cost?',
    a: 'The rolling fee in the table plus the agency DOJ/FBI processing fee. Some agencies put a billing number on the form so you only pay rolling. There is no honest single total. Do not budget from the 2012 Applicant Fingerprint Processing Fees PDF. P.O. Pack’s DOJ row also says additional service fees may apply.',
  },
  {
    q: 'Cash or card?',
    a: 'It varies by shop. UPS #6706 and #6089 list cash/credit/debit on DOJ (no billing accounts for #6706). A1, Mail Boxes Plus, and P.O. Pack list billing accounts plus cash/card options; Mail Boxes Plus and P.O. Pack also list money order. DOJ says to check for payment restrictions. Confirm with the shop before you go.',
  },
  {
    q: 'Are UPS store hours the fingerprint hours?',
    a: 'No. UPS pages advertise shipping / notary hours. Live Scan Saturday hours are the DOJ column. UPS #6706 does have Sunday Live Scan on DOJ (10:00 am – 3:00 pm); UPS #6089 does not.',
  },
  {
    q: 'Why isn’t Berkeley Live Scan on this list?',
    a: 'It has no street address on the DOJ detail page, and Saturday is appointment only 9:00 am – 12:00 pm (accessed 2026-08-31). This page is Saturday walk-in only.',
  },
  {
    q: 'Do I get the results?',
    a: 'No. Results go to the requesting agency, not to you. Keep the yellow copy / ATI number.',
  },
  {
    q: 'What’s the cheapest Saturday walk-in in Berkeley?',
    a: 'A1 Photo Lab lists the lowest rolling fee in this table at $28.00, with the shortest Saturday window (10:15 am – 1:45 pm). Operator page conflicts ($20 / longer hours) — treat DOJ as the source of truth until proven. Next cheapest on DOJ is P.O. Pack at $34.75 (additional service fees may apply), walk-in-only Saturday 10:00 am – 5:00 pm. UPS #6706 opens earliest at 9:00 am but rolls at $50.00.',
  },
];
