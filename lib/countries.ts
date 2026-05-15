export type Country = {
  /** ISO-3166 alpha-2 country code, used by libphonenumber-js */
  iso: string;
  name: string;
  dial: string;
  flag: string;
};

/**
 * Country list ordered with the UAE first, GCC neighbours next, then
 * key business-setup origin markets, then alphabetical. Covers ~99%
 * of real Smart Creation enquiries.
 */
export const COUNTRIES: Country[] = [
  // UAE first
  { iso: "AE", name: "United Arab Emirates", dial: "971", flag: "🇦🇪" },
  // GCC + neighbours
  { iso: "SA", name: "Saudi Arabia",        dial: "966", flag: "🇸🇦" },
  { iso: "KW", name: "Kuwait",              dial: "965", flag: "🇰🇼" },
  { iso: "QA", name: "Qatar",               dial: "974", flag: "🇶🇦" },
  { iso: "BH", name: "Bahrain",             dial: "973", flag: "🇧🇭" },
  { iso: "OM", name: "Oman",                dial: "968", flag: "🇴🇲" },
  { iso: "JO", name: "Jordan",              dial: "962", flag: "🇯🇴" },
  { iso: "LB", name: "Lebanon",             dial: "961", flag: "🇱🇧" },
  { iso: "EG", name: "Egypt",               dial: "20",  flag: "🇪🇬" },
  // Major origin markets
  { iso: "GB", name: "United Kingdom",      dial: "44",  flag: "🇬🇧" },
  { iso: "US", name: "United States",       dial: "1",   flag: "🇺🇸" },
  { iso: "CA", name: "Canada",              dial: "1",   flag: "🇨🇦" },
  { iso: "IN", name: "India",               dial: "91",  flag: "🇮🇳" },
  { iso: "PK", name: "Pakistan",            dial: "92",  flag: "🇵🇰" },
  { iso: "AU", name: "Australia",           dial: "61",  flag: "🇦🇺" },
  { iso: "DE", name: "Germany",             dial: "49",  flag: "🇩🇪" },
  { iso: "FR", name: "France",              dial: "33",  flag: "🇫🇷" },
  { iso: "IT", name: "Italy",               dial: "39",  flag: "🇮🇹" },
  { iso: "ES", name: "Spain",               dial: "34",  flag: "🇪🇸" },
  { iso: "NL", name: "Netherlands",         dial: "31",  flag: "🇳🇱" },
  { iso: "CH", name: "Switzerland",         dial: "41",  flag: "🇨🇭" },
  { iso: "IE", name: "Ireland",             dial: "353", flag: "🇮🇪" },
  { iso: "BE", name: "Belgium",             dial: "32",  flag: "🇧🇪" },
  { iso: "AT", name: "Austria",             dial: "43",  flag: "🇦🇹" },
  { iso: "SE", name: "Sweden",              dial: "46",  flag: "🇸🇪" },
  { iso: "NO", name: "Norway",              dial: "47",  flag: "🇳🇴" },
  { iso: "DK", name: "Denmark",             dial: "45",  flag: "🇩🇰" },
  { iso: "FI", name: "Finland",             dial: "358", flag: "🇫🇮" },
  { iso: "PT", name: "Portugal",            dial: "351", flag: "🇵🇹" },
  { iso: "PL", name: "Poland",              dial: "48",  flag: "🇵🇱" },
  { iso: "CZ", name: "Czechia",             dial: "420", flag: "🇨🇿" },
  { iso: "GR", name: "Greece",              dial: "30",  flag: "🇬🇷" },
  { iso: "TR", name: "Türkiye",             dial: "90",  flag: "🇹🇷" },
  { iso: "RU", name: "Russia",              dial: "7",   flag: "🇷🇺" },
  { iso: "UA", name: "Ukraine",             dial: "380", flag: "🇺🇦" },
  { iso: "ZA", name: "South Africa",        dial: "27",  flag: "🇿🇦" },
  { iso: "NG", name: "Nigeria",             dial: "234", flag: "🇳🇬" },
  { iso: "KE", name: "Kenya",               dial: "254", flag: "🇰🇪" },
  { iso: "MA", name: "Morocco",             dial: "212", flag: "🇲🇦" },
  { iso: "TN", name: "Tunisia",             dial: "216", flag: "🇹🇳" },
  { iso: "DZ", name: "Algeria",             dial: "213", flag: "🇩🇿" },
  { iso: "IQ", name: "Iraq",                dial: "964", flag: "🇮🇶" },
  { iso: "IR", name: "Iran",                dial: "98",  flag: "🇮🇷" },
  { iso: "SY", name: "Syria",               dial: "963", flag: "🇸🇾" },
  { iso: "YE", name: "Yemen",               dial: "967", flag: "🇾🇪" },
  { iso: "AF", name: "Afghanistan",         dial: "93",  flag: "🇦🇫" },
  { iso: "BD", name: "Bangladesh",          dial: "880", flag: "🇧🇩" },
  { iso: "LK", name: "Sri Lanka",           dial: "94",  flag: "🇱🇰" },
  { iso: "NP", name: "Nepal",               dial: "977", flag: "🇳🇵" },
  { iso: "MM", name: "Myanmar",             dial: "95",  flag: "🇲🇲" },
  { iso: "TH", name: "Thailand",            dial: "66",  flag: "🇹🇭" },
  { iso: "MY", name: "Malaysia",            dial: "60",  flag: "🇲🇾" },
  { iso: "SG", name: "Singapore",           dial: "65",  flag: "🇸🇬" },
  { iso: "ID", name: "Indonesia",           dial: "62",  flag: "🇮🇩" },
  { iso: "PH", name: "Philippines",         dial: "63",  flag: "🇵🇭" },
  { iso: "VN", name: "Vietnam",             dial: "84",  flag: "🇻🇳" },
  { iso: "CN", name: "China",               dial: "86",  flag: "🇨🇳" },
  { iso: "HK", name: "Hong Kong",           dial: "852", flag: "🇭🇰" },
  { iso: "JP", name: "Japan",               dial: "81",  flag: "🇯🇵" },
  { iso: "KR", name: "South Korea",         dial: "82",  flag: "🇰🇷" },
  { iso: "NZ", name: "New Zealand",         dial: "64",  flag: "🇳🇿" },
  { iso: "MX", name: "Mexico",              dial: "52",  flag: "🇲🇽" },
  { iso: "BR", name: "Brazil",              dial: "55",  flag: "🇧🇷" },
  { iso: "AR", name: "Argentina",           dial: "54",  flag: "🇦🇷" },
  { iso: "CL", name: "Chile",               dial: "56",  flag: "🇨🇱" },
  { iso: "CO", name: "Colombia",            dial: "57",  flag: "🇨🇴" },
];

export const DEFAULT_COUNTRY: Country = COUNTRIES[0]; // UAE

export function findCountryByIso(iso: string): Country {
  return COUNTRIES.find((c) => c.iso === iso) ?? DEFAULT_COUNTRY;
}
