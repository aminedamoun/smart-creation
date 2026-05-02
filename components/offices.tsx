import { getCentres, getProperties, propertyToOffice } from "@/lib/supabase-queries";
import { OfficesGrid } from "@/components/offices-grid";

const CENTRE_CITY: Record<string, string> = {
  "smart-creation": "Tecom · Dubai",
  "smart-place": "Al Barsha · Dubai",
  "smart-view": "Bur Dubai",
  "future-space": "Al Muraqabat · Dubai",
  "abna-rashid": "Deira · Dubai",
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
  }));

  const offices = propertiesRaw.map(propertyToOffice);

  return <OfficesGrid offices={offices} centres={centres} />;
}
