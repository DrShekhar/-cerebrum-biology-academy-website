/**
 * Curated country dial-code list for phone inputs, ordered by audience
 * relevance (India first, then Gulf/NRI corridors, anglosphere, SAARC,
 * SEA, Europe, Africa). Flags are emoji derived from the ISO-3166 alpha-2
 * code at runtime — no image assets or dependencies.
 */

export interface CountryDialCode {
  /** ISO-3166 alpha-2, uppercase */
  iso2: string
  name: string
  /** With leading +, no spaces */
  dialCode: string
}

/** ISO-3166 alpha-2 → flag emoji via Unicode regional indicators. */
export function countryFlagEmoji(iso2: string): string {
  return iso2
    .toUpperCase()
    .replace(/[A-Z]/g, (c) => String.fromCodePoint(0x1f1e6 + c.charCodeAt(0) - 65))
}

export const COUNTRY_DIAL_CODES: ReadonlyArray<CountryDialCode> = [
  { iso2: 'IN', name: 'India', dialCode: '+91' },
  // Gulf / NRI corridors
  { iso2: 'AE', name: 'UAE', dialCode: '+971' },
  { iso2: 'SA', name: 'Saudi Arabia', dialCode: '+966' },
  { iso2: 'QA', name: 'Qatar', dialCode: '+974' },
  { iso2: 'KW', name: 'Kuwait', dialCode: '+965' },
  { iso2: 'OM', name: 'Oman', dialCode: '+968' },
  { iso2: 'BH', name: 'Bahrain', dialCode: '+973' },
  // Anglosphere
  { iso2: 'US', name: 'USA', dialCode: '+1' },
  { iso2: 'CA', name: 'Canada', dialCode: '+1' },
  { iso2: 'GB', name: 'UK', dialCode: '+44' },
  { iso2: 'AU', name: 'Australia', dialCode: '+61' },
  { iso2: 'NZ', name: 'New Zealand', dialCode: '+64' },
  { iso2: 'IE', name: 'Ireland', dialCode: '+353' },
  // SAARC + neighbours
  { iso2: 'NP', name: 'Nepal', dialCode: '+977' },
  { iso2: 'BD', name: 'Bangladesh', dialCode: '+880' },
  { iso2: 'LK', name: 'Sri Lanka', dialCode: '+94' },
  { iso2: 'PK', name: 'Pakistan', dialCode: '+92' },
  { iso2: 'BT', name: 'Bhutan', dialCode: '+975' },
  { iso2: 'MV', name: 'Maldives', dialCode: '+960' },
  { iso2: 'MM', name: 'Myanmar', dialCode: '+95' },
  // South-East Asia
  { iso2: 'SG', name: 'Singapore', dialCode: '+65' },
  { iso2: 'MY', name: 'Malaysia', dialCode: '+60' },
  { iso2: 'TH', name: 'Thailand', dialCode: '+66' },
  { iso2: 'ID', name: 'Indonesia', dialCode: '+62' },
  { iso2: 'PH', name: 'Philippines', dialCode: '+63' },
  { iso2: 'VN', name: 'Vietnam', dialCode: '+84' },
  // East Asia
  { iso2: 'JP', name: 'Japan', dialCode: '+81' },
  { iso2: 'KR', name: 'South Korea', dialCode: '+82' },
  { iso2: 'CN', name: 'China', dialCode: '+86' },
  { iso2: 'HK', name: 'Hong Kong', dialCode: '+852' },
  // Europe — full EU-27 coverage + UK/EEA/Switzerland
  { iso2: 'DE', name: 'Germany', dialCode: '+49' },
  { iso2: 'FR', name: 'France', dialCode: '+33' },
  { iso2: 'NL', name: 'Netherlands', dialCode: '+31' },
  { iso2: 'IT', name: 'Italy', dialCode: '+39' },
  { iso2: 'ES', name: 'Spain', dialCode: '+34' },
  { iso2: 'CH', name: 'Switzerland', dialCode: '+41' },
  { iso2: 'AT', name: 'Austria', dialCode: '+43' },
  { iso2: 'BE', name: 'Belgium', dialCode: '+32' },
  { iso2: 'SE', name: 'Sweden', dialCode: '+46' },
  { iso2: 'NO', name: 'Norway', dialCode: '+47' },
  { iso2: 'DK', name: 'Denmark', dialCode: '+45' },
  { iso2: 'FI', name: 'Finland', dialCode: '+358' },
  { iso2: 'IS', name: 'Iceland', dialCode: '+354' },
  { iso2: 'PL', name: 'Poland', dialCode: '+48' },
  { iso2: 'PT', name: 'Portugal', dialCode: '+351' },
  { iso2: 'GR', name: 'Greece', dialCode: '+30' },
  { iso2: 'CZ', name: 'Czechia', dialCode: '+420' },
  { iso2: 'SK', name: 'Slovakia', dialCode: '+421' },
  { iso2: 'HU', name: 'Hungary', dialCode: '+36' },
  { iso2: 'RO', name: 'Romania', dialCode: '+40' },
  { iso2: 'BG', name: 'Bulgaria', dialCode: '+359' },
  { iso2: 'HR', name: 'Croatia', dialCode: '+385' },
  { iso2: 'SI', name: 'Slovenia', dialCode: '+386' },
  { iso2: 'EE', name: 'Estonia', dialCode: '+372' },
  { iso2: 'LV', name: 'Latvia', dialCode: '+371' },
  { iso2: 'LT', name: 'Lithuania', dialCode: '+370' },
  { iso2: 'LU', name: 'Luxembourg', dialCode: '+352' },
  { iso2: 'UA', name: 'Ukraine', dialCode: '+380' },
  { iso2: 'RU', name: 'Russia', dialCode: '+7' },
  // MBBS-abroad corridors (Indian students)
  { iso2: 'GE', name: 'Georgia', dialCode: '+995' },
  { iso2: 'AM', name: 'Armenia', dialCode: '+374' },
  { iso2: 'KZ', name: 'Kazakhstan', dialCode: '+7' },
  { iso2: 'KG', name: 'Kyrgyzstan', dialCode: '+996' },
  { iso2: 'UZ', name: 'Uzbekistan', dialCode: '+998' },
  // Africa
  { iso2: 'ZA', name: 'South Africa', dialCode: '+27' },
  { iso2: 'NG', name: 'Nigeria', dialCode: '+234' },
  { iso2: 'GH', name: 'Ghana', dialCode: '+233' },
  { iso2: 'KE', name: 'Kenya', dialCode: '+254' },
  { iso2: 'TZ', name: 'Tanzania', dialCode: '+255' },
  { iso2: 'UG', name: 'Uganda', dialCode: '+256' },
  { iso2: 'RW', name: 'Rwanda', dialCode: '+250' },
  { iso2: 'ET', name: 'Ethiopia', dialCode: '+251' },
  { iso2: 'EG', name: 'Egypt', dialCode: '+20' },
  { iso2: 'ZW', name: 'Zimbabwe', dialCode: '+263' },
  { iso2: 'ZM', name: 'Zambia', dialCode: '+260' },
  { iso2: 'MW', name: 'Malawi', dialCode: '+265' },
  { iso2: 'BW', name: 'Botswana', dialCode: '+267' },
  { iso2: 'NA', name: 'Namibia', dialCode: '+264' },
  { iso2: 'SL', name: 'Sierra Leone', dialCode: '+232' },
  { iso2: 'LR', name: 'Liberia', dialCode: '+231' },
  { iso2: 'GM', name: 'Gambia', dialCode: '+220' },
  { iso2: 'CM', name: 'Cameroon', dialCode: '+237' },
  { iso2: 'MU', name: 'Mauritius', dialCode: '+230' },
  // Caribbean & Americas
  { iso2: 'JM', name: 'Jamaica', dialCode: '+1876' },
  { iso2: 'TT', name: 'Trinidad & Tobago', dialCode: '+1868' },
  { iso2: 'BB', name: 'Barbados', dialCode: '+1246' },
  { iso2: 'BS', name: 'Bahamas', dialCode: '+1242' },
  { iso2: 'GY', name: 'Guyana', dialCode: '+592' },
  { iso2: 'BZ', name: 'Belize', dialCode: '+501' },
  { iso2: 'BR', name: 'Brazil', dialCode: '+55' },
  { iso2: 'MX', name: 'Mexico', dialCode: '+52' },
  // Europe (English-official) & other
  { iso2: 'MT', name: 'Malta', dialCode: '+356' },
  { iso2: 'CY', name: 'Cyprus', dialCode: '+357' },
  { iso2: 'PG', name: 'Papua New Guinea', dialCode: '+675' },
  { iso2: 'FJ', name: 'Fiji', dialCode: '+679' },
  { iso2: 'IL', name: 'Israel', dialCode: '+972' },
  { iso2: 'TR', name: 'Turkey', dialCode: '+90' },
]

/**
 * Match a stored full number (e.g. "+9715xxxxxxx") back to a country entry
 * by longest dial-code prefix. Returns undefined for numbers without +.
 */
export function matchDialCode(fullNumber: string): CountryDialCode | undefined {
  if (!fullNumber.startsWith('+')) return undefined
  let best: CountryDialCode | undefined
  for (const c of COUNTRY_DIAL_CODES) {
    if (fullNumber.startsWith(c.dialCode) && (!best || c.dialCode.length > best.dialCode.length)) {
      best = c
    }
  }
  return best
}

/** National-number sanity bounds; India keeps the strict 10-digit rule. */
export function isValidNationalNumber(dialCode: string, national: string): boolean {
  if (dialCode === '+91') return national.length === 10
  return national.length >= 4 && national.length <= 14
}
