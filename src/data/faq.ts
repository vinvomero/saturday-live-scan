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
    a: 'This site lists shops the DOJ list marks as Saturday walk-in, plus a Sunday Alameda County page. Appointments may still jump the line. Confirm hours before you go. For Oakland shops, see Saturday walk-in Live Scan in Oakland: https://saturdaylivescan.com/oakland-saturday-walk-in-live-scan/ For Oakland Saturday cash shops, see Saturday cash Live Scan in Oakland: https://saturdaylivescan.com/oakland-saturday-cash-live-scan/ For Oakland Saturday teacher credential, see Saturday Live Scan in Oakland for a teacher credential: https://saturdaylivescan.com/oakland-saturday-teacher-credential-live-scan/ For Berkeley shops, see Saturday walk-in Live Scan in Berkeley: https://saturdaylivescan.com/berkeley-saturday-walk-in-live-scan/ For San Francisco shops, see Saturday walk-in Live Scan in San Francisco: https://saturdaylivescan.com/san-francisco-saturday-walk-in-live-scan/ For Sunday in Alameda County, see Sunday Live Scan in Alameda County: https://saturdaylivescan.com/alameda-county-sunday-live-scan/',
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

export const alamedaSundayFaq: FaqItem[] = [
  {
    q: 'Can I walk in Sunday in Alameda County without an appointment?',
    a: 'Yes for the 13 DOJ Sunday walk-in rows. Four of those are walk-in-only on Sunday (UPS #0345 Pleasanton, #0953 Dublin, #5898 Alameda, #1411 Newark). The other nine list walk-ins and appointments — appointments may still jump the line. Sixteen more Sunday rows are appointment-only; do not walk in there. UPS #1640 Fremont is a common trap: Saturday is walk-in, Sunday is appt only. Confirm hours before you go. Nobody was called.',
  },
  {
    q: 'Are UPS store hours the fingerprint hours?',
    a: 'No. UPS locator pages advertise “open 7 days” and often notary 7 days. That is shipping. Live Scan Sunday hours are the DOJ column. Telegraph #6089, Piedmont #3270, and Grand #1821 are open Sunday for packages and are Saturday-only on DOJ for Live Scan.',
  },
  {
    q: 'What do I bring?',
    a: 'A California Request for Live Scan Service form (BCIA 8016) from the requesting agency, and unexpired photo ID. The requesting agency fills the ORI / OCA / job title. A blank 8016 from the internet is usually rejected.',
  },
  {
    q: 'How much does it cost?',
    a: 'The rolling fee in the table plus the agency DOJ/FBI processing fee. Some agencies put a billing number on the form so you only pay rolling. There is no honest single total. Do not budget from the 2012 Applicant Fingerprint Processing Fees PDF. UPS #6088, AngelVetting, Nexusphase, and GM Defense DOJ rows also say additional service fees may apply.',
  },
  {
    q: 'What’s the cheapest or earliest Sunday option?',
    a: 'Cheapest Sunday walk-in rolling fee on DOJ is $30.00, tied: Naka Tax (Union City, 9:00 am – 8:00 pm, no cards), UPS #0953 Dublin (walk-in 10:00 am – 3:00 pm), and UPS #0345 Pleasanton (DOJ prints Sunday 12:00 am – 2:00 pm — do not treat midnight as a real open). Earliest usable walk-in open is 9:00 am at Naka and at Suraj Notary (Dublin residential terrace, $38). Cheapest Sunday appointment rolling fee is $25.00 (Niche — public hours conflict; Western Notary — mobile add-on fee conflict; Santosh — no street on the detail page; AAA — Sunday times UNVERIFIED).',
  },
  {
    q: 'Cash or card?',
    a: 'It varies. Most UPS Sunday rows list cash/credit/debit; several have no billing accounts. Naka Tax is billing / cash / checks only (no cards on DOJ). Santosh is cash / cashier’s check only. GM Defense lists no cash. DOJ says to check for payment restrictions. Confirm with the shop before you go.',
  },
  {
    q: 'Do I get the results?',
    a: 'No. Results go to the requesting agency, not to you. Keep the yellow copy / ATI number.',
  },
  {
    q: 'Why isn’t the Telegraph / Piedmont / Grand UPS store on this list?',
    a: 'Those three are Saturday Live Scan on DOJ and “open 7 days” on UPS store pages. Sunday Live Scan is not on their DOJ rows (accessed 2026-08-31). This page is Sunday Live Scan, not Sunday shipping.',
  },
];

export const sanFranciscoFaq: FaqItem[] = [
  {
    q: 'Can I walk in Saturday in San Francisco without an appointment?',
    a: 'Yes for the 13 DOJ Saturday walk-in rows. "Walk-in & appt" means appointments may still jump the line. Walk-in-only on Saturday (DOJ does not list appointments): Post Box Inc., UPS #0178, Post Point Hub Mission, UPS #5568, UPS #6260. Certifix/UPS #0361 is a public stale-listing risk (DOJ open vs UPS locator 404) — confirm before you go. Nobody was called.',
  },
  {
    q: 'What do I bring?',
    a: 'A California Request for Live Scan Service form (BCIA 8016) from the requesting agency, and unexpired photo ID. The requesting agency fills the ORI / OCA / job title. A blank 8016 from the internet is usually rejected.',
  },
  {
    q: 'How much does it cost?',
    a: 'The rolling fee in the table plus the agency DOJ/FBI processing fee. Some agencies put a billing number on the form so you only pay rolling. There is no honest single total. Do not budget from the 2012 Applicant Fingerprint Processing Fees PDF. Fillmore Postal\'s DOJ row also says additional service fees may apply.',
  },
  {
    q: 'Cash or card?',
    a: 'Most shops in this table list cash plus card options on DOJ. Fillmore Postal does not list cash (Billing Accounts, Corporate Accounts, Credit Cards, Debit Cards only). AAA/UnionPost lists cash/card but not Billing Accounts. Several UPS rows also list money order. DOJ says to check for payment restrictions. Confirm with the shop before you go.',
  },
  {
    q: 'Are UPS store hours the fingerprint hours?',
    a: 'No. UPS pages advertise shipping / notary hours. Live Scan Saturday hours are the DOJ column. UPS #6260\'s locator says the store is open 7 days — DOJ has no Sunday Live Scan for that row. Post Box Inc. does have Sunday Live Scan on DOJ (walk-ins 10:00 am – 2:00 pm).',
  },
  {
    q: 'Why isn\'t UPS #5818 / ID Solutions / Certifix Mission on this list?',
    a: 'UPS #5818 (60 29th St) is Saturday appointment only. ID Solutions is Weekends appointment only with no clock times. Certifix at 1875 Mission and Certifix at 447 Sutter are weekday-only on DOJ. This page is Saturday walk-in only (accessed 2026-08-31).',
  },
  {
    q: 'Do I get the results?',
    a: 'No. Results go to the requesting agency, not to you. Keep the yellow copy / ATI number.',
  },
  {
    q: 'What\'s the cheapest / earliest Saturday walk-in in San Francisco?',
    a: 'Post Box Inc. lists the lowest rolling fee in this table at $29.00, walk-in-only Saturday 9:00 am – 5:00 pm (also Sunday walk-ins 10:00 am – 2:00 pm on DOJ). Tied for earliest open with Certifix/UPS #0361 at 9:00 am — but #0361 is $30.00 and carries a closed-listing gotcha. Next cheapest clean rows: AAA/UnionPost at $30.00 (opens 11:00 am) and the UPS #0178 / #5037 / #5402 band at $35.00 (open 9:30 am).',
  },
];

export const oaklandCashFaq: FaqItem[] = [
  {
    q: 'Which Oakland Saturday walk-in shops take cash?',
    a: 'All 7 Oakland Saturday walk-in rows on DOJ list Cash tonight: LPG Live Scan, Certifix @ UPS #3270, Allscan, Copy USA, UPS #1821, UPS #7098, and UPS #0243. Nobody was called. Confirm before you go.',
  },
  {
    q: 'Is there a card surcharge?',
    a: 'Certifix @ UPS #3270 is the only verified dollar bump tonight: $45 cash / $47 card (+ gov fees) on the Certifix location page. Copy USA cash is on DOJ, but any card surcharge dollar is UNVERIFIED on copyusa.biz; DOJ also says additional service fees may apply with no dollar amount — do not invent one. Other shops list cash and card on DOJ with no verified $ bump tonight.',
  },
  {
    q: 'What do I bring?',
    a: 'A California Request for Live Scan Service form (BCIA 8016) from the requesting agency, and unexpired photo ID. The requesting agency fills the ORI / OCA / job title. A blank 8016 from the internet is usually rejected. Bring cash if you want to avoid a known card bump (Certifix) or an unknown one (Copy USA).',
  },
  {
    q: 'How much does it cost (cash)?',
    a: 'The rolling fee in the table (cash amount where known) plus the agency DOJ/FBI processing fee. Some agencies put a billing number on the form so you only pay rolling. There is no honest single total. Do not budget from the 2012 Applicant Fingerprint Processing Fees PDF. Copy USA\'s DOJ row also says additional service fees may apply.',
  },
  {
    q: 'Any shop that does NOT take cash on Saturday walk-in?',
    a: 'No among the Oakland Saturday walk-in set tonight. All 7 DOJ Sat walk-in rows list Cash. This page has no no-cash omit list.',
  },
  {
    q: 'Are UPS store hours the fingerprint hours?',
    a: 'No. UPS pages advertise shipping / notary hours. Live Scan Saturday hours are the DOJ column. UPS "open 7 days" does not mean Sunday Live Scan — Certifix/UPS #3270 has no Sunday Live Scan on DOJ.',
  },
  {
    q: 'Do I get the results?',
    a: 'No. Results go to the requesting agency, not to you. Keep the yellow copy / ATI number.',
  },
  {
    q: 'Cheapest / earliest cash Saturday walk-in in Oakland?',
    a: 'Cheapest cash rolling: Allscan at $23.00 (Sat 10:00 am – 12:00 pm; 6th-floor Saturday access UNVERIFIED). Earliest open with cash: LPG and Certifix @ UPS #3270 both 9:00 am — LPG $30 with no verified card bump; Certifix is walk-in-only Saturday and $45 cash / $47 card.',
  },
];

export const oaklandTeacherFaq: FaqItem[] = [
  {
    q: 'Which form do I use for CTC / teacher credential Live Scan?',
    a: 'California residents use CTC Form 41-LS (Request for Live Scan Service), which includes BCIA 8016 privacy notices. Download the official PDF from CTC — Form 41-LS at https://docs.ctc.ca.gov/document/download/29865 — and follow 41-LS Instructions. Do not invent an ORI on a blank DIY BCIA 8016.',
  },
  {
    q: 'Can I invent or look up the CTC ORI myself?',
    a: 'No. CTC\'s 41-LS instructions say the ORI is the "CTC number included - do not change." Pre-filled agency fields must stay as shown. Incorrect ORI/mail code can delay or misroute results. Never publish or guess a CTC ORI — use the official form only.',
  },
  {
    q: 'How much does CTC Live Scan cost?',
    a: 'There is no honest single Live Scan government-fee total. CTC\'s fees table for California Resident / Live Scan is "Varies - pay LS Operator." Rolling fees are the shop table on this page. DOJ/FBI processing: check the requesting agency — do not invent a package dollar. Separately, the CTC COC online application fee is $50.00 + $2.65 = $52.65 — that is a CTC application fee, not a Live Scan fee (CL-900).',
  },
  {
    q: 'Which Oakland shops take Saturday walk-ins for a teaching credential?',
    a: 'All 7 Oakland Saturday walk-in shops on DOJ tonight (accessed 2026-09-01): LPG Live Scan, Certifix @ UPS #3270, Allscan, Copy USA, UPS #7098, UPS #1821, and UPS #0243. Any DOJ Live Scan site works when Form 41-LS ORI is correct — this page does not invent CTC-certified shop badges. Nobody was called. Confirm before you go.',
  },
  {
    q: 'Does a Certificate of Clearance let me teach?',
    a: 'No. CL-900: the COC is not the same as a clear teaching or services credential and does not authorize instruction or services in schools. Its purpose is verification that you completed a professional fitness review.',
  },
  {
    q: 'Do I email my Live Scan form to CTC?',
    a: 'No. CTC: do not email your form to the Commission — scans are sent directly to CTC electronically. Print three copies of 41-LS, take them to the Live Scan site, and retain a copy for your records (CL-900; Fees and Fingerprinting).',
  },
  {
    q: 'Where do results go / how do I check status?',
    a: 'Results go to CTC via DOJ, not to you. Keep your ATI. Check status with ATI + date of birth at https://applicantstatus.doj.ca.gov/. Official ranges: 3–7 days (DOJ) on CTC\'s fees table; CL-900 usually within 10 working days. Also check CTC Online for Commission receipt.',
  },
  {
    q: 'Cheapest / earliest Saturday walk-in in Oakland?',
    a: 'Cheapest rolling: Allscan at $23.00 (Sat 10:00 am – 12:00 pm; 6th-floor Saturday access UNVERIFIED). Earliest open: LPG and Certifix @ UPS #3270 both 9:00 am — LPG $30; Certifix is walk-in-only Saturday and $45 cash / $47 card on the Certifix operator page. UPS #7098 remains a PrintScan CONFLICT (appointment-until-proven).',
  },
];

export const oaklandDowntownFruitvaleFaq: FaqItem[] = [
  {
    q: 'How did you split downtown vs Fruitvale?',
    a: 'We did not draw a neighborhood line. Each shop keeps its DOJ street and ZIP. The U.S. Census geocoder returns a Census tract for that address. The City of Oakland Table A-1 name for that tract is the neighborhood label. Downtown = LPG in Downtown/Old Oakland plus Allscan in Chinatown (city: "an important part of Downtown Oakland"). The Fruitvale Avenue column is Copy USA because the DOJ street contains Fruitvale. Copy USA\'s city tract is Oakmore South. We do not call it the Fruitvale district.',
  },
  {
    q: 'Which Saturday walk-in shops are downtown?',
    a: 'Two, accessed 2026-09-02: LPG Live Scan at 524 7th Street (city tract Downtown/Old Oakland) and Allscan at 409 13th Street, 6th Floor (Chinatown; city treats Chinatown as part of downtown). Piedmont Avenue, Grand Avenue, La Salle Avenue, and Redwood Road are not in this count.',
  },
  {
    q: 'Is there a Fruitvale Saturday walk-in?',
    a: 'One shop on Fruitvale Avenue: Copy USA, 3423 Fruitvale Avenue, Saturday walk-in 10:00 am – 3:30 pm, rolling $35.00. That is a street name on the DOJ row, not a claim that the shop sits in the city\'s Fruitvale district (94601). Card surcharge $ is UNVERIFIED. DOJ says additional service fees may apply (no dollar).',
  },
  {
    q: 'What about Piedmont, Grand Lake, Montclair, and Redwood Road?',
    a: 'They are Saturday walk-in on DOJ and they are listed under elsewhere in Oakland. City labels: Certifix @ UPS #3270 = Piedmont Ave Central; UPS #1821 = Adams Point East; UPS #0243 = Montclair North; UPS #7098 = Woodminster. None of those names are downtown or Fruitvale Avenue, so they are not in either comparison column.',
  },
  {
    q: 'Cheapest / earliest Saturday walk-in downtown?',
    a: 'Cheapest downtown rolling: Allscan $23.00 (Saturday 10:00 am – 12:00 pm; 6th-floor Saturday access UNVERIFIED). Earliest downtown open: LPG 9:00 am, rolling $30.00.',
  },
  {
    q: 'Cheapest / earliest Saturday walk-in on Fruitvale Avenue?',
    a: 'Only Copy USA is in that column: rolling $35.00, Saturday 10:00 am – 3:30 pm. There is no second Fruitvale Avenue Saturday walk-in on DOJ tonight.',
  },
  {
    q: 'Are UPS store hours the fingerprint hours?',
    a: 'No. UPS pages advertise shipping / notary hours. Live Scan Saturday hours are the DOJ column. UPS "open 7 days" does not mean Sunday Live Scan. UPS #7098 is a PrintScan CONFLICT (appointment-until-proven).',
  },
  {
    q: 'Do I get the results?',
    a: 'No. Results go to the requesting agency, not to you. Keep the yellow copy / ATI number.',
  },
];
