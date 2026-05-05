/**
 * Static lat/lng for each business centre. Used by the map component on the
 * homepage and the contact page. Keep in sync with `sc_centres.key` values.
 */
export const CENTRE_COORDS: Record<string, { lat: number; lng: number }> = {
  // 19th Floor, Damac Executive Heights, Tecom / Barsha Heights
  "smart-creation": { lat: 25.10135, lng: 55.17683 },
  // Iridium Building, Umm Suqeim St, Al Barsha
  "smart-place": { lat: 25.11352, lng: 55.20147 },
  // Al Arif Building, Al Hamriya, Bur Dubai
  "smart-view": { lat: 25.25478, lng: 55.29485 },
  // Dubai Municipality Bldg, Salah Al Din St, Al Muraqabat
  "future-space": { lat: 25.26747, lng: 55.32363 },
  // Smart Founders Centre — placeholder near Business Bay; replace with real coords later
  "smart-founders": { lat: 25.19075, lng: 55.27336 },
  // Abna Rashid Hamd Bin Huwaidi Bldg, Naif, Deira
  "abna-rashid": { lat: 25.27066, lng: 55.30482 },
};

export const DUBAI_CENTER = { lat: 25.18, lng: 55.27 };
