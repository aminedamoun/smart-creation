/**
 * Approximate neighbourhood polygons for each business centre.
 * Sourced from OpenStreetMap (ODbL) where available; Tecom + Al Muraqabat
 * are hand-drawn approximations.
 */
export type LatLng = { lat: number; lng: number };

export const CENTRE_POLYGONS: Record<string, LatLng[][]> = {
  // Tecom / Barsha Heights — hand-drawn around Damac Executive Heights cluster
  "smart-creation": [
    [
      { lat: 25.10852, lng: 55.17052 },
      { lat: 25.10812, lng: 55.18293 },
      { lat: 25.09872, lng: 55.18681 },
      { lat: 25.09275, lng: 55.18298 },
      { lat: 25.09194, lng: 55.17545 },
      { lat: 25.09728, lng: 55.16842 },
      { lat: 25.10463, lng: 55.16713 },
      { lat: 25.10852, lng: 55.17052 },
    ],
  ],

  // Al Barsha (sourced from OSM via the realtor's polygon set)
  "smart-place": [
    [
      { lat: 25.084251, lng: 55.172757 },
      { lat: 25.082861, lng: 55.173088 },
      { lat: 25.081358, lng: 55.174237 },
      { lat: 25.080445, lng: 55.175773 },
      { lat: 25.079724, lng: 55.178096 },
      { lat: 25.079166, lng: 55.179222 },
      { lat: 25.063683, lng: 55.198756 },
      { lat: 25.076925, lng: 55.210239 },
      { lat: 25.074896, lng: 55.212865 },
      { lat: 25.07237, lng: 55.215654 },
      { lat: 25.070693, lng: 55.217157 },
      { lat: 25.068617, lng: 55.218614 },
      { lat: 25.064881, lng: 55.220203 },
      { lat: 25.054925, lng: 55.222717 },
      { lat: 25.051924, lng: 55.223735 },
      { lat: 25.053239, lng: 55.228172 },
      { lat: 25.053883, lng: 55.231376 },
      { lat: 25.055923, lng: 55.249414 },
      { lat: 25.078578, lng: 55.250175 },
      { lat: 25.080734, lng: 55.250025 },
      { lat: 25.083218, lng: 55.249531 },
      { lat: 25.085616, lng: 55.24866 },
      { lat: 25.091342, lng: 55.245214 },
      { lat: 25.093806, lng: 55.24329 },
      { lat: 25.096073, lng: 55.241094 },
      { lat: 25.098121, lng: 55.238649 },
      { lat: 25.102329, lng: 55.233023 },
      { lat: 25.123037, lng: 55.201941 },
      { lat: 25.105412, lng: 55.176877 },
      { lat: 25.10316, lng: 55.178842 },
      { lat: 25.097229, lng: 55.181874 },
      { lat: 25.092312, lng: 55.17703 },
      { lat: 25.08591, lng: 55.173147 },
      { lat: 25.084251, lng: 55.172757 },
    ],
  ],

  // Al Hamriya (OSM)
  "smart-view": [
    [
      { lat: 25.264222, lng: 55.305017 },
      { lat: 25.263255, lng: 55.30682 },
      { lat: 25.261401, lng: 55.308864 },
      { lat: 25.261492, lng: 55.309063 },
      { lat: 25.261271, lng: 55.309171 },
      { lat: 25.261173, lng: 55.309023 },
      { lat: 25.260159, lng: 55.309679 },
      { lat: 25.259918, lng: 55.308892 },
      { lat: 25.258438, lng: 55.307025 },
      { lat: 25.257102, lng: 55.305826 },
      { lat: 25.254811, lng: 55.304263 },
      { lat: 25.258252, lng: 55.297541 },
      { lat: 25.261978, lng: 55.300178 },
      { lat: 25.262985, lng: 55.300441 },
      { lat: 25.265235, lng: 55.301962 },
      { lat: 25.264222, lng: 55.305017 },
    ],
  ],

  // Al Muraqabat — hand-drawn around Salah Al Din Street block
  "future-space": [
    [
      { lat: 25.27265, lng: 55.32102 },
      { lat: 25.27095, lng: 55.32685 },
      { lat: 25.26461, lng: 55.32625 },
      { lat: 25.26315, lng: 55.32083 },
      { lat: 25.26572, lng: 55.31552 },
      { lat: 25.27135, lng: 55.31633 },
      { lat: 25.27265, lng: 55.32102 },
    ],
  ],

  // Business Bay (OSM) — used as Smart Founders' approximate area placeholder
  "smart-founders": [
    [
      { lat: 25.186227, lng: 55.255097 },
      { lat: 25.185766, lng: 55.25667 },
      { lat: 25.184199, lng: 55.258662 },
      { lat: 25.183786, lng: 55.259463 },
      { lat: 25.183352, lng: 55.260418 },
      { lat: 25.182925, lng: 55.262216 },
      { lat: 25.183271, lng: 55.264028 },
      { lat: 25.185903, lng: 55.265695 },
      { lat: 25.187607, lng: 55.268565 },
      { lat: 25.187508, lng: 55.270478 },
      { lat: 25.184905, lng: 55.27432 },
      { lat: 25.183579, lng: 55.279827 },
      { lat: 25.185017, lng: 55.28252 },
      { lat: 25.186116, lng: 55.28366 },
      { lat: 25.186842, lng: 55.283969 },
      { lat: 25.190048, lng: 55.284558 },
      { lat: 25.190734, lng: 55.285508 },
      { lat: 25.191582, lng: 55.287509 },
      { lat: 25.193618, lng: 55.29083 },
      { lat: 25.194665, lng: 55.288924 },
      { lat: 25.193503, lng: 55.287311 },
      { lat: 25.192373, lng: 55.284277 },
      { lat: 25.190403, lng: 55.28242 },
      { lat: 25.184743, lng: 55.277967 },
      { lat: 25.185986, lng: 55.276614 },
      { lat: 25.19029, lng: 55.269842 },
      { lat: 25.191248, lng: 55.268781 },
      { lat: 25.194134, lng: 55.267459 },
      { lat: 25.196152, lng: 55.265212 },
      { lat: 25.193832, lng: 55.26253 },
      { lat: 25.186238, lng: 55.25551 },
      { lat: 25.186227, lng: 55.255097 },
    ],
  ],

  // Naif (OSM)
  "abna-rashid": [
    [
      { lat: 25.269763, lng: 55.312616 },
      { lat: 25.26973, lng: 55.310541 },
      { lat: 25.268988, lng: 55.305714 },
      { lat: 25.268939, lng: 55.303339 },
      { lat: 25.2715, lng: 55.302377 },
      { lat: 25.27369, lng: 55.30693 },
      { lat: 25.276204, lng: 55.312964 },
      { lat: 25.276599, lng: 55.315369 },
      { lat: 25.270086, lng: 55.316419 },
      { lat: 25.269763, lng: 55.312616 },
    ],
  ],
};

/** Brand-blue palette — assign distinct shades so adjacent centres read as separate. */
export const CENTRE_POLYGON_COLOR: Record<string, string> = {
  "smart-creation": "#1D4ED8",
  "smart-place": "#2563EB",
  "smart-view": "#0EA5E9",
  "future-space": "#0284C7",
  "smart-founders": "#3B82F6",
  "abna-rashid": "#0891B2",
};
