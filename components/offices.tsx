import { getCentres, getProperties, propertyToOffice } from "@/lib/supabase-queries";
import { OfficesGrid } from "@/components/offices-grid";

const CENTRE_CITY: Record<string, string> = {
  "smart-creation": "Al Barsha Heights (Tecom)",
  "smart-place": "Al Barsha 1",
  "smart-view": "Bur Dubai",
  "future-space": "Al Muraqabat",
  "abna-rashid": "Deira, Naif",
  "smart-founders": "Umm Ramool",
};

const CENTRE_LOGO: Record<string, string> = {
  "smart-creation": "/centres/smart-creation.webp",
  "smart-place": "/centres/smart-place.webp",
  "smart-view": "/centres/smart-view.webp",
  "future-space": "/centres/future-space.webp",
  "smart-founders": "/centres/smart-founders.webp",
  "abna-rashid": "/centres/abna-rashid.webp",
};

export async function Offices() {
  const [centresRaw, propertiesRaw] = await Promise.all([
    getCentres(),
    getProperties({ limit: 500 }),
  ]);

  const centres = centresRaw.map((c) => ({
    id: String(c.id),
    key: String(c.key),
    name: String(c.name).replace("Business Center", "BC").replace("Hamd Bin Huwaidi Building", "Bldg."),
    city: CENTRE_CITY[c.key as string],
    logo: CENTRE_LOGO[c.key as string],
    mapsUrl:
      (c.google_maps_url as string | null | undefined) ||
      `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        [c.building, c.location, c.emirate].filter(Boolean).join(", "),
      )}`,
  }));

  const offices = propertiesRaw.map(propertyToOffice);

  return <OfficesGrid offices={offices} centres={centres} />;
}
