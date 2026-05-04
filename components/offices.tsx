import { getCentres, getProperties, propertyToOffice } from "@/lib/supabase-queries";
import { OfficesGrid } from "@/components/offices-grid";

const CENTRE_CITY: Record<string, string> = {
  "smart-creation": "Tecom",
  "smart-place": "Al Barsha",
  "smart-view": "Bur Dubai",
  "future-space": "Al Muraqabat",
  "abna-rashid": "Deira",
  "smart-founders": "Dubai",
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
    getProperties({ limit: 200 }),
  ]);

  const centres = centresRaw.map((c) => ({
    id: String(c.id),
    key: String(c.key),
    name: String(c.name).replace("Business Center", "BC").replace("Hamd Bin Huwaidi Building", "Bldg."),
    city: CENTRE_CITY[c.key as string],
    logo: CENTRE_LOGO[c.key as string],
  }));

  const offices = propertiesRaw.map(propertyToOffice);

  return <OfficesGrid offices={offices} centres={centres} />;
}
