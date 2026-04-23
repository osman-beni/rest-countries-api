import type { FC } from "hono/jsx";
import { css } from "hono/css";
const SelectRegion: FC<{ selectedRegion: string }> = ({ selectedRegion }) => {
  return (
    <select
      name="q"
      hx-get="/"
      hx-target="body"
      hx-swap="innerHTML"
      hx-push-url="true"
    >
      <option value="">All region</option>
      <option value="africa" selected={selectedRegion.includes("africa")}>
        Africa
      </option>
      <option value="americas" selected={selectedRegion.includes("america")}>
        America
      </option>
      <option value="oceania" selected={selectedRegion.includes("oceania")}>
        Oceania
      </option>
      <option value="europe" selected={selectedRegion.includes("europe")}>
        Europe
      </option>
      <option value="asia" selected={selectedRegion.includes("asia")}>
        Asia
      </option>
    </select>
  );
};

export default SelectRegion;
