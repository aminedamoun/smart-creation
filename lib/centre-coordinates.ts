/**
 * Static lat/lng for each business centre. Coordinates resolved from the
 * Google Maps share links the client provided. Used by the map component
 * on the homepage and the contact page. Keep in sync with `sc_centres.key`.
 */
export const CENTRE_COORDS: Record<string, { lat: number; lng: number }> = {
  // Smart Creation BC — Damac Executive Heights, Tecom / Barsha Heights
  // https://maps.app.goo.gl/yHrTGpynUvGtVPxR9
  "smart-creation": { lat: 25.0952904, lng: 55.1728556 },

  // Smart Place BC — Iridium Building, Umm Suqeim St, Al Barsha 1
  // https://maps.app.goo.gl/uTJEq3rPzPtyDTn26
  "smart-place": { lat: 25.1187648, lng: 55.207417 },

  // Smart View BC — Al Arif Bldg, Al Musalla Rd, Bur Dubai
  // https://maps.app.goo.gl/rEQifVDYsxtHKwNZ6
  "smart-view": { lat: 25.2600812, lng: 55.2992736 },

  // Future Space BC — Dubai Municipality Bldg, Salah Al Din St, Al Muraqabat
  // https://maps.app.goo.gl/bxW1yxGcuJnYyR3r9
  "future-space": { lat: 25.2698514, lng: 55.3284298 },

  // Smart Founders BC — Umm Ramool 1, Nad Al Hamar Rd, Umm Ramool
  // https://maps.app.goo.gl/nLrsKiSXMCFuBB9k7
  "smart-founders": { lat: 25.2332625, lng: 55.3772656 },

  // Abna Rashid Hamd Bin Huwaidi Bldg — Naif, Deira
  // https://maps.app.goo.gl/heW1vfH7pYxi8dr69
  "abna-rashid": { lat: 25.2722685, lng: 55.31066 },
};

export const DUBAI_CENTER = { lat: 25.2, lng: 55.27 };
